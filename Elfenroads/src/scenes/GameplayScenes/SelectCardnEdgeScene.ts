import UIScene from '../UIScene';
import {CardManager} from '../../managers/CardManager';
import {CardUnit} from '../../classes/CardUnit';
import Edge from '../../classes/Edge';
import PlayerManager from '../../managers/PlayerManager';
import EdgeMenu from '../../classes/EdgeMenu';

export default class SelectionScene extends Phaser.Scene {
  private selectedCardSprites!: Array<Phaser.GameObjects.Sprite>;
  private selectedEdge!: Edge;
  private edgeMenus!: Array<EdgeMenu>;
  private callback!: Function;

  constructor() {
    super('selectionscene');
  }

  create(callback: Function) {
    this.selectedCardSprites = [];
    this.edgeMenus = [];
    this.callback = callback;
    this.createUIBanner();
    this.createUIPassTurnButton();

    // Only allow local player to interact with UI if its their turn
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      this.makeCardsInteractive();
      this.makeEdgesInteractive();
    }

    //this.confirmButton();
  }

  // Button to skip turn
  private createUIPassTurnButton(): void {
    // Create small button with the "next" icon
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const passTurnButton = this.add.sprite(
      width - 30,
      height - 30,
      'brown-box'
    );
    this.add.image(passTurnButton.x, passTurnButton.y, 'next').setScale(0.7);

    // Add interactive pointer options for passTurnButton
    // After click, currentPlayer is updated via playerManager
    passTurnButton
      .setInteractive()
      .on('pointerdown', () => {
        passTurnButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        passTurnButton.clearTint();
      })
      .on('pointerup', () => {
        passTurnButton.clearTint();
        this.sound.play('pass');
        PlayerManager.getInstance().getCurrentPlayer().setPassedTurn(true);
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('uiscene').scene.restart();
        let finishedPlayers: integer = 0;
        PlayerManager.getInstance()
          .getPlayers()
          .forEach(player => {
            if (player.getPassedTurn() === true) {
              finishedPlayers++;
            }
          });

        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          this.callback();
        } else {
          this.scene.restart();
        }
      });
  }

  // UI banner that displays what Phase of Elfenroads is being played
  private createUIBanner(): void {
    // Create text to notify that it is draw counter phase
    const selectCardnEdgeText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Select Cards & Edge',
      {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
      }
    );

    const gameWidth: number = this.cameras.main.width;
    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, selectCardnEdgeText.width + 20, 40, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      90
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(selectCardnEdgeText);
  }

  // Sets interactive options for CurrentPlayer's Cards.
  private makeCardsInteractive(): void {
    // make every cards in hand selectable
    for (const cardSprite of UIScene.cardSprites) {
      // make it possible to select cardSprite
      cardSprite
        .setInteractive()
        .on('pointerover', () => {
          cardSprite.setTint(0xd3d3d3);
        })
        .on('pointerdown', () => {
          const index: number = this.selectedCardSprites.indexOf(cardSprite);
          if (index === -1) {
            cardSprite.y -= 50;
            this.selectedCardSprites.push(cardSprite);
          } else {
            cardSprite.y += 50;
            this.selectedCardSprites.splice(index, 1);
          }
        })
        .on('pointerout', () => {
          cardSprite.clearTint();
        })
        .on('pointerup', () => {
          cardSprite.clearTint();
        });
    }
  }

  // Sets interactive options for Items on the map's Edges.
  private makeEdgesInteractive(): void {
    // Make the itemSprites interactive

    UIScene.itemSpritesOnEdges.forEach(itemSprite => {
      const edgeMenu = new EdgeMenu(
        itemSprite.getData('mainScene'),
        itemSprite.getCenter().x,
        itemSprite.getCenter().y,
        this.attemptMoveBoot
      );

      this.edgeMenus.push(edgeMenu);

      itemSprite
        .setInteractive()
        .on('pointerdown', () => {
          itemSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          itemSprite.clearTint();
        })
        .on('pointerup', () => {
          itemSprite.clearTint();

          this.selectedEdge = itemSprite.getData('currentEdge');
          const args = [this.selectedCardSprites, this.selectedEdge, this];

          edgeMenu.setArgs(args);

          if (edgeMenu.isOpen) {
            edgeMenu.hide();
          } else {
            this.edgeMenus.forEach(menu => {
              menu.hide();
            });
            edgeMenu.show();
          }
        });
    });
  }

  // Function that attempts to move boot.
  private attemptMoveBoot(
    selectedCardSprites: Array<Phaser.GameObjects.Sprite>,
    selectedEdge: Edge,
    currentScene: Phaser.Scene
  ): void {
    console.log('Started the callback...');
    console.log(selectedCardSprites);
    console.log(selectedEdge);
    console.log(currentScene);
    const selectedCards: Array<CardUnit> = [];
    if (selectedCardSprites.length > 0) {
      // check if each card sprites are valid and collect each cards
      for (const card of selectedCardSprites) {
        const c = CardManager.getInstance().getSelectedCard(
          PlayerManager.getInstance().getCurrentPlayer(),
          card.name
        );
        if (c === undefined) {
          card.y += 50;
          selectedCardSprites.splice(selectedCardSprites.indexOf(card), 1);
        } else {
          card.removeInteractive();
          selectedCards.push(c);
        }
      }
      const currPlayer = PlayerManager.getInstance().getCurrentPlayer();
      const edge = selectedEdge;
      if (
        edge !== undefined &&
        selectedCards.length > 0 &&
        CardManager.getInstance().playCards(currPlayer, selectedCards, edge)
      ) {
        // remove all played cards sprite and update the player's hand
        for (const card of selectedCardSprites) {
          const c = CardManager.getInstance().getSelectedCard(
            PlayerManager.getInstance().getCurrentPlayer(),
            card.name
          );
          if (c === undefined) {
            selectedCardSprites.splice(selectedCardSprites.indexOf(card), 1);
          } else {
            card.destroy();
            CardManager.getInstance().addToPile(
              PlayerManager.getInstance().getCurrentPlayer(),
              c
            );
          }
        }
        currentScene.scene.get('uiscene').scene.restart();
        console.log('YOOOOO ITS WORKING!');
        currentScene.scene.restart();
      } else {
        for (let i = 0; i < selectedCardSprites.length; i++) {
          // remove selection of card
          const card = selectedCardSprites[i];
          card.y += 50;
          selectedCardSprites.splice(i, 1);
          // set the card be interactive again
          card
            .setInteractive()
            .on('pointerover', () => {
              card.setTint(0xd3d3d3);
            })
            .on('pointerdown', () => {
              const index: number = this.selectedCardSprites.indexOf(card);
              if (index === -1) {
                card.y -= 50;
                this.selectedCardSprites.push(card);
              } else {
                card.y += 50;
                this.selectedCardSprites.splice(index, 1);
              }
            })
            .on('pointerout', () => {
              card.clearTint();
            })
            .on('pointerup', () => {
              card.clearTint();
            });
          currentScene.scene.get('uiscene').scene.restart();
          console.log('Selection not valid');
          currentScene.scene.restart();
        }
      }
    }
  }
}

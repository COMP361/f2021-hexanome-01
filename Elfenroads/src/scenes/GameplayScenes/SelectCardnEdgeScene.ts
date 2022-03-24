import UIScene from '../UIScene';
import {CardManager} from '../../managers/CardManager';
import {CardUnit} from '../../classes/CardUnit';
import Edge from '../../classes/Edge';
import PlayerManager from '../../managers/PlayerManager';
import EdgeMenu from '../../classes/EdgeMenu';

export default class SelectionScene extends Phaser.Scene {
  private selected: Array<Phaser.GameObjects.Sprite> = [];
  private seletedCards: Array<CardUnit> = [];
  private selectedEdge: Edge | undefined;
  private edgeMenus: Array<EdgeMenu> = [];
  private cb!: Function;

  constructor() {
    super('selectionscene');
  }

  create(cb: Function) {
    this.cb = cb;

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

    /**
     * SHOWCASE FOR CHANGING PLAYER TURN
     */
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
    // PlayerTurnScene is rerendered to show whose turn it is
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
          this.cb();
        } else {
          this.scene.restart();
        }
      });

    this.makeCardsInteractive();
    this.makeEdgesInteractive();
    //this.confirmButton();
  }

  private makeCardsInteractive(): void {
    // make every cards in hand selectable
    for (const card of UIScene.cardSprites) {
      // make it possible to select card
      card
        .setInteractive()
        .on('pointerover', () => {
          card.setTint(0xd3d3d3);
        })
        .on('pointerdown', () => {
          const index: number = this.isSeleted(card);
          if (index === -1) {
            card.y -= 50;
            this.selected.push(card);
          } else {
            card.y += 50;
            this.selected.splice(index, 1);
          }
        })
        .on('pointerout', () => {
          card.clearTint();
        })
        .on('pointerup', () => {
          card.clearTint();
        });
    }
  }

  private makeEdgesInteractive(): void {
    // Make the itemSprites interactive
    UIScene.itemSpritesOnEdges.forEach(itemSprite => {
      const edgeMenu = new EdgeMenu(
        itemSprite.getData('mainScene'),
        itemSprite.getCenter().x,
        itemSprite.getCenter().y,
        this.isValid
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

  private isValid(): void {
    console.log('Checking if move is valid...');
  }

  private isSeleted(card: Phaser.GameObjects.Sprite): number {
    for (let i = 0; i < this.selected.length; i++) {
      if (this.selected[i] === card) {
        return i;
      }
    }
    return -1;
  }

  private confirmButton(): void {
    const {height} = this.scale;
    // Create confirm button at bottom right corner to confirm selection.
    const confirmButton = this.add.sprite(30, height - 80, 'brown-box');
    this.add.image(confirmButton.x, confirmButton.y, 'check').setScale(0.4);

    confirmButton
      .setInteractive()
      .on('pointerdown', () => {
        confirmButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        confirmButton.clearTint();
      })
      .on('pointerup', () => {
        confirmButton.clearTint();
        if (this.selected.length > 0) {
          for (const card of this.selected) {
            const c = CardManager.getInstance().getSelectedCard(
              PlayerManager.getInstance().getCurrentPlayer(),
              card.name
            );
            if (c === undefined) {
              card.y += 50;
              this.selected.splice(this.selected.indexOf(card), 1);
            } else {
              card.removeInteractive();
              this.seletedCards.push(c);
            }
          }
          const currPlayer = PlayerManager.getInstance().getCurrentPlayer();
          const cards = this.seletedCards;
          const edge = this.selectedEdge;
          if (edge === undefined) return;
          if (cards.length <= 0) return;
          if (CardManager.getInstance().playCards(currPlayer, cards, edge)) {
            for (const card of this.selected) {
              const c = CardManager.getInstance().getSelectedCard(
                PlayerManager.getInstance().getCurrentPlayer(),
                card.name
              );
              if (c === undefined) {
                this.selected.splice(this.selected.indexOf(card), 1);
              } else {
                card.destroy();
                this.seletedCards.splice(this.seletedCards.indexOf(c), 1);
              }
            }
            this.scene.get('uiscene').scene.restart();
            console.log('YOOOOO ITS WORKING!');
          }
        }
      });
  }
}

import Phaser from 'phaser';
import {ItemUnit} from '../../classes/ItemUnit';
import ItemManager from '../../managers/ItemManager';
import PlayerManager from '../../managers/PlayerManager';

export default class DrawCountersScene extends Phaser.Scene {
  public counterSprites!: Array<Phaser.GameObjects.Sprite>;
  public callback!: Function;

  constructor() {
    super('drawcountersscene');
  }

  create(callback: Function) {
    this.callback = callback;
    this.counterSprites = [];

    // Create UI banner in the middle of the screen
    this.createUIBanner();

    // Create pass turn button
    this.createPassTurnButton();

    // Render five face up counters
    this.renderSixCounters();
  }

  private createUIBanner() {
    // Create text to notify that it is draw counter phase
    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Draw Counter',
      {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
      }
    );

    const gameWidth: number = this.cameras.main.width;
    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, drawCounterText.width + 20, 40, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      90
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(drawCounterText);
  }

  private createPassTurnButton() {
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
          this.callback();
        } else {
          this.scene.restart();
        }
      });
  }

  private renderSixCounters() {
    const gameWidth: number = this.cameras.main.width;
    let previousWidth: integer = gameWidth / 2 + 200;

    while (this.counterSprites.length) {
      this.counterSprites[0].destroy();
      this.counterSprites.splice(0, 1);
    }

    // Render five face up counters
    const counters: Array<ItemUnit> = ItemManager.getInstance().getFaceUpPile();
    for (let i = 0; i < 5; i++) {
      this.generateCounter(previousWidth, counters[i], i);
      previousWidth += 50;
    }

    // Render a face down counter pile
    this.generateRandomCounter(previousWidth);
  }

  private generateCounter(
    previousWidth: integer,
    counter: ItemUnit,
    i: number
  ): void {
    const currentItem = counter;
    const itemSprite = this.add
      .sprite(previousWidth, 110, currentItem.getName())
      .setScale(0.25)
      .setInteractive();

    // Make counter interactive if it's the current player's turn.
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      itemSprite
        .on('pointerdown', () => {
          itemSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          itemSprite.clearTint();
        })
        .on('pointerup', () => {
          itemSprite.clearTint();
          this.sound.play('collect');
          PlayerManager.getInstance().getCurrentPlayer().addItem(currentItem);
          itemSprite.destroy();
          ItemManager.getInstance().removeFaceUpItem(i);
          this.generateCounter(
            previousWidth,
            ItemManager.getInstance().getFaceUpPile()[i],
            i
          );
          PlayerManager.getInstance().setNextPlayer();
          this.scene.get('uiscene').scene.restart();

          let finishedPlayers: integer = 0;
          PlayerManager.getInstance()
            .getPlayers()
            .forEach(player => {
              if (player.getItems().length === 5) {
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

    // If not player's turn, disable the counters
    else {
      itemSprite.setTint(0xd3d3d3);
      this.add.sprite(previousWidth, 110, 'cross');
    }

    this.counterSprites.push(itemSprite);
  }

  private generateRandomCounter(previousWidth: integer): void {
    const currentItem = ItemManager.getInstance().getRandomItem();
    const itemSprite = this.add
      .sprite(previousWidth, 110, 'unknown-counter')
      .setScale(0.25)
      .setInteractive();

    // Make counter interactive if it's the current player's turn.
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      itemSprite
        .on('pointerdown', () => {
          itemSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          itemSprite.clearTint();
        })
        .on('pointerup', () => {
          itemSprite.clearTint();
          PlayerManager.getInstance().getCurrentPlayer().addItem(currentItem);
          itemSprite.destroy();
          this.generateRandomCounter(previousWidth);
          PlayerManager.getInstance().setNextPlayer();
          this.scene.get('uiscene').scene.restart();

          let finishedPlayers: integer = 0;
          PlayerManager.getInstance()
            .getPlayers()
            .forEach(player => {
              if (player.getItems().length === 4) {
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

    // If not player's turn, disable the counters
    else {
      itemSprite.setTint(0xd3d3d3);
      this.add.sprite(previousWidth, 110, 'cross');
    }

    this.counterSprites.push(itemSprite);
  }
}

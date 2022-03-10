import Phaser from 'phaser';
import ItemManager from '../../managers/ItemManager';
import PlayerManager from '../../managers/PlayerManager';

export default class DrawCountersScene extends Phaser.Scene {
  // Grab width of current game to center our container

  public cb: any;
  constructor() {
    super('drawcountersscene');
  }

  create(cb: any) {
    this.cb = cb;
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

    let previousWidth: integer = gameWidth / 2 + 200;

    // Render five face up counters
    for (let i = 0; i < 5; i++) {
      this.generateCounter(previousWidth);
      previousWidth += 50;
    }

    // Render a face down counter pile
    this.generateRandomCounter(previousWidth);
  }

  generateCounter(previousWidth: integer): void {
    const currentItem = ItemManager.getInstance().getRandomItem();
    const itemSprite = this.add
      .sprite(previousWidth, 110, currentItem.getName())
      .setScale(0.25)
      .setInteractive()
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
        this.generateCounter(previousWidth);
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('playerturnscene').scene.restart();
        this.scene.get('inventoryscene').scene.restart();
        this.scene.get('playericonscene').scene.restart();

        let finishedPlayers: integer = 0;
        PlayerManager.getInstance()
          .getPlayers()
          .forEach(player => {
            if (player.getItems().length === 3) {
              finishedPlayers++;
            }
          });

        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          this.cb();
        }
      });
  }

  generateRandomCounter(previousWidth: integer): void {
    const currentItem = ItemManager.getInstance().getRandomItem();
    const itemSprite = this.add
      .sprite(previousWidth, 110, 'unknown-counter')
      .setScale(0.25)
      .setInteractive()
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
        this.scene.get('playerturnscene').scene.restart();
        this.scene.get('inventoryscene').scene.restart();
        this.scene.get('playericonscene').scene.restart();

        let finishedPlayers: integer = 0;
        PlayerManager.getInstance()
          .getPlayers()
          .forEach(player => {
            if (player.getItems().length === 3) {
              finishedPlayers++;
            }
          });

        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          this.cb();
        }
      });
  }
}

import Phaser from 'phaser';
import {ItemUnit} from '../../classes/ItemUnit';
import ItemManager from '../../managers/ItemManager';
import PlayerManager from '../../managers/PlayerManager';

export default class DrawCountersScene extends Phaser.Scene {
  // Grab width of current game to center our container

  public cb: any;
  public sprites: any;
  constructor() {
    super('drawcountersscene');
  }

  create(cb: any) {
    this.cb = cb;
    this.sprites = [];
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

    // Render five face up counters
    this.renderCounters();
  }

  renderCounters() {
    const gameWidth: number = this.cameras.main.width;
    let previousWidth: integer = gameWidth / 2 + 200;

    while (this.sprites.length) {
      this.sprites[0].destroy();
      this.sprites.splice(0, 1);
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

  generateCounter(previousWidth: integer, counter: ItemUnit, i: number): void {
    const currentItem = counter;
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
        this.sound.play('collect');
        PlayerManager.getInstance().getCurrentPlayer().addItem(currentItem);
        itemSprite.destroy();
        ItemManager.getInstance().removeFaceUpItem(i);
        this.generateCounter(
          previousWidth,
          ItemManager.getInstance().getFaceUpPile()[i],
          i
        );
        // this.generateCounter(previousWidth);
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

        console.log(finishedPlayers);
        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          this.cb();
        }
      });
    this.sprites.push(itemSprite);
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
          this.cb();
        }
      });
  }
}

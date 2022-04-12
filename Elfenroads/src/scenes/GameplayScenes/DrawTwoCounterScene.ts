import Phaser from 'phaser';
import {ItemUnit} from '../../classes/ItemUnit';
import {BidManager} from '../../managers/BidManager';
import {CardManager} from '../../managers/CardManager';
import ItemManager from '../../managers/ItemManager';
import PlayerManager from '../../managers/PlayerManager';
import SocketManager from '../../managers/SocketManager';

export default class DrawTwoCounterScene extends Phaser.Scene {
  public counterSprites!: Array<Phaser.GameObjects.Sprite>;
  public callback!: Function;
  public counters: Array<ItemUnit> = [];

  constructor() {
    super('drawtwocounterscene');
  }

  create(callback: Function) {
    this.callback = callback;
    this.counterSprites = [];

    // Create UI banner in the middle of the screen
    this.createUIBanner();

    // Create pass turn button
    // this.createPassTurnButton();

    // Render face up or hidden counters
    this.renderTwoCounters();

    SocketManager.getInstance().setScene(this.scene);
  }

  private createUIBanner() {
    // Create text to notify that it is draw counter phase
    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Hide Counter',
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
        this.counters = [];
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
          SocketManager.getInstance().emitStatusChange({
            nextPhase: true,
            CardManager: CardManager.getInstance(),
            ItemManager: ItemManager.getInstance(),
            PlayerManager: PlayerManager.getInstance(),
          });
        } else {
          SocketManager.getInstance().emitStatusChange({
            CardManager: CardManager.getInstance(),
            ItemManager: ItemManager.getInstance(),
            PlayerManager: PlayerManager.getInstance(),
          });
        }
      });
  }

  private renderTwoCounters() {
    // creates two counters that are face up if current player turn or face down otherwise
    // player clicks on one to select which one is hidden
    const gameWidth: number = this.cameras.main.width;
    const width: integer = gameWidth / 2 + 200;

    while (this.counterSprites.length) {
      this.counterSprites[0].destroy();
      this.counterSprites.splice(0, 1);
    }

    if (
      PlayerManager.getInstance().getCurrentPlayer() !==
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      this.add
        .sprite(width, 110, 'unknown-counter')
        .setScale(0.25)
        .setInteractive();
      this.add
        .sprite(width + 50, 110, 'unknown-counter')
        .setScale(0.25)
        .setInteractive();
    } else {
      this.generateRandomCounter(width);
      this.generateRandomCounter(width + 50);
    }
  }

  private generateRandomCounter(width: integer): void {
    const currentItem = ItemManager.getInstance().getRandomItem();
    const itemSprite = this.add
      .sprite(width, 110, currentItem.getName())
      .setScale(0.25)
      .setInteractive();
    this.counters.push(currentItem);
    this.counterSprites.push(itemSprite);

    // Make counter interactive if it's the current player's turn.
    itemSprite
      .on('pointerdown', () => {
        itemSprite.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        itemSprite.clearTint();
      })
      .on('pointerup', () => {
        currentItem.setHidden(true);
        itemSprite.clearTint();
        this.sound.play('collect');
        for (const item of this.counters) {
          PlayerManager.getInstance().getCurrentPlayer().addItem(item);
        }
        this.counters = [];
        for (const sprite of this.counterSprites) {
          sprite.destroy();
        }
        PlayerManager.getInstance().getCurrentPlayer().setPassedTurn(true);
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('uiscene').scene.restart();

        let finishedPlayers: integer = 0;
        PlayerManager.getInstance()
          .getPlayers()
          .forEach(player => {
            if (player.getPassedTurn()) {
              finishedPlayers++;
            }
          });
        BidManager.getInstance().startBid();
        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          SocketManager.getInstance().emitStatusChange({
            nextPhase: true,
            CardManager: CardManager.getInstance(),
            ItemManager: ItemManager.getInstance(),
            PlayerManager: PlayerManager.getInstance(),
            BidManager: BidManager.getInstance(),
          });
        } else {
          SocketManager.getInstance().emitStatusChange({
            CardManager: CardManager.getInstance(),
            ItemManager: ItemManager.getInstance(),
            PlayerManager: PlayerManager.getInstance(),
            BidManager: BidManager.getInstance(),
          });
        }
      });
  }

  public nextPhase(): void {
    this.callback();
  }
}

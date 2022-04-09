import Phaser from 'phaser';
import {ItemUnit} from '../../classes/ItemUnit';
import {BidManager} from '../../managers/BidManager';
import PlayerManager from '../../managers/PlayerManager';
import UIScene from '../UIScene';

export default class AuctionScene extends Phaser.Scene {
  public callback!: Function;
  public bidManager: BidManager;

  constructor() {
    super('auctionscene');
    this.bidManager = BidManager.getInstance();
  }

  create(callback: Function) {
    this.callback = callback;
    this.createUIBanner();
    this.createPassTurnButton();
    this.createAuction();
  }

  private createUIBanner() {
    // Create text to notify that it is auction phase
    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Bid',
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
        console.log(finishedPlayers);
        console.log(PlayerManager.getInstance().getPlayers().length);

        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          PlayerManager.getInstance()
            .getPlayers()
            .forEach(player => {
              player.setPassedTurn(false);
            });
          const test = this.bidManager.endBid();
          console.log(test);
          if (test) {
            this.callback();
          }
        }
        console.log('here');
        this.scene.restart();
      });
  }
  private CreateBidCounter() {}

  private showCurrentBid() {}

  private displayItems() {
    const pos: Array<number> = UIScene.getResponsivePosition(this, 1400, 200);
    let previousHeight: integer = pos[1];
    // Render counters
    const items: Array<ItemUnit> = this.bidManager.getBidItems();
    items.forEach(item => {
      this.add.sprite(pos[0], previousHeight, item.getName()).setScale(0.25);
      previousHeight += 50;
    });
  }

  private renderPointer(): void {
    const currItem = this.bidManager.getCurrentItem();
    const pos = UIScene.getResponsivePosition(this, 1450, 200);
    const ypos = pos[1] + currItem * 50;
    const image = this.add.image(pos[0] - 20, ypos, 'brown-gauntlet');

    image.rotation = -0.79;

    this.tweens.add({
      targets: image,
      x: pos[0] + 70,
      duration: 600,
      ease: 'Power1',
      yoyo: true,
      repeat: Infinity,
    });
  }

  private createAuction() {
    this.bidManager.startBid();
    this.displayItems();
    this.renderPointer();
  }
}

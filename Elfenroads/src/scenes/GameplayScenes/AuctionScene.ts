import Phaser from 'phaser';
import {ItemUnit} from '../../classes/ItemUnit';
import {BidManager} from '../../managers/BidManager';
import PlayerManager from '../../managers/PlayerManager';
import UIScene from '../UIScene';

export default class AuctionScene extends Phaser.Scene {
  public callback!: Function;
  public bidManager: BidManager;
  private currentBid: number;

  constructor() {
    super('auctionscene');
    this.bidManager = BidManager.getInstance();
    this.currentBid = 0;
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
        const totalPlayers = PlayerManager.getInstance().getPlayers().length;
        if (
          finishedPlayers === totalPlayers ||
          (finishedPlayers === totalPlayers - 1 &&
            this.bidManager.getHighestBidPlayer())
        ) {
          PlayerManager.getInstance()
            .getPlayers()
            .forEach(player => {
              player.setPassedTurn(false);
            });
          if (this.bidManager.endBid()) {
            this.callback();
          } else {
            this.scene.restart();
          }
        } else {
          this.scene.restart();
        }
      });
  }

  private CreateBidCounter() {
    const negBtn: Phaser.GameObjects.Text = this.add
      .text(10, 6, '-', {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
        color: 'white',
      })
      .setInteractive()
      .on('pointerdown', () => {
        negBtn.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        negBtn.clearTint();
      })
      .on('pointerup', () => {
        negBtn.clearTint();
        if (this.currentBid > 0) {
          this.currentBid--;
          bidText.setText(this.currentBid.toString());
        }
      });
    const posBtn: Phaser.GameObjects.Text = this.add
      .text(40, 6, '+', {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
        color: 'white',
      })
      .setInteractive()
      .on('pointerdown', () => {
        posBtn.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        posBtn.clearTint();
      })
      .on('pointerup', () => {
        posBtn.clearTint();
        this.currentBid++;
        bidText.setText(this.currentBid.toString());
      });
    const bidText: Phaser.GameObjects.Text = this.add.text(
      80,
      10,
      this.currentBid.toString(),
      {
        fontFamily: 'MedievalSharp',
        fontSize: '25px',
        backgroundColor: 'white',
        color: 'black',
      }
    );
    const checkmark: Phaser.GameObjects.Image = this.add
      .image(180, 25, 'checkmark')
      .setScale(0.7);
    const brownButton = this.add
      .sprite(180, 25, 'brown-box')
      .setInteractive()
      .on('pointerdown', () => {
        brownButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        brownButton.clearTint();
      })
      .on('pointerup', () => {
        brownButton.clearTint();
        this.confirmBid();
      });
    const totalTextWidth = bidText.width + negBtn.width + posBtn.width;
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, totalTextWidth + 80, 40, 'brown-panel', 24)
      .setOrigin(0, 0);
    const height = this.cameras.main.height;
    const pos: Array<number> = UIScene.getResponsivePosition(this, 1200, 0);
    const container: Phaser.GameObjects.Container = this.add.container(
      pos[0],
      height - 60
    );
    container.add(brownPanel);
    container.add(negBtn);
    container.add(bidText);
    container.add(posBtn);
    container.add(brownButton);
    container.add(checkmark);
  }

  private showCurrentBid() {
    const highestBid = this.bidManager.getHighestBid();
    const highestBidder = this.bidManager.getHighestBidPlayer();
    let text = 'There are currently \n no bidders.';
    if (highestBidder) {
      const playerColor = highestBidder.getBootColour();
      const bootString: string = playerColor.slice(0, playerColor.indexOf('-'));
      text = `The highest bid is ${highestBid} \n by ${bootString}.`;
    }
    const currentBidText: Phaser.GameObjects.Text = this.add.text(10, 6, text, {
      fontFamily: 'MedievalSharp',
      fontSize: '25px',
    });
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, currentBidText.width + 20, 70, 'brown-panel', 24)
      .setOrigin(0, 0);
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const container: Phaser.GameObjects.Container = this.add.container(
      width / 2 - brownPanel.width / 2,
      height / 2 - brownPanel.height / 2
    );
    container.add(brownPanel);
    container.add(currentBidText);
  }

  private displayItems() {
    const pos: Array<number> = UIScene.getResponsivePosition(this, 1450, 150);
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
    const pos = UIScene.getResponsivePosition(this, 1500, 150);
    const ypos = pos[1] + currItem * 50;
    const image = this.add.image(pos[0] - 20, ypos, 'brown-gauntlet');

    image.rotation = -0.79;

    this.tweens.add({
      targets: image,
      x: pos[0] + 30,
      duration: 600,
      ease: 'Power1',
      yoyo: true,
      repeat: Infinity,
    });
  }

  private confirmBid() {
    if (this.currentBid > this.bidManager.getHighestBid()) {
      const playerManager = PlayerManager.getInstance();
      const currentPlayer = playerManager.getCurrentPlayer();
      this.bidManager.setBid(currentPlayer, this.currentBid);
      playerManager.getCurrentPlayer();
      playerManager.setNextPlayer();
      this.scene.get('uiscene').scene.restart();
      this.scene.restart();
    }
  }

  private createAuction() {
    this.bidManager.startBid();
    this.displayItems();
    this.renderPointer();
    this.CreateBidCounter();
    this.showCurrentBid();
  }
}

import Phaser from 'phaser';
import {ItemUnit} from '../../classes/ItemUnit';
import {BidManager} from '../../managers/BidManager';
import ItemManager from '../../managers/ItemManager';
import PlayerManager from '../../managers/PlayerManager';
import SocketManager from '../../managers/SocketManager';
import UIScene from '../UIScene';

export default class AuctionScene extends Phaser.Scene {
  private callback!: Function;
  private bidManager: BidManager;
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
    SocketManager.getInstance().setScene(this.scene);
  }

  private createUIBanner(): void {
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

  private createPassTurnButton(): void {
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

        // If everyone passed, other than highest bidder
        // OR, if everyone passed
        if (
          (finishedPlayers === totalPlayers - 1 &&
            this.bidManager.getHighestBidPlayer()) ||
          finishedPlayers === totalPlayers
        ) {
          PlayerManager.getInstance()
            .getPlayers()
            .forEach(player => {
              player.setPassedTurn(false);
            });
          if (this.bidManager.endBid()) {
            SocketManager.getInstance().emitStatusChange({
              nextPhase: true,
              ItemManager: ItemManager.getInstance(),
              PlayerManager: PlayerManager.getInstance(),
              BidManager: BidManager.getInstance(),
            });
          } else {
            SocketManager.getInstance().emitStatusChange({
              ItemManager: ItemManager.getInstance(),
              PlayerManager: PlayerManager.getInstance(),
              BidManager: BidManager.getInstance(),
            });
          }
        } else {
          SocketManager.getInstance().emitStatusChange({
            ItemManager: ItemManager.getInstance(),
            PlayerManager: PlayerManager.getInstance(),
            BidManager: BidManager.getInstance(),
          });
        }
      });
  }

  private createBidCounter(): void {
    // Only render interactive auction UI if you are current player
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      // Create minus sign auction button
      const negBtn: Phaser.GameObjects.Text = this.add
        .text(10, 7, '-', {
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

      // Create plus sign auction button
      const posBtn: Phaser.GameObjects.Text = this.add
        .text(40, 7, '+', {
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

      // Create gold coin placeholder for text
      const goldCircle = this.add
        .sprite(90, posBtn.getCenter().y + 2, 'gold-cirle')
        .setDepth(3)
        .setScale(1.2);

      // Create big amount text
      const bidText: Phaser.GameObjects.Text = this.add
        .text(
          goldCircle.getCenter().x,
          goldCircle.getCenter().y - 1,
          this.currentBid.toString(),
          {
            fontFamily: 'MedievalSharp',
            fontSize: '25px',
            color: 'black',
          }
        )
        .setOrigin(0.5, 0.5)
        .setDepth(4);

      // Create confirm button
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

      // Create brown pannel for all auction UI elements from above
      const brownPanel: Phaser.GameObjects.RenderTexture = this.add
        .nineslice(0, 0, 120, 40, 'brown-panel', 24)
        .setOrigin(0, 0);
      const height = this.cameras.main.height;
      const pos: Array<number> = UIScene.getResponsivePosition(this, 1200, 0);
      const container: Phaser.GameObjects.Container = this.add.container(
        pos[0],
        height - 60
      );

      // Add all elements to Phaser container
      container.add(brownPanel);
      container.add(negBtn);
      container.add(goldCircle);
      container.add(bidText);
      container.add(posBtn);
      container.add(brownButton);
      container.add(checkmark);
    }
  }

  private showCurrentBid(): void {
    const highestBid = this.bidManager.getHighestBid();
    const highestBidder = this.bidManager.getHighestBidPlayer();
    let text = 'There are currently \nno bidders.';
    if (highestBidder) {
      const playerColor = highestBidder.getBootColour();
      const bootString: string = playerColor.slice(0, playerColor.indexOf('-'));
      text = `The highest bid is ${highestBid} \nby ${bootString}.`;
    }
    const currentBidText: Phaser.GameObjects.Text = this.add.text(10, 6, text, {
      fontFamily: 'MedievalSharp',
      fontSize: '40px',
    });
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, currentBidText.width + 20, 100, 'brown-panel', 24)
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

  private displayItems(): void {
    const pos: Array<number> = UIScene.getResponsivePosition(this, 1450, 150);
    let previousHeight: integer = pos[1];
    // Render counters
    const items: Array<ItemUnit> = this.bidManager.getBidItems();

    for (let i = 0; i < items.length; i++) {
      const itemSprite = this.add
        .sprite(pos[0], previousHeight, items[i].getName())
        .setScale(0.25)
        .setDepth(4)
        .setTint(0x6b6b6b);
      previousHeight += 50;

      if (i === this.bidManager.getCurrentItem()) {
        itemSprite.clearTint();
        const yellowPanel: Phaser.GameObjects.Sprite = this.add
          .sprite(
            itemSprite.getCenter().x - 34,
            itemSprite.getCenter().y,
            'yellow-slider'
          )
          .setDepth(3);

        this.add
          .text(
            yellowPanel.getCenter().x - 3,
            yellowPanel.getCenter().y - 1,
            `${this.bidManager.getHighestBid()}`,
            {
              fontFamily: 'MedievalSharp',
              fontSize: '19px',
              color: 'black',
            }
          )
          .setOrigin(0.5, 0.5)
          .setDepth(4);
      }
    }
  }

  private renderPointer(): void {
    const currItem = this.bidManager.getCurrentItem();
    const pos = UIScene.getResponsivePosition(this, 1500, 150);
    const ypos = pos[1] + currItem * 50;
    const image = this.add.image(pos[0] - 10, ypos, 'brown-gauntlet');

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

  private confirmBid(): void {
    if (this.currentBid > this.bidManager.getHighestBid()) {
      const playerManager = PlayerManager.getInstance();
      const currentPlayer = playerManager.getCurrentPlayer();
      this.bidManager.setBid(currentPlayer, this.currentBid);

      playerManager.setNextPlayer();
      SocketManager.getInstance().emitStatusChange({
        ItemManager: ItemManager.getInstance(),
        PlayerManager: PlayerManager.getInstance(),
        BidManager: BidManager.getInstance(),
      });
    }
  }

  private createAuction(): void {
    this.displayItems();
    this.renderPointer();
    this.createBidCounter();
    this.showCurrentBid();
  }

  public nextPhase(): void {
    this.callback();
  }
}

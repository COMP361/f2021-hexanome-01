import {GameObjects} from 'phaser';
import {Counter, ItemUnit, Obstacle} from '../../classes/ItemUnit';
import Player from '../../classes/Player';
import {GameVariant} from '../../enums/GameVariant';
import {CardManager} from '../../managers/CardManager';
import GameManager from '../../managers/GameManager';
import ItemManager from '../../managers/ItemManager';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import SocketManager from '../../managers/SocketManager';
import UIScene from '../UIScene';

export default class RoundCleanUpScene extends Phaser.Scene {
  private callback!: Function;
  private selectedItem: ItemUnit | null = null;
  private selectedItemSprite!: Phaser.GameObjects.Sprite;

  constructor() {
    super('roundcleanupscene');
  }

  create(callback: Function) {
    this.callback = callback;
    this.createUIBanner();
    this.passTurnButton();
    this.chooseCounterToKeep();
    SocketManager.getInstance().setScene(this.scene);
  }

  private createUIBanner(): void {
    let bannerText = 'To Choose Counter To Keep';

    if (GameManager.getInstance().getGameVariant() === GameVariant.elfengold) {
      bannerText = 'To Choose Two Counters To Keep';
    }

    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      `${bannerText}`,
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

  private passTurnButton(): void {
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
        const player: Player = PlayerManager.getInstance().getCurrentPlayer();
        if (
          GameManager.getInstance().getGameVariant() === GameVariant.elfenland
        ) {
          const validItems: Array<ItemUnit> = player.getItems().filter(item => {
            return !(item instanceof Obstacle);
          });
          let itemIndex = Math.floor(Math.random() * validItems.length);
          for (const item of validItems) {
            if (itemIndex !== 0) {
              player.removeItem(item);
            }
            itemIndex--;
          }
        } else {
          const playerItems = player.getItems();
          const itemIndex =
            playerItems[Math.floor(Math.random() * playerItems.length)];
          let itemIndex2 =
            playerItems[Math.floor(Math.random() * playerItems.length)];
          while (itemIndex === itemIndex2) {
            itemIndex2 =
              playerItems[Math.floor(Math.random() * playerItems.length)];
          }
          player.clearItems();
          player.addItem(itemIndex);
          player.addItem(itemIndex2);
        }

        player.setPassedTurn(true);
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
            RoadManager: RoadManager.getInstance(),
          });
        } else {
          SocketManager.getInstance().emitStatusChange({
            CardManager: CardManager.getInstance(),
            ItemManager: ItemManager.getInstance(),
            PlayerManager: PlayerManager.getInstance(),
            RoadManager: RoadManager.getInstance(),
          });
        }
      });
  }

  private chooseCounterToKeep(): void {
    this.selectedItem = null;
    const graphics = this.add.graphics();
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      UIScene.itemSprites.forEach(item => {
        item
          .setInteractive()
          .on('pointerdown', () => {
            item.setTint(0xd3d3d3);
          })
          .on('pointerup', () => {
            if (
              GameManager.getInstance().getGameVariant() ===
              GameVariant.elfenland
            ) {
              this.selectOneItem(item, graphics);
            } else {
              this.selectTwoItems(item, graphics);
            }
          });
      });
    }
  }

  private selectOneItem(
    item: Phaser.GameObjects.Sprite,
    graphics: GameObjects.Graphics
  ): void {
    item.clearTint();
    graphics.clear();
    const playerItem = item.getData('item');
    // normal state goes here
    this.selectedItem = playerItem;
    this.selectedItemSprite = item;
    const player: Player = PlayerManager.getInstance().getCurrentPlayer();
    const validItems: Array<ItemUnit> = player.getItems().filter(item => {
      return !(item instanceof Obstacle);
    });
    if (playerItem instanceof Counter) {
      for (const item of validItems) {
        if (playerItem !== item) {
          player.removeItem(item);
        }
      }
      player.setPassedTurn(true);
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

      if (finishedPlayers === PlayerManager.getInstance().getPlayers().length) {
        SocketManager.getInstance().emitStatusChange({
          nextPhase: true,
          CardManager: CardManager.getInstance(),
          ItemManager: ItemManager.getInstance(),
          PlayerManager: PlayerManager.getInstance(),
          RoadManager: RoadManager.getInstance(),
        });
      } else {
        SocketManager.getInstance().emitStatusChange({
          CardManager: CardManager.getInstance(),
          ItemManager: ItemManager.getInstance(),
          PlayerManager: PlayerManager.getInstance(),
          RoadManager: RoadManager.getInstance(),
        });
      }
    }
  }

  private selectTwoItems(
    item: Phaser.GameObjects.Sprite,
    graphics: GameObjects.Graphics
  ): void {
    graphics.clear();
    const playerItem = item.getData('item');
    if (this.selectedItem === null) {
      item.setTint(0xd3d3d3);
      this.selectedItem = playerItem;
      this.selectedItemSprite = item;
    } else if (this.selectedItem === playerItem) {
      item.clearTint();
      this.selectedItem = null;
    } else {
      item.clearTint();
      this.selectedItemSprite.clearTint();
      const player: Player = PlayerManager.getInstance().getCurrentPlayer();
      const playerItems: Array<ItemUnit> = player.getItems();
      console.log(playerItems);
      player.clearItems();
      player.addItem(playerItem);
      player.addItem(this.selectedItem);
      player.setPassedTurn(true);
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

      if (finishedPlayers === PlayerManager.getInstance().getPlayers().length) {
        SocketManager.getInstance().emitStatusChange({
          nextPhase: true,
          CardManager: CardManager.getInstance(),
          ItemManager: ItemManager.getInstance(),
          PlayerManager: PlayerManager.getInstance(),
          RoadManager: RoadManager.getInstance(),
        });
      } else {
        SocketManager.getInstance().emitStatusChange({
          CardManager: CardManager.getInstance(),
          ItemManager: ItemManager.getInstance(),
          PlayerManager: PlayerManager.getInstance(),
          RoadManager: RoadManager.getInstance(),
        });
      }
    }
  }

  public nextPhase(): void {
    this.callback();
  }
}

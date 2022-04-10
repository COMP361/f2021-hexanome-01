import {GameObjects} from 'phaser';
import {CardUnit} from '../../classes/CardUnit';
import Edge from '../../classes/Edge';
import EdgeMenu from '../../classes/EdgeMenu';
import {
  Counter,
  GoldPiece,
  ItemUnit,
  Obstacle,
  Spell,
} from '../../classes/ItemUnit';
import Player from '../../classes/Player';
import {ObstacleType} from '../../enums/ObstacleType';
import {SpellType} from '../../enums/SpellType';
import {CardManager} from '../../managers/CardManager';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import UIScene from '../UIScene';

export default class RoundCleanUpScene extends Phaser.Scene {
  public cb: any;
  selectedItem: ItemUnit | null = null;
  selectedItemSprite!: Phaser.GameObjects.Sprite;

  constructor() {
    super('roundcleanupscene');
  }

  create(cb: any) {
    this.cb = cb;

    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Choose Counter To Keep',
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
          this.cb();
        } else {
          this.scene.restart();
        }
      });

    this.chooseCounterToKeep();
  }

  chooseCounterToKeep() {
    const graphics = this.add.graphics();
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      UIScene.itemSprites.forEach(item => {
        console.log(item);
        item
          .setInteractive()
          .on('pointerdown', () => {
            item.setTint(0xd3d3d3);
          })
          .on('pointerout', () => {
            item.clearTint();
          })
          .on('pointerup', () => {
            this.selectItem(item, graphics);
          });
      });
    }
  }

  selectItem(item: Phaser.GameObjects.Sprite, graphics: GameObjects.Graphics) {
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
        this.cb();
      } else {
        this.scene.restart();
      }
    }
  }
}

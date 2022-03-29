import {GameObjects} from 'phaser';
import Edge from '../../classes/Edge';
import {ItemUnit} from '../../classes/ItemUnit';
import {ObstacleType} from '../../enums/ObstacleType';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import UIScene from '../UIScene';

export default class PlanRouteScene extends Phaser.Scene {
  selectedItemSprite!: Phaser.GameObjects.Sprite;
  selectedItem!: ItemUnit;
  cb: any;

  constructor() {
    super('planroutescene');
  }

  create(cb: any) {
    this.cb = cb;
    // Create text to notify that it is draw counter phase

    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Plan Route',
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

    this.planRoute();
  }

  drawAllowedEdges(
    item: Phaser.GameObjects.Sprite,
    graphics: any,
    zoneRadius: number
  ) {
    graphics.lineStyle(8, 0x8a6440, 0.7);
    // highlight every draggable counter
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        if (
          (item.data.values.allowedEdges.includes(edge.getType()) &&
            edge.getItems().length === 0 &&
            !item.data.values.needsCounter) ||
          (item.data.values.needsCounter && edge.getItems().length > 0)
        ) {
          const pos = UIScene.getResponsivePosition(
            this,
            edge.getPosition()[0],
            edge.getPosition()[1]
          );
          graphics.strokeCircle(pos[0], pos[1], zoneRadius / 3);
        }
      });
  }

  selectItem(
    item: Phaser.GameObjects.Sprite,
    zoneRadius: number,
    graphics: GameObjects.Graphics
  ) {
    item.clearTint();
    graphics.clear();
    this.drawAllowedEdges(item, graphics, zoneRadius);
    this.selectedItemSprite = item;
    const playerItems: Array<ItemUnit> = PlayerManager.getInstance()
      .getCurrentPlayer()
      .getItems();

    for (let i = 0; i < playerItems.length; i++) {
      const item: ItemUnit = playerItems[i];
      if (item.getName() === this.selectedItemSprite.data.values.name) {
        this.selectedItem = item;
        break;
      }
    }
  }

  placeItem(edge: Edge, graphics: GameObjects.Graphics) {
    if (this.selectedItemSprite) {
      if (
        (this.selectedItem.getAllowedEdges().includes(edge.getType()) &&
          edge.getItems().length === 0 &&
          !this.selectedItem.getNeedsCounter()) ||
        (this.selectedItem.getNeedsCounter() && edge.getItems().length >= 1)
      ) {
        this.sound.play('place');
        graphics.clear();
        PlayerManager.getInstance()
          .getCurrentPlayer()
          .removeItem(this.selectedItem);
        edge.addItem(this.selectedItem);
        this.selectedItemSprite.destroy();
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('uiscene').scene.restart();
      }
    }
  }

  planRoute() {
    const graphics = this.add.graphics();
    const zoneRadius = UIScene.getResponsivePosition(this, 30, 30)[0];

    // creating all the dropzones for counters
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        const pos = UIScene.getResponsivePosition(
          this,
          edge.getPosition()[0],
          edge.getPosition()[1]
        );
        this.add
          .zone(pos[0], pos[1], 10, 10)
          .setData(edge)
          .setInteractive()
          .on('pointerup', () => {
            this.placeItem(edge, graphics);
          });
      });

    // make items draggable
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
          .on('pointerout', () => {
            item.clearTint();
          })
          .on('pointerup', () => {
            this.selectItem(item, zoneRadius, graphics);
          });
      });
    }
  }
}

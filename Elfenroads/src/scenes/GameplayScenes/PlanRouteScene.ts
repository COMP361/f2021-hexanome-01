import {GameObjects} from 'phaser';
import Edge from '../../classes/Edge';
import {
  Counter,
  GoldPiece,
  ItemUnit,
  Obstacle,
  Spell,
} from '../../classes/ItemUnit';
import {ObstacleType} from '../../enums/ObstacleType';
import {SpellType} from '../../enums/SpellType';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import UIScene from '../UIScene';

export default class PlanRouteScene extends Phaser.Scene {
  selectedItemSprite!: Phaser.GameObjects.Sprite;
  selectedItem: ItemUnit | null = null;
  selectedDoubleItem: ItemUnit | null = null;
  selectedDoubleItemSprite!: Phaser.GameObjects.Sprite;
  cancelButton!: Phaser.GameObjects.Container;
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

  goldOrObsExist(items: Array<ItemUnit>) {
    for (const item of items) {
      if (item instanceof GoldPiece || item instanceof Obstacle) {
        return true;
      }
    }
    return false;
  }

  isItemValid(item: ItemUnit, edge: Edge) {
    return (
      // dont forget to add condition for spell
      (((item instanceof GoldPiece || item instanceof Obstacle) &&
        !this.goldOrObsExist(edge.getItems())) ||
        (!(item instanceof GoldPiece) && !(item instanceof Obstacle))) &&
      ((item.getAllowedEdges().includes(edge.getType()) &&
        edge.getItems().length === 0 &&
        !item.getNeedsCounter()) ||
        (item.getNeedsCounter() && edge.getItems().length >= 1))
    );
  }

  drawAllowedEdges(item: ItemUnit, graphics: any, zoneRadius: number) {
    graphics.lineStyle(8, 0x8a6440, 0.7);
    // highlight every draggable counter
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        if (this.isItemValid(item, edge)) {
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
    const playerItems: Array<ItemUnit> = PlayerManager.getInstance()
      .getCurrentPlayer()
      .getItems();

    for (let i = 0; i < playerItems.length; i++) {
      const playerItem: ItemUnit = playerItems[i];
      if (playerItem.getName() === item.data.values.name) {
        if (
          this.selectedItem &&
          this.selectedItem.getName() === SpellType.Double &&
          playerItem instanceof Counter
        ) {
          this.selectedDoubleItem = playerItem;
          this.selectedDoubleItemSprite = item;
          this.drawAllowedEdges(this.selectedItem, graphics, zoneRadius);
        } else {
          this.selectedItem = playerItem;
          this.selectedItemSprite = item;
          if (
            this.selectedItem instanceof Spell &&
            !this.cancelButton.visible
          ) {
            this.cancelButton.setVisible(true);
          } else {
            this.cancelButton.setVisible(false);
            this.drawAllowedEdges(this.selectedItem, graphics, zoneRadius);
          }
        }
        break;
      }
    }
  }

  placeItem(edge: Edge, graphics: GameObjects.Graphics) {
    if (this.selectedItem) {
      if (this.isItemValid(this.selectedItem, edge)) {
        const currPlayer = PlayerManager.getInstance().getCurrentPlayer();
        if (
          this.selectedItem.getName() === SpellType.Double &&
          this.selectedDoubleItem
        ) {
          edge.addItem(this.selectedDoubleItem);
          currPlayer.removeItem(this.selectedDoubleItem);
          this.selectedDoubleItemSprite.destroy();
          this.cancelButton.destroy();
        } else {
          edge.addItem(this.selectedItem);
        }
        currPlayer.removeItem(this.selectedItem);
        this.selectedItemSprite.destroy();
        this.selectedItem = null;
        this.selectedDoubleItem = null;
        PlayerManager.getInstance().setNextPlayer();
        this.sound.play('place');
        graphics.clear();
        this.scene.get('uiscene').scene.restart();
      }
    }
  }

  createCancelButton(graphics: GameObjects.Graphics) {
    const container = this.add.container(500, 500);
    const cancelButton = this.add.sprite(0, 0, 'brown-box');
    const icon = this.add
      .image(cancelButton.x, cancelButton.y, 'target')
      .setScale(0.7);
    container.add(cancelButton);
    container.add(icon);
    container.setVisible(false);
    cancelButton
      .setInteractive()
      .on('pointerdown', () => {
        cancelButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        cancelButton.clearTint();
      })
      .on('pointerup', () => {
        cancelButton.clearTint();
        // "cancels" the spell counter
        if (this.selectedDoubleItem) {
          this.selectedItem = null;
          this.selectedDoubleItem = null;
        }
        container.setVisible(false);
        graphics.clear();
      });
    return container;
  }

  planRoute() {
    const graphics = this.add.graphics();
    const zoneRadius = UIScene.getResponsivePosition(this, 30, 30)[0];
    this.cancelButton = this.createCancelButton(graphics);
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

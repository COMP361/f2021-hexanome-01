import {exit} from 'process';
import {ItemUnit} from '../../classes/ItemUnit';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import InventoryScene from '../UIScenes/InventoryScene';

export default class PlanRouteScene extends Phaser.Scene {
  selectedItemSprite!: Phaser.GameObjects.Sprite;
  selectedItem!: ItemUnit;

  constructor() {
    super('planroutescene');
  }

  create() {
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
    const passTurnButton = this.add.sprite(width - 30, 150, 'brown-box');
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
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('playerturnscene').scene.restart();
        this.scene.restart();
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
        if (item.data.values.allowedEdges.includes(edge.getType())) {
          graphics.strokeCircle(
            (edge.getPosition()[0] / 1600) * this.cameras.main.width,
            (edge.getPosition()[1] / 750) * this.cameras.main.height,
            zoneRadius / 3
          );
        }
      });
  }

  planRoute() {
    const graphics = this.add.graphics();
    const zoneRadius = (30 / 1600) * this.cameras.main.width;

    // creating all the dropzones for counters
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        this.add
          .zone(
            (edge.getPosition()[0] / 1600) * this.cameras.main.width,
            (edge.getPosition()[1] / 750) * this.cameras.main.height,
            10,
            10
          )
          .setData(edge)
          .setInteractive()
          .on('pointerup', () => {
            if (this.selectedItemSprite) {
              graphics.clear();
              edge.addItem(this.selectedItem);
              this.selectedItemSprite.destroy();
              PlayerManager.getInstance().setNextPlayer();
              this.scene.get('renderedgescene').scene.restart();
              this.scene.get('playerturnscene').scene.restart();
              this.scene.get('inventoryscene').scene.restart();
              this.scene.get('playericonscene').scene.restart();
            }
          });
      });

    // make items draggable
    InventoryScene.itemSprites.forEach(item => {
      item
        .setInteractive()
        .on('pointerdown', () => {
          item.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          item.clearTint();
        })
        .on('pointerup', () => {
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
              PlayerManager.getInstance().getCurrentPlayer().removeItem(item);
              this.selectedItem = item;
              break;
            }
          }
        });
    });
  }
}

import {ObstacleType} from '../../enums/ObstacleType';
import RoadManager from '../../managers/RoadManager';
import InventoryScene from '../UIScenes/InventoryScene';

export default class PlanRouteScene extends Phaser.Scene {
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

    this.planRoute();
  }

  planRoute() {
    const graphics = this.add.graphics();
    const zoneRadius = (30 / 1600) * this.cameras.main.width;

    // creating all the dropzones for counters
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        const zone = this.add
          .zone(
            (edge.getPosition()[0] / 1600) * this.cameras.main.width,
            (edge.getPosition()[1] / 750) * this.cameras.main.height,
            1,
            1
          )
          .setCircleDropZone(zoneRadius);
        // assign edge object to each zone
        zone.setData(edge);
      });

    // make items draggable
    console.log(InventoryScene.itemSprites);
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
        });
      this.input.setDraggable(item);
    });

    this.input.on(
      'dragstart',
      (pointer: any, gameObject: {setTint: (arg0: number) => void}) => {
        gameObject.setTint(0x808080);
      }
    );

    this.input.on(
      'drag',
      (pointer: any, gameObject: any, dragX: any, dragY: any) => {
        // cannot drag placed counters
        if (gameObject.active) {
          gameObject.x = dragX;
          gameObject.y = dragY;
          graphics.lineStyle(8, 0x8a6440, 0.7);
          // highlight every draggable counter
          RoadManager.getInstance()
            .getEdges()
            .forEach(edge => {
              if (gameObject.data.list.allowedEdges.includes(edge.getType())) {
                graphics.strokeCircle(
                  (edge.getPosition()[0] / 1600) * this.cameras.main.width,
                  (edge.getPosition()[1] / 750) * this.cameras.main.height,
                  zoneRadius / 3
                );
              }
            });
        }
      }
    );

    // if the counter is dragged to the drop zone, it will stay in it
    this.input.on('drop', (pointer: any, gameObject: any, dropZone: any) => {
      if (
        gameObject.data.values.allowedEdges.includes(
          dropZone.data.values.edgeType
        ) &&
        dropZone.data.values.items.length === 0 &&
        gameObject.data.values.obstacleType !== ObstacleType.Tree &&
        gameObject.active
      ) {
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.data.values = {
          ...dropZone.data.values,
          ...gameObject.data.values,
        };
        gameObject.setActive(false);
      } else if (
        gameObject.data.values.obstacleType === ObstacleType.Tree &&
        dropZone.data.values.items.length === 1 &&
        gameObject.active
      ) {
        gameObject.x = dropZone.x - 30;
        gameObject.y = dropZone.y;
        gameObject.data.values = {
          ...dropZone.data.values,
          ...gameObject.data.values,
        };
        gameObject.setActive(false);
      } else {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    this.input.on('dragend', (pointer: any, gameObject: any, dropped: any) => {
      gameObject.clearTint();
      // otherwise the counter will be back to original position
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      // clear edges highlight
      graphics.clear();
    });
  }
}

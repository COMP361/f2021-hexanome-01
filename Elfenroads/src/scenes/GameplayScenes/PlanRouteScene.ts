// prettier-ignore
import { ObstacleType } from '../../enums/ObstacleType';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import InventoryScene from '../UIScenes/InventoryScene';

export default class PlanRouteScene extends Phaser.Scene {

    constructor() {
      super('planroutescene');
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
                (edge.position[0] / 1600) * this.cameras.main.width,
                (edge.position[1] / 750) * this.cameras.main.height,
                1,
                1
              )
              .setCircleDropZone(zoneRadius);
            // assign edge object to each zone
            zone.setData(edge);
          });

        // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
        const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();

        // make items draggable
        console.log(InventoryScene.items);
        InventoryScene.items.forEach(item => {
          item.setInteractive();
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
                  if (gameObject.data.list.allowedEdges.includes(edge.edgeType)) {
                    graphics.strokeCircle(
                      (edge.position[0] / 1600) * this.cameras.main.width,
                      (edge.position[1] / 750) * this.cameras.main.height,
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
            gameObject.data.values = {...dropZone.data.values, ...gameObject.data.values};
            gameObject.setActive(false);
          } else if (
            gameObject.data.values.obstacleType === ObstacleType.Tree &&
            dropZone.data.values.items.length === 1 &&
            gameObject.active
          ) {
            gameObject.x = dropZone.x - 30;
            gameObject.y = dropZone.y;
            gameObject.data.values = {...dropZone.data.values, ...gameObject.data.values};
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

    create() {
        console.log('hi');
        this.planRoute();
    }
}
// prettier-ignore

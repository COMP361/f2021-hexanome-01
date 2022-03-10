import Phaser from 'phaser';
import {ItemUnit} from '../../classes/ItemUnit';
import RoadManager from '../../managers/RoadManager';

export default class RenderEdgeScene extends Phaser.Scene {
  constructor() {
    super('renderedgescene');
  }

  create() {
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        const x = (edge.getPosition()[0] / 1600) * this.cameras.main.width;
        const y = (edge.getPosition()[1] / 750) * this.cameras.main.height;
        edge.getItems().forEach(item => {
          this.renderItem(x, y, item, this);
        });
      });
  }

  renderItem(x: number, y: number, pItem: ItemUnit, scene: Phaser.Scene) {
    // If item is in map add it to Phaser container
    if (pItem) {
      // Render sprite to this Phaser Scene and offset based on the other Items
      const item = scene.add.sprite(x, y, pItem.getName());
      item.setData(pItem).setScale(0.25);
    }
  }
}

import Phaser from 'phaser';
import {ItemUnit} from './ItemUnit';

export default class ItemInventory {
  sprites: Array<Phaser.GameObjects.Sprite> = [];
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  isOpen: boolean;
  numItems: number;

  constructor(scene: Phaser.Scene) {
    // Initialize hand
    this.scene = scene;
    this.numItems = 0;

    // Get height and width to determing item placement
    const {height} = this.scene.scale;
    const {width} = this.scene.scale;

    // Initialize container to group elements
    this.container = scene.add.container(width / 2, height / 1.12);

    // Initialize/make settings menu hidden
    this.isOpen = true;
  }

  // Method to render a item from Map of Items, and it to this Phaser Container.
  renderItem(pItem: ItemUnit) {
    // If item is in map add it to Phaser container
    if (pItem) {
      // Render sprite to this Phaser Scene and offset based on the other Items
      const item = this.scene.add.sprite(
        this.numItems * 60,
        0,
        pItem.getName()
      );
      item.setData(pItem).setScale(0.25);
      // Add item sprite to Phaser container so that it do the hide/show group animation
      this.container.add(item);
      this.sprites.push(item);
      this.numItems++;
    }
  }

  getSprites(): Array<Phaser.GameObjects.Sprite> {
    return this.sprites;
  }
  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }

    // Vertical animation
    const {height} = this.scene.scale;
    const item_UP = height / 1.12;
    this.scene.tweens.add({
      targets: this.container,
      y: item_UP,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
    this.isOpen = true;
  }

  // Hide entire settings menu
  hide() {
    if (!this.isOpen) {
      return;
    }

    // Vertical animation
    const {height} = this.scene.scale;
    this.scene.tweens.add({
      targets: this.container,
      y: height + 100,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
    this.isOpen = false;
  }
}

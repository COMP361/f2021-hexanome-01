import Phaser from 'phaser';

import CardInventory from '../classes/CardInventory';

export default class InventoryScene extends Phaser.Scene {
  constructor() {
    super('inventoryscene');
  }

  create() {
    this.createHand();
  }

  createHand() {
    // Create our CardInventory.
    const cardInventory = new CardInventory(this);

    const {height} = this.scale;

    // Create Inventory button at bottom left corner to toggle all types of inventories.
    const inventoryButton = this.add.sprite(30, height - 30, 'brown-box');
    this.add
      .image(inventoryButton.x, inventoryButton.y, 'open-box')
      .setScale(0.7);

    // Make Inventory button interactive.
    inventoryButton
      .setInteractive()
      .on('pointerdown', () => {
        inventoryButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        inventoryButton.clearTint();
      })
      .on('pointerup', () => {
        inventoryButton.clearTint();
        if (cardInventory.isOpen) {
          cardInventory.hide();
        } else {
          cardInventory.show();
        }
      });

    // Add cards to hand container in hand.ts
    cardInventory.addCard('dragonCard');
    cardInventory.addCard('dragonCard');
    cardInventory.addCard('giantPigCard');
  }
}

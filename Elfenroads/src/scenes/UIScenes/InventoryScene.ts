import Phaser from 'phaser';
import CardInventory from '../../classes/CardInventory';
import ItemInventory from '../../classes/ItemInventory';
import {ObstacleType} from '../../enums/ObstacleType';
import RoadManager from '../../managers/RoadManager';
import PlayerManager from '../../managers/PlayerManager';

export default class InventoryScene extends Phaser.Scene {
  inventoryOpen = true;
  inventories: Array<any> = [];
  static items: Array<any> = [];
  static cards: Array<any> = [];

  constructor() {
    super('inventoryscene');
  }

  create() {
    this.createItemInventory();
    this.createCardInventory();

    const {height} = this.scale;

    // Create Inventory button at bottom left corner to toggle all types of inventories.
    const inventoryButton = this.add.sprite(30, height - 30, 'brown-box');
    this.add
      .image(inventoryButton.x, inventoryButton.y, 'open-box')
      .setScale(0.7);

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
        if (this.inventoryOpen) {
          this.inventoryOpen = false;
          this.inventories.forEach(inventory => {
            inventory.hide();
          });
        } else {
          this.inventoryOpen = true;
          this.inventories.forEach(inventory => {
            inventory.show();
          });
        }
      });
  }

  createItemInventory() {
    // Create our ItemInventory.
    const itemInventory = new ItemInventory(this);

    this.inventories.push(itemInventory);
    InventoryScene.items = itemInventory.getSprites();

    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();
    const playerItems = currentPlayer.getItems();

    // display all the Items on screen
    playerItems.forEach(item => {
      itemInventory.renderItem(item.getName());
    });
  }

  createCardInventory() {
    // Create our CardInventory.
    const cardInventory = new CardInventory(this);

    this.inventories.push(cardInventory);
    InventoryScene.cards = cardInventory.getSprites();

    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();
    const playerCards = currentPlayer.getCards();

    // display all the cards on screen
    playerCards.forEach(card => {
      cardInventory.renderCard(card.getName());
    });
  }
}

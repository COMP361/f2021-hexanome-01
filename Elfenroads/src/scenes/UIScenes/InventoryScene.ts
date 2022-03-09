import Phaser from 'phaser';
import CardInventory from '../../classes/CardInventory';
import ItemInventory from '../../classes/ItemInventory';
import PlayerManager from '../../managers/PlayerManager';

export default class InventoryScene extends Phaser.Scene {
  private inventoryOpen = true;
  private inventories: Array<any> = [];
  public static itemSprites: Array<Phaser.GameObjects.Sprite> = [];
  public static cardSprites: Array<Phaser.GameObjects.Sprite> = [];

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

    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const localPlayer = PlayerManager.getInstance().getLocalPlayer();
    const playerItems = localPlayer.getItems();

    // display all the Items on screen
    playerItems.forEach(item => {
      itemInventory.renderItem(item.getName());
    });

    InventoryScene.itemSprites = itemInventory.getSprites();
  }

  createCardInventory() {
    // Create our CardInventory.
    const cardInventory = new CardInventory(this);

    this.inventories.push(cardInventory);

    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const localPlayer = PlayerManager.getInstance().getLocalPlayer();
    const playerCards = localPlayer.getCards();

    // display all the cards on screen
    playerCards.forEach(card => {
      cardInventory.renderCard(card.getName());
    });

    InventoryScene.cardSprites = cardInventory.getSprites();
  }
}

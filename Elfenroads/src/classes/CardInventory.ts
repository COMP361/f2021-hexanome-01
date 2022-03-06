import Phaser from 'phaser';

export default class CardInventory {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  isOpen: boolean;
  numCards: number;

  constructor(scene: Phaser.Scene) {
    // Initialize hand
    this.scene = scene;
    this.numCards = 0;

    // Get height and width to determing card placement
    const {height} = this.scene.scale;
    const {width} = this.scene.scale;

    // Size of card when faced up
    const CARD_UP = height / 1.12;

    // Initialize container to group elements
    this.container = scene.add.container(width / 4.2, CARD_UP);

    // Initialize/make settings menu hidden
    this.isOpen = true;
  }

  // Method to render a card from Map of cards, and it to this Phaser Container.
  addCard(cardName: string) {
    const CARD_SIZE = 0.2;

    // If card is in map add it to Phaser container
    if (cardName) {
      // Render sprite to this Phaser Scene and offset based on the other cards
      const card = this.scene.add.sprite(this.numCards * 30, 0, cardName);
      card
        .setData({
          name: cardName,
        })
        .setScale(CARD_SIZE);

      // Add card sprite to Phaser container so that it do the hide/show group animation
      this.container.add(card);
      this.numCards++;
    }
  }

  // Not finished yet
  removeCard(cardName: string) {
    const children = this.scene.children;
    const child = children.getByName(cardName);
    if (child !== null) {
      child.destroy(true);
      this.numCards--;
    }
  }

  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }

    // Vertical animation
    const {height} = this.scene.scale;
    const CARD_UP = height / 1.12;
    this.scene.tweens.add({
      targets: this.container,
      y: CARD_UP,
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

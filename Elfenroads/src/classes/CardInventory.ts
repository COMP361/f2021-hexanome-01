import Phaser from 'phaser';
import {CardManager} from '../managers/CardManager';
import UIScene from '../scenes/UIScene';

export default class CardInventory {
  sprites: Array<Phaser.GameObjects.Sprite> = [];
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  isOpen: boolean;
  numCards: number;

  constructor(scene: Phaser.Scene) {
    // Initialize hand
    this.scene = scene;
    this.numCards = 0;

    // Get height and width to determing card placement
    const height = this.scene.cameras.main.height;
    const pos = UIScene.getResponsivePosition(this.scene, 250, 670);
    this.container = scene.add.container(pos[0], pos[1]).setDepth(3);

    // Initialize/make settings menu hidden
    this.isOpen = true;
  }

  // Method to render a card from Map of cards, and it to this Phaser Container.
  renderCard(cardName: string) {
    const CARD_SIZE = 0.2;

    // If card is in map add it to Phaser container
    if (cardName) {
      // Render sprite to this Phaser Scene and offset based on the other cards
      const card = this.scene.add
        .sprite(this.numCards * 40, 0, cardName)
        .setData('instance');
      card.name = cardName;
      card.setScale(CARD_SIZE);

      // Add card sprite to Phaser container so that it do the hide/show group animation
      this.container.add(card);
      this.sprites.push(card);
      this.numCards++;
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

import Phaser from 'phaser';
import {CardManager} from '../managers/CardManager';

export default class CardInventory {
  sprites: Array<Phaser.GameObjects.Sprite> = [];
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  isOpen: boolean;
  numCards: number;
  selected: Array<Phaser.GameObjects.Sprite> = [];

  constructor(scene: Phaser.Scene) {
    // Initialize hand
    this.scene = scene;
    this.numCards = 0;

    // Get height and width to determing card placement
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;

    // Size of card when faced up
    const CARD_UP = height / 1.12;

    // Initialize container to group elements
    this.container = scene.add.container(width / 4.2, CARD_UP).setDepth(3);

    // Initialize/make settings menu hidden
    this.isOpen = true;

    // Create confirm button at bottom right corner to confirm selection.
    const confirmButton = this.scene.add.sprite(30, height - 80, 'brown-box');
    this.scene.add
      .image(confirmButton.x, confirmButton.y, 'check')
      .setScale(0.5);

    confirmButton
      .setInteractive()
      .on('pointerdown', () => {
        confirmButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        confirmButton.clearTint();
      })
      .on('pointerup', () => {
        confirmButton.clearTint();
        if (this.selected.length > 0) {
          for (const card of this.selected) {
            card.removeInteractive();
            CardManager.getInstance().addSelectedCard(card.name);
          }
        }
      });
  }

  private isSeleted(card: Phaser.GameObjects.Sprite): number {
    for (let i = 0; i < this.selected.length; i++) {
      if (this.selected[i] === card) {
        return i;
      }
    }
    return -1;
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

      // make it possible to select and check card
      card
        .setInteractive()
        .on('pointerover', () => {
          card.setTint(0xffffff);
          card.y -= 50;
        })
        .on('pointerdown', () => {
          card.setTint(0x808080);
          const index: number = this.isSeleted(card);
          if (index === -1) {
            card.y -= 50;
            this.selected.push(card);
          } else {
            card.y += 50;
            this.selected.splice(index, 1);
          }
        })
        .on('pointerout', () => {
          card.clearTint();
          card.y += 50;
        })
        .on('pointerup', () => {
          card.clearTint();
        });

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

import Phaser from 'phaser';

import Hand from '../classes/Hand';

export default class CardScene extends Phaser.Scene {
  constructor() {
    super('cardscene');
  }

  create() {
    this.createHand();
  }

  createHand() {
    // Create our hand with Card class
    const hand = new Hand(this);

    const {height} = this.scale;

    // Create button at bottom left corner to toggle card hand.
    const handButton = this.add.sprite(30, height - 30, 'brown-box');
    this.add.image(handButton.x, handButton.y, 'open-box').setScale(0.7);

    // Make button interactive.
    handButton
      .setInteractive()
      .on('pointerdown', () => {
        handButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        handButton.clearTint();
      })
      .on('pointerup', () => {
        handButton.clearTint();
        if (hand.isOpen) {
          hand.hide();
        } else {
          hand.show();
        }
      });

    // Add cards to hand container in hand.ts
    hand.addCard('dragonCard');
    hand.addCard('dragonCard');
    hand.addCard('giantPigCard');
  }
}

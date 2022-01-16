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

    const handButton = this.add.sprite(30, height - 30, 'brown-box');
    this.add.image(handButton.x, handButton.y, 'open-box').setScale(0.7);

    handButton.setInteractive()
        .on('pointerdown',
            function() {
              handButton.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
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
    // add cards
    hand.addCard('dragonCard');
    hand.addCard('dragonCard');
    hand.addCard('giantPigCard');
  }
}

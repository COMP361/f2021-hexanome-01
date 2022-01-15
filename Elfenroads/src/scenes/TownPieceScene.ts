import Phaser from 'phaser';

import eventsCenter from '../classes/EventsCenter';

export default class TownPieceScene extends Phaser.Scene {
  constructor() {
    super('townpiecescene');
  }

  create() {
    const {width} = this.scale;
    /* toggles town piece visibility */
    const townPieceButton = this.add.sprite(width - 130, 30, 'brown-box');
    this.add.image(townPieceButton.x, townPieceButton.y, 'information').setScale(0.7);

    // Add interactivity
    townPieceButton.setInteractive()
        .on('pointerdown',
            function() {
              townPieceButton.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              townPieceButton.clearTint();
            })
        .on('pointerup', function() {
          eventsCenter.emit('update-town-piece-vis', true);
        });
  }
}
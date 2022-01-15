import Phaser from 'phaser';

import eventsCenter from '../classes/EventsCenter';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('uiscene');
  }

  create() {
    // All UI related scene are launched here:
    this.scene.launch('movebootscene');
    this.scene.launch('settingsscene');
    this.scene.launch('cheatsheetscene');

    const {width} = this.scale;

    // Show our dude
    const p = this.add.sprite(this.cameras.main.width / 7, this.cameras.main.height / 6, 'green-actor');
    this.points = this.add.text(this.cameras.main.width / 7.3, this.cameras.main.height / 6.4, '0', {
      fontSize: 32,
      color: '#000000',
    });
    p.setScale(2);

    eventsCenter.on('update-points', this.updatePoints, this);

    /* show other player token */
    const boot = this.add.sprite(this.cameras.main.width / 7, this.cameras.main.height / 4, 'blue-actor');
    const bootCards = this.add.sprite(this.cameras.main.width / 7 + boot.displayWidth * .47, this.cameras.main.height / 4, 'blue-actorcards');

    boot.setScale(0.3);
    bootCards.setScale(0.3);

    bootCards.setVisible(false);

    boot.setInteractive().on('pointerdown', function() {
      bootCards.setVisible(true);
    });

    bootCards.setInteractive().on('pointerdown', function() {
      bootCards.setVisible(false);
    });

    /* toggles town piece visibility */
    const townPieceButton = this.add.sprite(width - 130, 30, 'grey-box');
    this.add.image(townPieceButton.x, townPieceButton.y, 'information').setScale(0.7);

    // Add interactivity
    townPieceButton.setInteractive()
        .on('pointerdown',
            function() {
              this.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              this.clearTint();
            })
        .on('pointerup', function() {
          eventsCenter.emit('update-town-piece-vis', true);
        });
  }

  updatePoints(points) {
    this.points.text = `${points}`;
  }
}

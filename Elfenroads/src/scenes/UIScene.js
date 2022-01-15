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
    this.scene.launch('townpiecescene');

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
  }

  updatePoints(points) {
    this.points.text = `${points}`;
  }
}

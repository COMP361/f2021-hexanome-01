import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('uiscene');
  }

  create() {
    // All UI related scene are launched here:
    this.scene.launch('movebootscene');  // Launch MoveBootScene.js
    this.scene.launch('settingsscene');


    const boot = this.add.sprite(this.cameras.main.width / 7, this.cameras.main.height / 5, 'blue-actor');
    const bootCards = this.add.sprite(this.cameras.main.width / 7 + boot.displayWidth * .47, this.cameras.main.height / 5, 'blue-actorcards');

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
}

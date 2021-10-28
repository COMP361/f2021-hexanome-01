import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('uiscene')
  }

  create() {

    // All UI related scene are launched here:
    this.scene.launch('movebootscene');  // Launch MoveBootScene.js
    this.scene.launch('settingsscene')
    

    const boot = this.add.sprite(
        this.cameras.main.width / 7, this.cameras.main.height / 5,
        'blue-actor');
    const boot_cards = this.add.sprite(
        this.cameras.main.width / 7 + boot.displayWidth * .47,
        this.cameras.main.height / 5, 'blue-actorcards');

    boot.setScale(0.3);
    boot_cards.setScale(0.3);

    boot_cards.setVisible(false);

    boot.setInteractive().on('pointerdown', function() {
      boot_cards.setVisible(true);
    });

    boot_cards.setInteractive().on('pointerdown', function() {
      boot_cards.setVisible(false);
    });
  }
}

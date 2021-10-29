import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('uiscene');
  }

  create() {
    // All UI related scene are launched here:
    this.scene.launch('movebootscene');
    this.scene.launch('settingsscene');

    /* show other player token */
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

    /* toggles cheat sheet */
    const {width} = this.scale;
    // Create cheatsheetButton (gear icon)
    const cheatsheetButton = this.add.sprite(width - 80, 30, 'grey-box');
    this.add.image(cheatsheetButton.x, cheatsheetButton.y, 'question').setScale(0.7);
    // add image
    const cheatSheet = this.add.image(width - 150, 260, 'grid');
    cheatSheet.setScale(0.6);
    cheatSheet.setVisible(false);

    // Add interactivity (display image when hover over) for cheatsheetButton
    cheatsheetButton.setInteractive()
        .on('pointerdown',
            function() {
              this.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              this.clearTint();
            })
        .on('pointerup', function() {
          cheatSheet.setVisible(!cheatSheet.visible);
        });
  }
}

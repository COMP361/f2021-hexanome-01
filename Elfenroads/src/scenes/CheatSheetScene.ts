import Phaser from 'phaser';

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super('cheatsheetscene');
  }

  create() {
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
              cheatsheetButton.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              cheatsheetButton.clearTint();
            })
        .on('pointerup', function() {
          cheatSheet.setVisible(!cheatSheet.visible);
        });
  }
}

import Phaser from 'phaser';
import CheatSheetMenu from '../classes/CheatSheetMenu';

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super('cheatsheetscene');
  }

  create() {
    // Create menu that will slide out after clicking question mark button
    const cheatSheetMenu = new CheatSheetMenu(this);

    // Create question mark button
    const {width} = this.scale;
    const cheatsheetButton = this.add.sprite(width - 80, 30, 'grey-box');
    this.add.image(cheatsheetButton.x, cheatsheetButton.y, 'question').setScale(0.7);

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
          cheatsheetButton.clearTint();
          if (cheatSheetMenu.isOpen) {
            cheatSheetMenu.hide();
          } else {
            cheatSheetMenu.show();
          }
        });
  }
}

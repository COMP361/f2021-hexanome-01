import Phaser from 'phaser';

import SettingsMenu from '../classes/SettingsMenu';

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super('settingsscene');
  }

  create() {
    // Create menu that will slide out after clicking settingsButton
    const settingsMenu = new SettingsMenu(this);

    // Create settingsButton (gear icon)
    const {width} = this.scale;
    const settingsButton = this.add.sprite(width - 30, 30, 'grey-box');
    this.add.image(settingsButton.x, settingsButton.y, 'gear').setScale(0.7);

    // Add interactive pointer options for settingsButton
    settingsButton.setInteractive()
        .on('pointerdown',
            function() {
              settingsButton.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              settingsButton.clearTint();
            })
        .on('pointerup', function() {
          settingsButton.clearTint();
          if (settingsMenu.isOpen) {
            settingsMenu.hide();
          } else {
            settingsMenu.show();
          }
        });
  }
}

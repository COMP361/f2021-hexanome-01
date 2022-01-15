import Phaser from 'phaser';

import CheatSheetMenu from '../classes/CheatSheetMenu';
import SettingsMenu from '../classes/SettingsMenu';

export default class UpperUI extends Phaser.Scene {
  buttons: any[] = [];

  constructor() {
    super('upperuiscene');
  }

  create() {
    this.createSettings();
    this.createCheatSheet();
  }

  createSettings() {
    // Create menu that will slide out after clicking settingsButton
    const settingsMenu = new SettingsMenu(this);

    // Add menu object to button object array
    this.buttons.push(settingsMenu);

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
        .on('pointerup', () => {
          settingsButton.clearTint();
          if (settingsMenu.isOpen) {
            settingsMenu.hide();
          } else {
            this.buttons.forEach((m) => {
              (m.hide());
            });
            settingsMenu.show();
          }
        });
  }

  createCheatSheet() {
    const {width} = this.scale;
    // Create menu that will slide out after clicking question mark button
    const cheatSheetMenu = new CheatSheetMenu(this);

    // Add menu object to button object array
    this.buttons.push(cheatSheetMenu);

    // Create question mark button
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
        .on('pointerup', () => {
          cheatsheetButton.clearTint();
          if (cheatSheetMenu.isOpen) {
            cheatSheetMenu.hide();
          } else {
            this.buttons.forEach((m) => {
              (m.hide());
            });
            cheatSheetMenu.show();
          }
        });
  }
}
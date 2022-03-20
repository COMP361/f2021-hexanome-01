import Phaser from 'phaser';

import CheatSheetMenu from '../../classes/CheatSheetMenu';
import eventsCenter from '../../classes/EventsCenter';
import SettingsMenu from '../../classes/SettingsMenu';
import Town from '../../classes/Town';

export default class UpperUIScene extends Phaser.Scene {
  // Global array to store buttons in this scene
  buttons: Array<any>;

  constructor() {
    super('upperuiscene');
    this.buttons = [];
  }

  create() {
    this.createSettings();
    this.createCheatSheet();
    this.createTownPieceToggle();
    this.createDestinationTown();
  }

  // Method to create Settings menu
  createSettings() {
    // Create menu that will slide out after clicking settingsButton
    const settingsMenu = new SettingsMenu(this);

    // Add menu object to button object array
    this.buttons.push(settingsMenu);

    // Create settingsButton (gear icon)
    const width = this.cameras.main.width;
    const settingsButton = this.add.sprite(width - 30, 30, 'brown-box');
    this.add.image(settingsButton.x, settingsButton.y, 'gear').setScale(0.7);

    // Add interactive pointer options for settingsButton
    settingsButton
      .setInteractive()
      .on('pointerdown', () => {
        settingsButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        settingsButton.clearTint();
      })
      .on('pointerup', () => {
        settingsButton.clearTint();
        if (settingsMenu.isOpen) {
          settingsMenu.hide();
        } else {
          this.buttons.forEach(m => {
            m.hide();
          });
          settingsMenu.show();
        }
      });
  }

  // Method to create elfenroads cheat sheet card/menu
  createCheatSheet() {
    const width = this.cameras.main.width;
    // Create menu that will slide out after clicking question mark button
    const cheatSheetMenu = new CheatSheetMenu(this);

    // Add menu object to button object array
    this.buttons.push(cheatSheetMenu);

    // Create question mark button
    const cheatsheetButton = this.add.sprite(width - 80, 30, 'brown-box');
    this.add
      .image(cheatsheetButton.x, cheatsheetButton.y, 'question')
      .setScale(0.7);

    // Add interactivity (display image when hover over) for cheatsheetButton
    cheatsheetButton
      .setInteractive()
      .on('pointerdown', () => {
        cheatsheetButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        cheatsheetButton.clearTint();
      })
      .on('pointerup', () => {
        cheatsheetButton.clearTint();
        if (cheatSheetMenu.isOpen) {
          cheatSheetMenu.hide();
        } else {
          this.buttons.forEach(m => {
            m.hide();
          });
          cheatSheetMenu.show();
        }
      });
  }

  createTownPieceToggle() {
    const {width} = this.scale;
    /* toggles town piece visibility */
    const townPieceButton = this.add.sprite(width - 130, 30, 'brown-box');
    this.add
      .image(townPieceButton.x, townPieceButton.y, 'information')
      .setScale(0.7);

    // Add interactivity
    townPieceButton
      .setInteractive()
      .on('pointerdown', () => {
        townPieceButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        townPieceButton.clearTint();
      })
      .on('pointerup', () => {
        eventsCenter.emit('update-town-piece-vis', true);
      });
  }

  createDestinationTown() {
    const {width} = this.scale;
    const towns = Array.from(Town.getAllTowns().keys());
    const town = towns[Math.floor(Math.random() * towns.length)];
    /*destination town*/
    const destText: Phaser.GameObjects.Text = this.add.text(6, 10, `${town}`, {
      fontFamily: 'MedievalSharp',
      fontSize: '24px',
    });

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, destText.width + 20, 30, 'brown-panel', 24)
      .setOrigin(0, 0);

    const container: Phaser.GameObjects.Container = this.add.container(
      width - 360,
      8
    );

    container.add(brownPanel);
    container.add(destText);
  }
}

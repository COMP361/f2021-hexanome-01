import Phaser from 'phaser';

export default class SettingsMenu {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    // Initialize scene from input
    this.scene = scene;

    // Initialize/make settings menu hidden
    const isOpen = false;
    this.isOpen = isOpen;

    // Initialize container to group elements
    const {width} = this.scene.scale;
    const container = this.scene.add.container(width + 300, 60);
    this.container = container;

    // Create grey ui panel element
    const panel = this.scene.add.nineslice(0, 0, 137, 50, 'grey-panel', 24).setOrigin(1, 0);
    this.panel = panel;
    this.container.add(this.panel);

    this.createMusicButton();
    this.createSaveButton();
    this.createExitButton();
  }

  // Create toggle music button to be added to panel / container
  createMusicButton() {
    // Create grey ui button element
    const toggleMusic = this.scene.add.image(-this.panel.width + 10, 8, 'grey-box').setOrigin(0, 0);

    // Create music icons elements
    const musicOn =
        this.scene.add.image(toggleMusic.x + toggleMusic.height * 0.5, toggleMusic.y + toggleMusic.height * 0.5, 'music-on').setScale(0.7);

    const musicOff = this.scene.add.image(toggleMusic.x + toggleMusic.height * 0.5, toggleMusic.y + toggleMusic.height * 0.5, 'music-off')
                         .setScale(0.7)
                         .setVisible(false);

    // Add all elements to container for grouped animations
    this.container.add(toggleMusic);
    this.container.add(musicOn);
    this.container.add(musicOff);

    // interactive pointer options for toggleMusic button
    toggleMusic.setInteractive()
        .on('pointerdown',
            function() {
              this.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              this.clearTint();
            })
        .on('pointerup', function() {
          this.clearTint();

          let isMute = !musicOn.visible;
          isMute = !isMute;
          musicOn.setVisible(!isMute);

          this.scene.sound.mute = isMute;
          musicOff.setVisible(isMute);
        });
  }

  // Create toggle save button to be added to panel / container
  createSaveButton() {
    // Create grey ui button element
    const toggleSave = this.scene.add.image(-this.panel.width + 50, 8, 'grey-box').setOrigin(0, 0);

    // Create save icon element
    const saveIcon = this.scene.add.image((toggleSave.x + toggleSave.height * 0.5) + 1, toggleSave.y + toggleSave.height * 0.5, 'save').setScale(0.7);

    // Add all elements to container for grouped animations
    this.container.add(toggleSave);
    this.container.add(saveIcon);

    // interactive pointer options for toggleSave button
    toggleSave.setInteractive()
        .on('pointerdown',
            function() {
              this.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              this.clearTint();
            })
        .on('pointerup', function() {
          this.clearTint();
        });
  }

  // Create toggle exit button to be added to panel / container
  createExitButton() {
    // Create grey ui button element
    const toggleExit = this.scene.add.image(-this.panel.width + 90, 8, 'grey-box').setOrigin(0, 0);

    // Create exit icon element
    const exitIcon = this.scene.add.image((toggleExit.x + toggleExit.height * 0.5) + 1, toggleExit.y + toggleExit.height * 0.5, 'door').setScale(0.7);

    // Add all elements to container for grouped animations
    this.container.add(toggleExit);
    this.container.add(exitIcon);

    // interactive pointer options for toggleExit button
    toggleExit.setInteractive()
        .on('pointerdown',
            function() {
              this.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              this.clearTint();
            })
        .on('pointerup', function() {
          this.clearTint();
        });
  }

  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }

    const {width} = this.scene.scale;

    this.scene.tweens.add({
      targets: this.container,
      x: width - 10,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    this.isOpen = true;
  }

  // Hide entire settings menu
  hide() {
    if (!this.isOpen) {
      return;
    }
    const {width} = this.scene.scale;

    this.scene.tweens.add({
      targets: this.container,
      x: width + 300,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    this.isOpen = false;
  }
}

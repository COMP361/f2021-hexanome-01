import Phaser from 'phaser';

export default class SettingsMenu {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  isOpen: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    // Initialize container to group elements
    const {width} = scene.scale;
    this.container = scene.add.container(width + 300, 60);

    // Initialize/make settings menu hidden
    this.isOpen = false;

    // Create grey ui panel element
    const panel = scene.add
      .nineslice(0, 0, 170, 61, 'brown-panel', 24)
      .setOrigin(1, 0);

    this.container.add(panel);

    this.createMusicButton(panel);
    this.createSaveButton(panel);
    this.createExitButton(panel);
  }

  // Create toggle music button to be added to panel / container
  createMusicButton(panel: Phaser.GameObjects.RenderTexture) {
    // Create grey ui button element
    const toggleMusic = this.scene.add
      .image(-panel.width + 10, 8, 'brown-box')
      .setOrigin(0, 0);

    // Create music icons elements
    const musicOn = this.scene.add
      .image(
        toggleMusic.x + toggleMusic.height * 0.5,
        toggleMusic.y + toggleMusic.height * 0.5,
        'music-on'
      )
      .setScale(0.7);

    const musicOff = this.scene.add
      .image(
        toggleMusic.x + toggleMusic.height * 0.5,
        toggleMusic.y + toggleMusic.height * 0.5,
        'music-off'
      )
      .setScale(0.7)
      .setVisible(false);

    // Add all elements to container for grouped animations
    this.container.add(toggleMusic);
    this.container.add(musicOn);
    this.container.add(musicOff);

    // interactive pointer options for toggleMusic button
    toggleMusic
      .setInteractive()
      .on('pointerdown', () => {
        toggleMusic.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        toggleMusic.clearTint();
      })
      .on('pointerup', () => {
        toggleMusic.clearTint();

        let isMute = !musicOn.visible;
        isMute = !isMute;
        musicOn.setVisible(!isMute);

        this.scene.sound.mute = isMute;
        musicOff.setVisible(isMute);
      });
  }

  // Create toggle save button to be added to panel / container
  createSaveButton(panel: Phaser.GameObjects.RenderTexture) {
    // Create grey ui button element
    const toggleSave = this.scene.add
      .image(-panel.width + 63, 8, 'brown-box')
      .setOrigin(0, 0);

    // Create save icon element
    const saveIcon = this.scene.add
      .image(
        toggleSave.x + toggleSave.height * 0.5 + 1,
        toggleSave.y + toggleSave.height * 0.5,
        'save'
      )
      .setScale(0.7);

    // Add all elements to container for grouped animations
    this.container.add(toggleSave);
    this.container.add(saveIcon);

    // interactive pointer options for toggleSave button
    toggleSave
      .setInteractive()
      .on('pointerdown', () => {
        toggleSave.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        toggleSave.clearTint();
      })
      .on('pointerup', () => {
        toggleSave.clearTint();
      });
  }

  // Create toggle exit button to be added to panel / container
  createExitButton(panel: Phaser.GameObjects.RenderTexture) {
    // Create grey ui button element
    const toggleExit = this.scene.add
      .image(-panel.width + 115, 8, 'brown-box')
      .setOrigin(0, 0);

    // Create exit icon element
    const exitIcon = this.scene.add
      .image(
        toggleExit.x + toggleExit.height * 0.5 + 1,
        toggleExit.y + toggleExit.height * 0.5,
        'door'
      )
      .setScale(0.7);

    // Add all elements to container for grouped animations
    this.container.add(toggleExit);
    this.container.add(exitIcon);

    // interactive pointer options for toggleExit button
    toggleExit
      .setInteractive()
      .on('pointerdown', () => {
        toggleExit.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        toggleExit.clearTint();
      })
      .on('pointerup', () => {
        toggleExit.clearTint();
      });
  }

  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }

    // Horizontal animation
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

    // Horizontal animation
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

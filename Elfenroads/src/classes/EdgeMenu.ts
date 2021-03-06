import Phaser from 'phaser';

export default class EdgeMenu {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  isOpen: boolean;
  counterCenterX: number;
  counterCenterY: number;
  callback: Function;
  args: Array<any>;

  constructor(scene: Phaser.Scene, x: number, y: number, callback: Function) {
    this.scene = scene;
    this.counterCenterX = x;
    this.counterCenterY = y;
    this.callback = callback;
    this.args = [];

    // Initialize container to group elements
    this.container = scene.add
      .container(this.counterCenterX, this.counterCenterY)
      .setDepth(3);

    // Initialize/make settings menu hidden
    this.isOpen = false;

    this.createConfirmButton();
  }

  setArgs(args: Array<any>) {
    this.args = args;
  }
  // Create toggle confirm button to be added to panel / container
  createConfirmButton() {
    // Create grey ui button element
    const toggleConfirm = this.scene.add.image(0, 0, 'green-box').setScale(0.7);

    // Add all elements to container for grouped animations
    this.container.add(toggleConfirm);

    // interactive pointer options for toggleConfirm button
    toggleConfirm
      .setInteractive()
      .on('pointerdown', () => {
        toggleConfirm.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        toggleConfirm.clearTint();
      })
      .on('pointerup', () => {
        toggleConfirm.clearTint();
        this.callback(this.args[0], this.args[1], this.args[2]);
      });
  }

  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }

    // Horizontal animation
    this.scene.tweens.add({
      targets: this.container,
      y: this.counterCenterY - 35,
      duration: 200,
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
    this.scene.tweens.add({
      targets: this.container,
      y: this.counterCenterY,
      duration: 200,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
    this.isOpen = false;
  }
}

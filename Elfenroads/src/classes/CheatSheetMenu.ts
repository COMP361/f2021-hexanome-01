import Phaser from 'phaser';

export default class CheatSheetMenu {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container
  isOpen: boolean;


  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    // Initialize container to group elements
    const {width} = scene.scale;
    this.container = scene.add.container(width + 300, 60);

    // Initialize/make settings menu hidden
    this.isOpen = false;

    // Create grey ui panel element

    // const cheatSheet = this.add.image(width - 150, 260, 'grid');
    const panel = scene.add.nineslice(0, 0, 137, 50, 'grey-panel', 24).setOrigin(1, 0);

    this.container.add(panel);
  }

  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }

    const {width} = this.scene.scale;

    this.scene.tweens.add({targets: this.container, x: width - 10, duration: 300, ease: Phaser.Math.Easing.Sine.InOut});

    this.isOpen = true;
  }

  // Hide entire settings menu
  hide() {
    if (!this.isOpen) {
      return;
    }
    const {width} = this.scene.scale;

    this.scene.tweens.add({targets: this.container, x: width + 300, duration: 300, ease: Phaser.Math.Easing.Sine.InOut});

    this.isOpen = false;
  }
}
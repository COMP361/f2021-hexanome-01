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

    // Create grey brown panel element
    const panel = scene.add.nineslice(0, 0, 200, 300, 'brown-panel', 24).setOrigin(1, 0);

    this.container.add(panel);
    this.createSheet(panel);
  }

  // Add the elfenroads cheat sheet on top of brown panel
  createSheet(panel: Phaser.GameObjects.RenderTexture) {
    const cheatSheet = this.scene.add.image(panel.width - 300, 150, 'grid').setScale(0.4);
    this.container.add(cheatSheet);
  }

  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }

    // Horizontal animation
    const {width} = this.scene.scale;
    this.scene.tweens.add({targets: this.container, x: width - 10, duration: 300, ease: Phaser.Math.Easing.Sine.InOut});
    this.isOpen = true;
  }

  // Hide entire settings menu
  hide() {
    if (!this.isOpen) {
      return;
    }

    // Horizontal animation
    const {width} = this.scene.scale;
    this.scene.tweens.add({targets: this.container, x: width + 300, duration: 300, ease: Phaser.Math.Easing.Sine.InOut});
    this.isOpen = false;
  }
}

import Phaser from 'phaser';

export default class BoardScene extends Phaser.Scene {
  constructor() {
    super('boardscene');
  }

  create() {
    // Send boardscene to back so that UI can sit on top.
    this.scene.sendToBack();

    // Create light brown background
    const background = this.add.image(0, 0, 'brownBackground').setOrigin(0, 0);
    background.displayWidth = this.sys.canvas.width;
    background.displayHeight = this.sys.canvas.height;

    // Create map
    const map = this.add
      .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map')
      .setDisplaySize(
        this.cameras.main.width * 0.6,
        this.cameras.main.height * 0.7
      )
      .setDepth(2);

    // Create dark brown board to go under map
    const brownPanel = this.add.nineslice(
      map.getTopLeft().x,
      map.getTopLeft().y,
      map.displayWidth,
      map.displayHeight,
      'brown-panel',
      24
    );
    brownPanel.setDepth(1);
  }
}

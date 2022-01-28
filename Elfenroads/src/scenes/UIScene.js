import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('uiscene');
  }

  create() {
    // All UI related scene are launched here:
    this.scene.launch('movebootscene');
    this.scene.launch('upperuiscene');
    this.scene.launch('townpiecescene');
    this.scene.launch('cardscene');
    this.scene.launch('playertokenscene');
  }

  updatePoints(points) {
    this.points.text = `${points}`;
  }
}

import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  points: any;
  constructor() {
    super('uiscene');
  }

  create() {
    // All UI related scene are launched here:
    this.scene.launch('movebootscene');
    this.scene.launch('counterscene');
    this.scene.launch('upperuiscene');
    this.scene.launch('townpiecescene');
    this.scene.launch('inventoryscene');
    this.scene.launch('playericonscene');
  }

  updatePoints(points: any) {
    this.points.text = `${points}`;
  }
}

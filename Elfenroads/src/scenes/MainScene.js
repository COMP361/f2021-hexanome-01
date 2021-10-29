import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('mainscene');
  }

  create() {
    // //////////////////////////////////////////////////////////
    // /////// MAIN SCENE WILL LAUNCH ALL OTHER SCENES //////////
    // //////////////////////////////////////////////////////////
    // Launch BoardScene.js
    this.scene.launch('boardscene');
    // Launch UIScene.js
    this.scene.launch('uiscene');
  }
}

import Phaser from 'phaser';
import GameManager from '../managers/GameManager';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('mainscene');
  }

  create() {
    // Game sequence is initiated. This is not final, just simulating it right now...
    GameManager.getInstance().playGame();

    // //////////////////////////////////////////////////////////
    // /////// MAIN SCENE WILL LAUNCH ALL OTHER SCENES //////////
    // //////////////////////////////////////////////////////////

    // Launch BoardScene.js
    this.scene.launch('boardscene');
    // Launch UIScene.js
    this.scene.launch('uiscene');
  }
}

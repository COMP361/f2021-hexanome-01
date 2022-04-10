// prettier-ignore
import Phaser from 'phaser';
import GameManager from '../managers/GameManager';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('mainscene');
  }

  create() {

    // play music
    // this.sound.play('medieval-music');

    // Launch UI related scenes
    this.scene.launch('uiscene');

    // Game sequence is initiated.
    // We pass in this Phase.Scene that way we can launch other scenes in the GameManager class.
    GameManager.getInstance().playGame(this);
  }
}
// prettier-ignore

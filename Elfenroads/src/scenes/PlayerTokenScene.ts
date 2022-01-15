import Phaser from 'phaser';
import PlayerToken from '../classes/PlayerToken';

export default class PlayerTokenScene extends Phaser.Scene {
  xOrigin: number;
  yOrigin: number;

  constructor() {
    super('playertokenscene');
    this.xOrigin = this.cameras.main.width / 7;
    this.yOrigin = this.cameras.main.height / 4;
  }

  create() {
    const player1 = new PlayerToken(this, this.xOrigin, this.yOrigin, 'blue-actor');
    player1.addCounter('unknown-counter');
    player1.addCounter('pig-counter');
    player1.addCounter('cloud-counter');
    // const player2 = new PlayerToken(this, this.xOrigin, this.yOrigin - 80, 'blue-actor');
    // player2.addCounter('unknown-counter');
  }
}

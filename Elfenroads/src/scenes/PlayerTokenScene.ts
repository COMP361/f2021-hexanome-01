import Phaser from 'phaser';
import PlayerToken from '../classes/PlayerToken';

export default class PlayerTokenScene extends Phaser.Scene {
  constructor() {
    super('playertokenscene');
  }

  create() {
    const player1 = new PlayerToken(this, this.cameras.main.width / 7, this.cameras.main.height / 4, 'blue-actor');
    player1.addCounter('unknown-counter');
    player1.addCounter('pig-counter');
    player1.addCounter('cloud-counter');
    // const player2 = new PlayerToken(this, this.xOrigin, this.yOrigin - 80, 'blue-actor');
    // player2.addCounter('unknown-counter');
  }
}

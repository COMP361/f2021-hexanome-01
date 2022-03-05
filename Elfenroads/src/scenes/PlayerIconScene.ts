import Phaser from 'phaser';
import {BootColour} from '../enums/BootColour';
import PlayerIcon from '../classes/PlayerIcon';

export default class PlayerTokenScene extends Phaser.Scene {
  constructor() {
    super('playericonscene');
  }

  create() {
    const player1 = new PlayerIcon(
      this,
      this.cameras.main.width / 7,
      this.cameras.main.height / 4,
      BootColour.Green
    );
    player1.addCounter('unknown-counter');
    player1.addCounter('pig-counter');
    player1.addCounter('cloud-counter');

    const player2 = new PlayerIcon(
      this,
      this.cameras.main.width / 7,
      this.cameras.main.height / 3 + 10,
      BootColour.Blue
    );
    player2.addCounter('unknown-counter');
  }
}

import Phaser from 'phaser';
import {BootColour} from '../enums/BootColour';
import PlayerIcon from '../classes/PlayerIcon';
import PlayerManager from '../managers/PlayerManager';
import Player from '../classes/Player';

export default class PlayerTokenScene extends Phaser.Scene {
  constructor() {
    super('playericonscene');
  }

  private addAllPlayer(): Array<PlayerIcon> {
    const icons: Array<PlayerIcon> = [];
    const players: Array<Player> = PlayerManager.getInstance().getPlayers();
    for (let i = 0; i < players.length; i++) {
      icons.push(
        new PlayerIcon(
          this,
          this.cameras.main.width / 7,
          this.cameras.main.height / 4 + 70 * i,
          BootColour.Green
        )
      );
    }
    return icons;
  }

  create() {
    const player1: PlayerIcon = new PlayerIcon(
      this,
      this.cameras.main.width / 7,
      this.cameras.main.height / 4,
      BootColour.Green
    );
    player1.addCounter('unknown-counter');
    player1.addCounter('pig-counter');
    player1.addCounter('cloud-counter');

    const player2: PlayerIcon = new PlayerIcon(
      this,
      this.cameras.main.width / 7,
      this.cameras.main.height / 4 + 70,
      BootColour.Blue
    );
    player2.addCounter('unknown-counter');
  }
}

import Phaser from 'phaser';
import PlayerIcon from '../classes/PlayerIcon';
import PlayerManager from '../managers/PlayerManager';
import Player from '../classes/Player';
import {ItemUnit} from '../classes/ItemUnit';

export default class PlayerIconScene extends Phaser.Scene {
  private playerIcons: Array<PlayerIcon>;

  private createPlayerIcons(): Array<PlayerIcon> {
    const icons: Array<PlayerIcon> = [];
    const players: Array<Player> = PlayerManager.getInstance().getPlayers();

    for (let i = 0; i < players.length; i++) {
      const icon: PlayerIcon = new PlayerIcon(
        this,
        this.cameras.main.width / 7,
        this.cameras.main.height / 4 + 70 * i,
        players[i].getBootColour()
      );
      const items: Array<ItemUnit> = players[i].getItems();
      for (let i = 0; i < items.length; i++) {
        icon.addItem(items[i].name);
      }
      icons.push(icon);
      if (players[i] !== PlayerManager.getInstance().getCurrentPlayer()) {
        icon.addBootImg(
          players[i].getCurrentLocation().getXposition(),
          players[i].getCurrentLocation().getYposition()
        );
      }
    }
    return icons;
  }

  constructor() {
    super('playericonscene');
    this.playerIcons = [];
  }

  create() {
    this.playerIcons = this.createPlayerIcons();
  }
}

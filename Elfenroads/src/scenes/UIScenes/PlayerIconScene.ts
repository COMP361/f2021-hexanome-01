import Phaser from 'phaser';
import PlayerIcon from '../../classes/PlayerIcon';
import PlayerManager from '../../managers/PlayerManager';
import Player from '../../classes/Player';
import {ItemUnit} from '../../classes/ItemUnit';

export default class PlayerIconScene extends Phaser.Scene {
  private playerIcons: Array<PlayerIcon>;

  private createPlayerIcons(): Array<PlayerIcon> {
    const icons: Array<PlayerIcon> = [];
    const players: Array<Player> = PlayerManager.getInstance().getPlayers();
    let bootX = 0;

    // For rendering purposes, we want to display all counters face up for local player
    const localPlayer: Player = PlayerManager.getInstance().getLocalPlayer();

    for (let i = 0; i < players.length; i++) {
      const icon: PlayerIcon = new PlayerIcon(
        this,
        this.cameras.main.width / 7,
        this.cameras.main.height / 4 + 70 * i,
        players[i].getBootColour()
      );
      const items: Array<ItemUnit> = players[i].getItems();
      for (let j = 0; j < items.length; j++) {
        if (items[j].getHidden() && players[i] !== localPlayer) {
          icon.addItem('unknown-counter');
        } else {
          icon.addItem(items[j].getName());
        }
      }
      icons.push(icon);
      if (players[i] !== localPlayer) {
        icon.addBootImg(
          (players[i].getCurrentLocation().getXposition() / 1600) *
            this.cameras.main.width +
            bootX,
          (players[i].getCurrentLocation().getYposition() / 750) *
            this.cameras.main.height,
          this.cameras.main.width * 0.04,
          this.cameras.main.height * 0.08
        );
      }
      bootX += 15;
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
import { Card } from './Card';
import LaunchInfo from './LaunchInfo';
import { Obstacle } from './Obstacle';
import { DisplayPlayer, GamePlayer } from './Player';
import Town from './Town';

export default class GameInstance {
  game: string;
  creator: string;
  savegame: string;
  players: GamePlayer[];
  towns: Town[];
  availableObstacles: Obstacle[];
  usedObstacles: Obstacle[];
  availableCards: Card[];
  usedCards: Card[];

  constructor(launchInfo: LaunchInfo) {
    this.game = launchInfo.gameServer;
    this.savegame = launchInfo.savegame;
    this.creator = launchInfo.creator;

    this.players = launchInfo.players.map((player) => new GamePlayer(player));

    this.createTowns();
  }

  private createTowns(): void {
    const colors = this.players.map((player) => player.color);
    const names: String[] = [
      'elvenhold',
      'feodor',
      'lapphalya',
      'rivinia',
      'ergeren',
      'beafa',
      'strykhaven',
      'virst',
      'jxara',
      'mahdavikia',
      'grangor',
      'kihrimah',
      'dagamura',
      'albaran',
      'parundia',
      'usselen',
      'wylhien',
      'jaccaranda',
      'throtmanni',
      'tichih',
      'yttar',
    ];

    names.map((name) => this.towns.push(new Town(name, colors)));
  }

  getPlayers(): DisplayPlayer[] {
    return this.players.map((player) => new DisplayPlayer(player));
  }
  getTowns(): Town[] {
    return this.towns;
  }
}

import { LaunchPlayer } from './LaunchInfo';

export class GamePlayer {
  name: string;
  color: string;
  score: number;
  currentTown: string;
  gold: number;

  constructor(launchPlayer: LaunchPlayer) {
    this.name = launchPlayer.name;
    this.color = launchPlayer.preferredColour;
    this.score = 0;
    this.currentTown = 'elvenhold';
    this.gold = 0;
  }
}

export class DisplayPlayer {
  name: string;
  color: string;
  score: number;
  currentTown: string;
  hiddenObstacle: number;

  constructor(gamePlayer: GamePlayer) {
    this.name = gamePlayer.name;
    this.color = gamePlayer.color;
    this.score = gamePlayer.score;
    this.currentTown = gamePlayer.currentTown;
  }
}

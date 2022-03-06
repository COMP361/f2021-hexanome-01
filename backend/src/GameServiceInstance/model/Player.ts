import Hand from './Hand';
import { LaunchPlayer } from './LaunchInfo';

export class GamePlayer {
  name: string;
  color: string;
  score: number;
  currentTown: string;
  hand: Hand;
  gold: number;
  constructor(launchPlayer: LaunchPlayer) {
    this.name = launchPlayer.name;
    this.color = launchPlayer.preferredColour;
    this.score = 0;
    this.currentTown = null;
    this.hand = new Hand();
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
    this.hiddenObstacle = gamePlayer.hand.hiddenObstacle.length;
  }
}

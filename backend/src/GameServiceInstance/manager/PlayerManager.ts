import { GamePhase } from '../GameInstance';
import { LaunchPlayer } from '../model/LaunchInfo';
import { DisplayPlayer, GamePlayer } from '../model/Player';

export default class PlayerManager {
  private currentPlayerIndex: number;
  private players: GamePlayer[] = [];
  private playerStatus: Map<GamePhase, GamePlayer[]> = new Map();

  constructor(launchPlayer: LaunchPlayer[]) {
    this.currentPlayerIndex = 0;
    this.players = launchPlayer.map((player) => new GamePlayer(player));
  }

  getPlayers(): DisplayPlayer[] {
    return this.players.map((player) => new DisplayPlayer(player));
  }

  getCurrentPlayer(): GamePlayer {
    return this.players[this.currentPlayerIndex];
  }

  setNewRoundPlayer(round: number): void {
    this.currentPlayerIndex = round;
  }

  private setNextPlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  setCurrentTown(playerIndex: number, town: string): void {
    this.players[playerIndex].currentTown = town;
  }

  addScore(playerIndex: number): void {
    this.players[playerIndex].score++;
  }

  addCoin(playerIndex: number, amount: number): void {
    this.players[playerIndex].gold += amount;
  }
}

import Player from '../classes/Player';
import Town from '../classes/Town';

export default class PlayerManager {
  private static instance: PlayerManager;
  private currentPlayerIndex: number;
  private players: Array<Player>;

  private constructor() {
    this.currentPlayerIndex = 0;
    this.players = [];
  }

  public static getInstance() {
    if (!PlayerManager.instance) {
      PlayerManager.instance = new PlayerManager();
    }
    return PlayerManager.instance;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public removePlayer(playerIndex: number): void {
    this.players.splice(playerIndex, 1);
  }

  public getPlayers(): Array<Player> {
    return this.players;
  }

  public resetAllPlayers(): void {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].resetPlayer();
    }
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  public setCurrentPlayerIndex(playerIndex: number): void {
    this.currentPlayerIndex = playerIndex;
  }

  public setNextPlayer(): void {
    if (this.currentPlayerIndex < this.players.length - 1) {
      this.currentPlayerIndex++;
    } else {
      this.currentPlayerIndex = 0;
    }
  }

  public addPoint(playerIndex: number): void {
    const tempPlayer: Player = this.players[playerIndex];
    const newScore = tempPlayer.getScore() + 1;
    tempPlayer.setScore(newScore);
  }

  public addCoins(playerIndex: number, coinAmount: number): void {
    const tempPlayer: Player = this.players[playerIndex];
    const newScore = tempPlayer.getScore() + coinAmount;
    tempPlayer.setScore(newScore);
  }

  public setCurrentTown(playerIndex: number, town: Town): void {
    const tempPlayer: Player = this.players[playerIndex];
    tempPlayer.setCurrentLocation(town);
  }

  public addVisitedTown(playerIndex: number, town: Town): void {
    const tempPlayer: Player = this.players[playerIndex];
    tempPlayer.addVisitedTown(town);
  }
}

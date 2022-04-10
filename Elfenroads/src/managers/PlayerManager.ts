import Edge from '../classes/Edge';
import Player from '../classes/Player';
import Town from '../classes/Town';

export default class PlayerManager {
  private static instance: PlayerManager;
  private currentPlayerIndex: number;
  private players: Array<Player>;
  private localPlayer!: Player;

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

  public getLocalPlayer(): Player {
    return this.localPlayer;
  }

  public setLocalPlayer(pPlayer: Player): void {
    this.localPlayer = pPlayer;
  }

  public setCurrentPlayerIndex(playerIndex: number): void {
    this.currentPlayerIndex = playerIndex;
  }

  public getCurrentPlayerIndex(): number {
    return this.currentPlayerIndex;
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

  public getWinner(): Player {
    let winner: Player = this.players[0];
    for (const player of this.players) {
      const winnerscore: number = winner.getActualScore();
      const playerscore: number = player.getActualScore();
      if (winnerscore < playerscore) {
        winner = player;
      } else if (winnerscore === playerscore) {
        if (winner.getCards().length < player.getCards().length) {
          winner = player;
        }
      }
    }
    return winner;
  }

  public setPlayerSecretTown(playerIndex: number, dest: Town): void {
    this.players[playerIndex].setSecretTown(dest);
  }

  public movePlayer(player: Player, edge: Edge): void {
    if (player !== this.getCurrentPlayer()) return;

    // Set newLocation depending on player's current town
    let newLocation: Town;
    if (edge.getDestTown() === player.getCurrentLocation()) {
      newLocation = edge.getSrcTown();
    } else {
      newLocation = edge.getDestTown();
    }

    // Update the currentPlayer's fields according to the newLocation
    this.players[this.currentPlayerIndex].setCurrentLocation(newLocation);
    this.addVisitedTown(this.currentPlayerIndex, newLocation);
    this.updatePlayerScore(player);
  }

  private updatePlayerScore(currentPlayer: Player): void {
    const score: number = currentPlayer.getVisitedTowns().length;

    // Subtract 1 because of starting town Elvenhold
    currentPlayer.setScore(score - 1);

    console.log(currentPlayer.getVisitedTowns());
  }

  public update(manager: any): void {
    this.setCurrentPlayerIndex(manager.currentPlayerIndex);
    this.players.forEach((player: Player) => {
      console.log(player);
      const updatedPlayerObject = manager.players.find(
        (newPlayer: any) => newPlayer.bootColour === player.getBootColour()
      );
      player.update(updatedPlayerObject);
    });
  }
}

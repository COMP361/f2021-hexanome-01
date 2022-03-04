import Player from './Player';

export default class Town {
  name: string;
  position: Array<integer>;
  townPieces: any;
  currentPlayers: Array<Player>;
  nextTowns: Array<Town>;
  townPieceHolder: any;

  constructor(name: any, position: Array<integer>) {
    this.name = name;
    this.position = position;
    this.townPieces = [];
    this.currentPlayers = [];
    this.nextTowns = [];
    this.townPieceHolder = [];
  }

  public setTownPieceHolder(holder: any): void {
    this.townPieceHolder = holder;
  }

  public setTownPieces(townPieces: any): void {
    this.townPieces = townPieces;
  }

  public setCurrentPlayers(players: Array<Player>): void {
    this.currentPlayers = players;
  }

  public setNextTowns(towns: Array<Town>): void {
    this.nextTowns = towns;
  }

  public addVisitingPlayer(pPlayer: Player): void {
    this.currentPlayers.push(pPlayer);
  }
}

export class Town {
  name: string;
  position: Array<number>;
  townPieces: any;
  currentPlayers: any;
  nextTowns: any;
  townPieceHolder: any;

  constructor(name: any, position: any) {
    this.name = name;
    this.position = position;
    this.townPieces = [];
    this.currentPlayers = [];
    this.nextTowns = [];
    this.townPieceHolder = [];
  }

  setTownPieceHolder(holder: any) {
    this.townPieceHolder = holder;
  }

  setTownPieces(townPieces: any) {
    this.townPieces = townPieces;
  }

  setCurrentPlayers(players: any) {
    this.currentPlayers = players;
  }

  setNextTowns(towns: any) {
    this.nextTowns = towns;
  }
}

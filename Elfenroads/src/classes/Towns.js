

export class Town {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.townPieces = [];
    this.currentPlayers = [];
    this.nextTowns = [];
    this.townPieceHolder = [];
  }

  setTownPieceHolder(holder) {
    this.townPieceHolder = holder;
  }

  setTownPieces(townPieces) {
    this.townPieces = townPieces;
  }

  setCurrentPlayers(players) {
    this.currentPlayers = players;
  }

  setNextTowns(towns) {
    this.nextTowns = towns;
  }
}

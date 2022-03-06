import Player from './Player';

export default class Town {
  private name: string;
  private position: Array<integer>;
  private townPieces: Array<Phaser.GameObjects.Arc>;
  private currentPlayers: Array<Player>;
  private nextTowns: Array<Town>;
  private townPieceHolder: Array<Phaser.GameObjects.Arc>;

  constructor(name: string, position: Array<integer>) {
    this.name = name;
    this.position = position;
    this.townPieces = [];
    this.currentPlayers = [];
    this.nextTowns = [];
    this.townPieceHolder = [];
  }

  public setTownPieceHolder(holder: Phaser.GameObjects.Arc): void {
    this.townPieceHolder.push(holder);
  }

  public setTownPieces(townPieces: Phaser.GameObjects.Arc): void {
    this.townPieces.push(townPieces);
  }

  public setCurrentPlayers(players: Array<Player>): void {
    this.currentPlayers = players;
  }

  public setNextTowns(towns: Array<Town>): void {
    this.nextTowns = towns;
  }

  public getTownPieceHolder(): Phaser.GameObjects.Arc {
    return this.townPieceHolder[0];
  }

  public getTownPieces(): Phaser.GameObjects.Arc {
    return this.townPieces[0];
  }

  public addVisitingPlayer(pPlayer: Player): void {
    this.currentPlayers.push(pPlayer);
  }

  public setPosition(position: Array<integer>): void {
    this.position = position;
  }

  public getPosition(): Array<integer> {
    return this.position;
  }

  public getXposition(): integer {
    return this.position[0];
  }

  public getYposition(): integer {
    return this.position[1];
  }

  public getName(): string {
    return this.name;
  }

  public townPieceHolderIsActive(): boolean {
    return this.townPieceHolder[0].active;
  }

  public alterTownPieceHolderVisibility(): void {
    const holder = this.townPieceHolder[0];
    holder.setVisible(!holder.visible);
  }

  public townPieceIsActive(): boolean {
    return this.townPieces[0].active;
  }

  public alterTownPieceVisibility(): void {
    const townPiece = this.townPieces[0];
    townPiece.setVisible(!townPiece.visible);
  }

  public destroyTownPiece(): void {
    this.townPieces[0].destroy();
  }
}

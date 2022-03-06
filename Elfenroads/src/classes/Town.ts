import Player from './Player';

export default class Town {
  private name: string;
  private position: Array<integer>;
  private currentPlayers: Array<Player>;
  private nextTowns: Array<Town>;

  constructor(name: string, position: Array<integer>) {
    this.name = name;
    this.position = position;
    this.currentPlayers = [];
    this.nextTowns = [];
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
}

import Player from './Player';

export default class Town {
  private name: string;
  private position: Array<integer>;
  private currentPlayers: Array<Player>;
  private nextTowns: Array<Town>;
  private static townStore: Map<string, Town> = new Map<string, Town>([
    ['elvenhold', new Town('elvenhold', [1050, 400])],
    ['feodor', new Town('feodor', [835, 370])],
    ['lapphalya', new Town('lapphalya', [840, 470])],
    ['rivinia', new Town('rivinia', [1005, 315])],
    ['ergeren', new Town('ergeren', [1190, 315])],
    ['beata', new Town('beata', [1200, 490])],
    ['strykhaven', new Town('strykhaven', [1090, 540])],
    ['virst', new Town('virst', [915, 570])],
    ['jxara', new Town('jxara', [655, 560])],
    ['mahdavikia', new Town('mahdavikia', [450, 555])],
    ['grangor', new Town('grangor', [415, 455])],
    ['kihromah', new Town('kihromah', [550, 410])],
    ['dagamura', new Town('dagamura', [680, 435])],
    ['albaran', new Town('albaran', [685, 335])],
    ['parundia', new Town('parundia', [555, 285])],
    ['usselen', new Town('usselen', [400, 225])],
    ['wylhien', new Town('wylhien', [560, 160])],
    ['jaccaranda', new Town('jaccaranda', [725, 185])],
    ['throtmanni', new Town('throtmanni', [890, 250])],
    ['tichih', new Town('tichih', [1060, 200])],
    ['yttar', new Town('yttar', [390, 330])],
    ['null', new Town()],
  ]);
  private isNullTown: boolean;

  private constructor(name?: string, position?: Array<integer>) {
    this.name = name ?? 'null';
    this.position = position ?? [-1, -1];
    this.currentPlayers = [];
    this.nextTowns = [];
    this.isNullTown = name ? false : true;
  }

  public static getTown(name: string): Town {
    if (this.townStore.has(name)) {
      return this.townStore.get(name)!;
    } else {
      return this.townStore.get('null')!;
    }
  }

  public isNull(): boolean {
    return this.isNullTown;
  }

  public static getAllTowns(): Map<string, Town> {
    return this.townStore;
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

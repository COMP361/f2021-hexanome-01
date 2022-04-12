import Player from './Player';

export default class Town {
  private name: string;
  private position: Array<integer>;
  private currentPlayers: Array<Player>;
  private nextTowns: Array<Town>;
  private goldValue: number;
  private static townStore: Map<string, Town> = new Map<string, Town>([
    ['elvenhold', new Town('elvenhold', [1050, 400], 0)],
    ['feodor', new Town('feodor', [835, 370], 4)],
    ['lapphalya', new Town('lapphalya', [840, 470], 2)],
    ['rivinia', new Town('rivinia', [1005, 315], 3)],
    ['ergeren', new Town('ergeren', [1190, 315], 5)],
    ['beata', new Town('beata', [1200, 490], 2)],
    ['strykhaven', new Town('strykhaven', [1090, 540], 4)],
    ['virst', new Town('virst', [915, 570], 3)],
    ['jxara', new Town('jxara', [655, 560], 3)],
    ['mahdavikia', new Town('mahdavikia', [450, 555], 5)],
    ['grangor', new Town('grangor', [415, 455], 5)],
    ['kihromah', new Town('kihromah', [550, 410], 6)],
    ['dagamura', new Town('dagamura', [680, 435], 4)],
    ['albaran', new Town('albaran', [685, 335], 7)],
    ['parundia', new Town('parundia', [555, 285], 4)],
    ['usselen', new Town('usselen', [400, 225], 4)],
    ['wylhien', new Town('wylhien', [560, 160], 3)],
    ['jaccaranda', new Town('jaccaranda', [725, 185], 5)],
    ['throtmanni', new Town('throtmanni', [890, 250], 3)],
    ['tichih', new Town('tichih', [1060, 200], 3)],
    ['yttar', new Town('yttar', [390, 330], 4)],
    ['null', new Town()],
  ]);
  private isNullTown: boolean;

  private constructor(
    name?: string,
    position?: Array<integer>,
    goldValue?: number
  ) {
    this.name = name ?? 'null';
    this.position = position ?? [-1, -1];
    this.currentPlayers = [];
    this.nextTowns = [];
    this.goldValue = goldValue ?? 0;
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

  public getGoldValue(): number {
    return this.goldValue;
  }

  public setGoldValue(gold: number): void {
    this.goldValue = gold;
  }
}

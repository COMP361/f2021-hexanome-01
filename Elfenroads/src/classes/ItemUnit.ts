import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {ObstacleType} from '../enums/ObstacleType';
import {SpellType} from '../enums/SpellType';
import Edge from './Edge';

const cardsNeededMap: any = {
  elfcycle: new Map([
    [EdgeType.Plain, 1],
    [EdgeType.Wood, 1],
    [EdgeType.Mountain, 2],
  ]),
  cloud: new Map([
    [EdgeType.Plain, 2],
    [EdgeType.Wood, 2],
    [EdgeType.Mountain, 1],
  ]),
  unicorn: new Map([
    [EdgeType.Wood, 1],
    [EdgeType.Desert, 2],
    [EdgeType.Mountain, 1],
  ]),
  'troll-wagon': new Map([
    [EdgeType.Plain, 1],
    [EdgeType.Wood, 2],
    [EdgeType.Desert, 2],
    [EdgeType.Mountain, 2],
  ]),
  dragon: new Map([
    [EdgeType.Plain, 1],
    [EdgeType.Wood, 2],
    [EdgeType.Desert, 1],
    [EdgeType.Mountain, 1],
  ]),
  pig: new Map([
    [EdgeType.Plain, 1],
    [EdgeType.Wood, 1],
  ]),
};

export abstract class ItemUnit {
  private name: string;
  private allowedEdges: Array<EdgeType>;
  private needsCounter: boolean;
  private isHidden: boolean;
  private type: string;

  constructor(
    name: string,
    allowedEdges: Array<EdgeType>,
    needsCounter: boolean,
    isHidden = false,
    type: string
  ) {
    this.name = name;
    this.allowedEdges = allowedEdges;
    this.needsCounter = needsCounter;
    this.isHidden = isHidden;
    this.type = type;
  }

  public getName(): string {
    return this.name;
  }

  public getAllowedEdges(): Array<EdgeType> {
    return this.allowedEdges;
  }

  public getNeedsCounter(): boolean {
    return this.needsCounter;
  }

  public getHidden(): boolean {
    return this.isHidden;
  }

  public setHidden(state: boolean): void {
    this.isHidden = state;
  }
}

export class Spell extends ItemUnit {
  constructor(
    spellType: SpellType,
    allowedEdges: Array<EdgeType>,
    isHidden = false
  ) {
    super(spellType, allowedEdges, true, isHidden, 'spell');
  }
}

export class Counter extends ItemUnit {
  private cardsNeeded: Map<EdgeType, number>;
  constructor(
    counterType: CounterType,
    allowedEdges: Array<EdgeType>,
    cardsNeeded: any,
    isHidden = false
  ) {
    super(counterType, allowedEdges, false, isHidden, 'counter');
    this.cardsNeeded = cardsNeededMap[this.getName()];
  }

  public getCardsNeeded(): Map<EdgeType, number> {
    return this.cardsNeeded;
  }
}

export class GoldPiece extends ItemUnit {
  constructor(allowedEdges: Array<EdgeType>, isHidden = false) {
    super('gold-piece', allowedEdges, true, isHidden, 'gold-piece');
  }
}

export class Obstacle extends ItemUnit {
  constructor(
    obstacleType: ObstacleType,
    allowedEdges: Array<EdgeType>,
    needsCounter: boolean,
    isHidden = false
  ) {
    super(obstacleType, allowedEdges, needsCounter, isHidden, 'obstacle');
  }
}

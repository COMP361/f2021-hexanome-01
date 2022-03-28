import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {ObstacleType} from '../enums/ObstacleType';
import {SpellType} from '../enums/SpellType';

export abstract class ItemUnit {
  private name: string;
  private allowedEdges: Array<EdgeType>;
  private needsCounter: boolean;
  private isHidden: boolean;

  constructor(
    name: string,
    allowedEdges: Array<EdgeType>,
    needsCounter: boolean,
    isHidden = false
  ) {
    this.name = name;
    this.allowedEdges = allowedEdges;
    this.needsCounter = needsCounter;
    this.isHidden = isHidden;
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
    super(spellType, allowedEdges, true, isHidden);
  }
}

export class Counter extends ItemUnit {
  private cardsNeeded: Map<EdgeType, number>;
  constructor(
    counterType: CounterType,
    allowedEdges: Array<EdgeType>,
    cardsNeeded: Map<EdgeType, number>,
    isHidden = false
  ) {
    super(counterType, allowedEdges, false, isHidden);
    this.cardsNeeded = cardsNeeded;
  }

  public getCardsNeeded(): Map<EdgeType, number> {
    return this.cardsNeeded;
  }
}

export class GoldPiece extends ItemUnit {
  constructor(allowedEdges: Array<EdgeType>, isHidden = false) {
    super('gold-piece', allowedEdges, true, isHidden);
  }
}

export class Obstacle extends ItemUnit {
  constructor(
    obstacleType: ObstacleType,
    allowedEdges: Array<EdgeType>,
    needsCounter: boolean,
    isHidden = false
  ) {
    super(obstacleType, allowedEdges, needsCounter, isHidden);
  }
}

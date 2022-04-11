import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {ObstacleType} from '../enums/ObstacleType';
import {SpellType} from '../enums/SpellType';
import Edge from './Edge';

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
    if (cardsNeeded instanceof Map) {
      this.cardsNeeded = cardsNeeded;
    } else {
      this.cardsNeeded = new Map(
        Object.entries(cardsNeeded).map(entry => {
          return [
            entry[0] === 'Plain' || entry[0] === '0'
              ? EdgeType.Plain
              : entry[0] === 'Wood' || entry[0] === '1'
              ? EdgeType.Wood
              : entry[0] === 'Desert' || entry[0] === '2'
              ? EdgeType.Desert
              : entry[0] === 'Mountain' || entry[0] === '3'
              ? EdgeType.Mountain
              : entry[0] === 'River' || entry[0] === '4'
              ? EdgeType.River
              : EdgeType.Lake,
            Number(entry[1]),
          ];
        })
      );
    }
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

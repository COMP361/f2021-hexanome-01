import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {ObstacleType} from '../enums/ObstacleType';
import {SpellType} from '../enums/SpellType';

export abstract class ItemUnit {
  name: string;
  allowedEdges: Array<EdgeType>;
  isHidden: boolean;

  constructor(name: string, allowedEdges: Array<EdgeType>, isHidden = false) {
    this.name = name;
    this.allowedEdges = allowedEdges;
    this.isHidden = isHidden;
  }

  public getCopy(): ItemUnit {
    return JSON.parse(JSON.stringify(this));
  }
}

export class Spell extends ItemUnit {
  spellType: SpellType;

  constructor(
    spellType: SpellType,
    allowedEdges: Array<EdgeType>,
    isHidden = false
  ) {
    super(spellType, allowedEdges, isHidden);
    this.spellType = spellType;
  }
}

export class Counter extends ItemUnit {
  counterType: CounterType;

  constructor(
    counterType: CounterType,
    allowedEdges: Array<EdgeType>,
    isHidden = false
  ) {
    super(counterType, allowedEdges, isHidden);
    this.counterType = counterType;
  }
}

export class GoldPiece extends ItemUnit {
  amount: number;

  constructor(amount: number, allowedEdges: Array<EdgeType>, isHidden = false) {
    super('gold-piece', allowedEdges, isHidden);
    this.amount = amount;
  }
}

export class Obstacle extends ItemUnit {
  obstacleType: ObstacleType;

  constructor(
    obstacleType: ObstacleType,
    allowedEdges: Array<EdgeType>,
    isHidden = false
  ) {
    super(obstacleType, allowedEdges, isHidden);
    this.obstacleType = obstacleType;
  }
}

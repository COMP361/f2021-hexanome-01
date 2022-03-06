import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {ObstacleType} from '../enums/ObstacleType';
import {SpellType} from '../enums/SpellType';

export abstract class ItemUnit {
  name: string;
  allowedEdges: Array<EdgeType>;

  constructor(name: string, allowedEdges: Array<EdgeType>) {
    this.name = name;
    this.allowedEdges = allowedEdges;
  }
}

export class Spell extends ItemUnit {
  spellType: SpellType;

  constructor(spellType: SpellType, allowedEdges: Array<EdgeType>) {
    super(spellType, allowedEdges);
    this.spellType = spellType;
  }
}

export class Counter extends ItemUnit {
  counterType: CounterType;

  constructor(
    counterType: CounterType,
    allowedEdges: Array<EdgeType>,
    name: string
  ) {
    super(name, allowedEdges);
    this.counterType = counterType;
  }

  public getCounterPNG(): string {
    return this.name;
  }
}

export class GoldPiece extends ItemUnit {
  amount: number;

  constructor(amount: number, allowedEdges: Array<EdgeType>) {
    super('gold-piece', allowedEdges);
    this.amount = amount;
  }
}

export class Obstacle extends ItemUnit {
  obstacleType: ObstacleType;

  constructor(obstacleType: ObstacleType, allowedEdges: Array<EdgeType>) {
    super(obstacleType, allowedEdges);
    this.obstacleType = obstacleType;
  }
}

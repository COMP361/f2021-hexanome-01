import {EdgeType} from './Edge';

export enum SpellType {
  Double = 'double',
  Exchange = 'exchange',
}

export enum CounterType {
  GiantPig = 'pig-counter',
  ElfCycle = 'elfcycle-counter',
  MagicCloud = 'cloud-counter',
  Unicorn = 'unicorn-counter',
  TrollWagon = 'troll-wagon-counter',
  Dragon = 'dragon-counter',
}

export enum ObstacleType {
  SeaMonster = 'sea-monster',
  Tree = 'tree',
}

export class ItemUnit {
  allowedEdges: Array<EdgeType>;

  constructor(allowedEdges: Array<EdgeType>) {
    this.allowedEdges = allowedEdges;
  }
}

export class Spell extends ItemUnit {
  spellType: SpellType;

  constructor(spellType: SpellType, allowedEdges: Array<EdgeType>) {
    super(allowedEdges);
    this.spellType = spellType;
  }
}

export class Counter extends ItemUnit {
  counterType: CounterType;

  constructor(counterType: CounterType, allowedEdges: Array<EdgeType>) {
    super(allowedEdges);
    this.counterType = counterType;
  }
}

export class GoldPiece extends ItemUnit {
  amount: number;

  constructor(amount: number, allowedEdges: Array<EdgeType>) {
    super(allowedEdges);
    this.amount = amount;
  }
}

export class Obstacle extends ItemUnit {
  obstacleType: ObstacleType;

  constructor(obstacleType: ObstacleType, allowedEdges: Array<EdgeType>) {
    super(allowedEdges);
    this.obstacleType = obstacleType;
  }
}

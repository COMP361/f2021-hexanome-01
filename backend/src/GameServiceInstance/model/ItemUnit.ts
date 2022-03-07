export enum SpellType {
  DOUBLE = 'Double',
  EXCHANGE = 'Exchance',
}

export enum CounterType {
  GIANTPIG = 'Giant pig',
  ELFCYCLE = 'Elfcycle',
  MAGICCLOUD = 'Magic cloud',
  UNICORN = 'Unicorn',
  TROLLWAGON = 'Troll wagon',
  DRAGON = 'Dragon',
}

export enum ObstacleType {
  SEAMONSTER = 'Sea Monster',
  TREE = 'Tree',
}

export interface ItemUnit {
  getType(): SpellType | CounterType | ObstacleType;
}

export class SpellItem implements ItemUnit {
  spellType: SpellType;

  constructor(spellType: SpellType) {
    this.spellType = spellType;
  }

  getType(): SpellType {
    return this.spellType;
  }
}

export class Counter implements ItemUnit {
  counterType: CounterType;

  constructor(counterType: CounterType) {
    this.counterType = counterType;
  }

  getType(): CounterType {
    return this.counterType;
  }
}

export class Obstacle implements ItemUnit {
  obstacleType: ObstacleType;

  constructor(obstacleType: ObstacleType) {
    this.obstacleType = obstacleType;
  }

  getType(): ObstacleType {
    return this.obstacleType;
  }
}

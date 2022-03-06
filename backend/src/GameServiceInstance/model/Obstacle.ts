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

export class Obstacle {
  obstacleType: SpellType | CounterType | ObstacleType;

  constructor(type: SpellType | CounterType | ObstacleType) {
    this.obstacleType = type;
  }
}

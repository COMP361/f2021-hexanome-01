export enum TravelCardType {
  GIANTPIG = 'Giant pig',
  ELFCYCLE = 'Elfcycle',
  MAGICCLOUD = 'Magic cloud',
  UNICORN = 'Unicorn',
  TROLLWAGON = 'Troll wagon',
  DRAGON = 'Dragon',
  RAFT = 'Raft',
}

export class TravelCard {
  cardType: TravelCardType;

  constructor(type: TravelCardType) {
    this.cardType = type;
  }
}

export class TownCard {
  town: String;
  constructor(town: String) {
    this.town = town;
  }
}

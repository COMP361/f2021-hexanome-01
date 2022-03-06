export enum TravelCardType {
  GIANTPIG = 'Giant pig',
  ELFCYCLE = 'Elfcycle',
  MAGICCLOUD = 'Magic cloud',
  UNICORN = 'Unicorn',
  TROLLWAGON = 'Troll wagon',
  DRAGON = 'Dragon',
  RAFTS = 'Rafts',
}

export class Card {
  cardType: TravelCardType;

  constructor(type: TravelCardType) {
    this.cardType = type;
  }
}

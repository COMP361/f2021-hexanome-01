import {SpellType} from '../enums/SpellType';
import {TravelCardType} from '../enums/TravelCardType';
import Town from './Town';

export abstract class CardUnit {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class MagicSpellCard extends CardUnit {
  spellType: SpellType;

  constructor(spellType: SpellType) {
    super(spellType);
    this.spellType = spellType;
  }
}

export class TravelCard extends CardUnit {
  travelType: TravelCardType;

  constructor(travelType: TravelCardType) {
    super(travelType);
    this.travelType = travelType;
  }
}

export class GoldCard extends CardUnit {
  amount: number;

  constructor(amount: number) {
    super('gold-card');
    this.amount = amount;
  }
}

export class TownCard extends CardUnit {
  town: Town;

  constructor(town: Town) {
    super(town.name);
    this.town = town;
  }
}

import {SpellType} from '../enums/SpellType';
import {TravelCardType} from '../enums/TravelCardType';
import Town from './Town';

export abstract class CardUnit {}

export class MagicSpellCard extends CardUnit {
  spellType: SpellType;

  constructor(spellType: SpellType) {
    super();
    this.spellType = spellType;
  }
}

export class TravelCard extends CardUnit {
  travelType: TravelCardType;

  constructor(travelType: TravelCardType) {
    super();
    this.travelType = travelType;
  }
}

export class GoldCard extends CardUnit {
  amount: number;

  constructor(amount: number) {
    super();
    this.amount = amount;
  }
}

export class TownCard extends CardUnit {
  town: Town;

  constructor(town: Town) {
    super();
    this.town = town;
  }
}

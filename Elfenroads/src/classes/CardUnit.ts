import {SpellType} from '../enums/SpellType';
import {TravelCardType} from '../enums/TravelCardType';
import Town from './Town';

export abstract class CardUnit {
  private name: string;
  private type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  public getName(): string {
    return this.name;
  }
}

export class MagicSpellCard extends CardUnit {
  constructor(spellType: SpellType) {
    super(spellType, 'magic-spell-card');
  }
}

export class TravelCard extends CardUnit {
  constructor(travelType: TravelCardType) {
    super(travelType, 'travel-card');
  }
}

export class GoldCard extends CardUnit {
  private amount: number;

  constructor(amount: number) {
    super('gold-card', 'gold-card');
    this.amount = amount;
  }

  public getAmount(): number {
    return this.amount;
  }
}

export class TownCard extends CardUnit {
  constructor(town: any) {
    super(town.getName ? town.getName()! : town, 'town-card');
  }
}

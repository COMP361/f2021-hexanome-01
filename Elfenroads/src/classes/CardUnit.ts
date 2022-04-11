import {SpellType} from '../enums/SpellType';
import {TravelCardType} from '../enums/TravelCardType';
import Town from './Town';

export abstract class CardUnit {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

export class MagicSpellCard extends CardUnit {
  constructor(spellType: SpellType) {
    super(spellType);
  }
}

export class TravelCard extends CardUnit {
  constructor(travelType: TravelCardType) {
    super(travelType);
  }
}

export class GoldCard extends CardUnit {
  private amount: number;

  constructor(amount: number) {
    super('gold-card');
    this.amount = amount;
  }

  public getAmount(): number {
    return this.amount;
  }
}

export class TownCard extends CardUnit {
  constructor(town: Town) {
    super(town.getName()!);
  }
}

import {CardUnit, MagicSpellCard, TravelCard} from '../classes/CardUnit';
import {TravelCardType} from '../enums/TravelCardType';

export class CardManager {
  private static cardManagerInstance: CardManager;
  private cardPile: Array<CardUnit>;

  private constructor() {
    // the pile only has travel cards for now
    this.cardPile = [
      new TravelCard(TravelCardType.Dragon),
      new TravelCard(TravelCardType.GiantPig),
      new TravelCard(TravelCardType.ElfCycle),
      new TravelCard(TravelCardType.MagicCloud),
      new TravelCard(TravelCardType.Uicorn),
      new TravelCard(TravelCardType.TrollWagon),
      new TravelCard(TravelCardType.Raft),
    ];
  }

  public static getInstance(): CardManager {
    if (!CardManager.cardManagerInstance) {
      CardManager.cardManagerInstance = new CardManager();
    }
    return CardManager.cardManagerInstance;
  }

  public getCardPile(): Array<CardUnit> {
    return this.cardPile;
  }

  public getRandomCard(): CardUnit {
    return this.cardPile[Math.floor(Math.random() * this.cardPile.length)];
  }
}

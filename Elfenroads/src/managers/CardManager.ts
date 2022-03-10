import {CardUnit, TravelCard} from '../classes/CardUnit';
import {TravelCardType} from '../enums/TravelCardType';

export class CardManager {
  private static cardManagerInstance: CardManager;
  private cardPile: Array<CardUnit>;
  private selected: Array<string>;

  private constructor() {
    // the pile contains elfenroads cards
    this.cardPile = [];
    for (let i = 0; i < 12; i++) {
      if (i < 10) {
        this.cardPile.push(new TravelCard(TravelCardType.Dragon));
        this.cardPile.push(new TravelCard(TravelCardType.GiantPig));
        this.cardPile.push(new TravelCard(TravelCardType.ElfCycle));
        this.cardPile.push(new TravelCard(TravelCardType.MagicCloud));
        this.cardPile.push(new TravelCard(TravelCardType.Uicorn));
        this.cardPile.push(new TravelCard(TravelCardType.TrollWagon));
      }
      new TravelCard(TravelCardType.Raft);
    }
    this.selected = [];
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
    const index = Math.floor(Math.random() * this.cardPile.length);
    const card = this.cardPile[index];
    this.cardPile.splice(index, 1);
    return card;
  }

  public addSelectedCard(name: string): void {
    this.selected.push(name);
    console.log(this.selected);
  }
}

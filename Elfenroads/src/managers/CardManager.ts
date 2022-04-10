import {CardUnit, GoldCard, TravelCard} from '../classes/CardUnit';
import Edge from '../classes/Edge';
import {Counter, Obstacle} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {EdgeType} from '../enums/EdgeType';
import {GameVariant} from '../enums/GameVariant';
import {TravelCardType} from '../enums/TravelCardType';
import GameManager from './GameManager';

export class CardManager {
  private static cardManagerInstance: CardManager;
  private cardPile: Array<CardUnit>;
  private faceUpPile: Array<CardUnit>;
  private goldCardPile: Array<GoldCard>;

  private constructor() {
    this.cardPile = [];
    this.faceUpPile = [];
    this.goldCardPile = [];
  }

  public static getInstance(): CardManager {
    if (!CardManager.cardManagerInstance) {
      CardManager.cardManagerInstance = new CardManager();
    }
    return CardManager.cardManagerInstance;
  }

  public initializePile(): void {
    const gameVariant = GameManager.getInstance().getGameVariant();
    for (let i = 0; i < 12; i++) {
      if (
        gameVariant === GameVariant.elfenland ||
        (gameVariant === GameVariant.elfengold && i < 9)
      ) {
        if (i < 10) {
          this.cardPile.push(new TravelCard(TravelCardType.Dragon));
          this.cardPile.push(new TravelCard(TravelCardType.GiantPig));
          this.cardPile.push(new TravelCard(TravelCardType.ElfCycle));
          this.cardPile.push(new TravelCard(TravelCardType.MagicCloud));
          this.cardPile.push(new TravelCard(TravelCardType.Uicorn));
          this.cardPile.push(new TravelCard(TravelCardType.TrollWagon));
        }
        this.cardPile.push(new TravelCard(TravelCardType.Raft));
      }
    }
  }

  public getCardPile(): Array<CardUnit> {
    return this.cardPile;
  }

  public getRandomCard(): CardUnit {
    const index = Math.floor(Math.random() * this.cardPile.length);
    const card = this.cardPile[index];
    this.cardPile.splice(index, 1);
    // gold card should go directly to the gold card pile and not player's deck
    if (card instanceof GoldCard) {
      this.goldCardPile.push(card);
    }
    return card;
  }

  public getSelectedCard(
    currPlayer: Player,
    name: string
  ): CardUnit | undefined {
    for (const card of currPlayer.getCards()) {
      if (card.getName() === name) {
        return card;
      }
    }
    return;
  }

  public getFaceUpPile(): Array<CardUnit> {
    return this.faceUpPile;
  }

  public getGoldCardPile(): Array<GoldCard> {
    return this.goldCardPile;
  }

  public claimGoldCardPile(player: Player): void {
    let totalGold = 0;
    this.goldCardPile.forEach(card => {
      totalGold += card.getAmount();
    });
    const newBalance = player.getGold() + totalGold;
    player.setGold(newBalance);
  }

  public addToPile(player: Player, card: CardUnit): void {
    player.removeCard(card);
    this.cardPile.push(card);
  }

  // this must be called 3 times after 3 cards are distributed to every player
  // also called every time a player picked a card or picked a gold card.
  public flipCard(): void {
    const randomCard = this.getRandomCard();
    if (!(randomCard instanceof GoldCard)) {
      this.faceUpPile.push(randomCard);
    }
  }

  // must call this function after flipping 3 cards
  public addGoldCardsToPile(): void {
    for (let i = 0; i < 7; i++) {
      this.cardPile.push(new GoldCard(3));
    }
  }

  public isValidSelection(
    player: Player,
    cards: Array<CardUnit>,
    edge: Edge
  ): boolean {
    // only for Elfenland
    const edgeType = edge.getType();
    // travel on river
    if (edgeType === EdgeType.River) {
      // check if all cards are raft card
      for (const card of cards) {
        // return false if a card is not raft card
        if (card.getName() !== TravelCardType.Raft) {
          return false;
        }
      }
      // 1 raft if traveling with current
      if (player.getCurrentLocation() === edge.getSrcTown()) {
        // only need 1 raft
        if (cards.length !== 1) {
          return false;
        }
      }
      // against current
      else if (cards.length !== 2) {
        return false;
      }
    }
    // travel on lake
    else if (edgeType === EdgeType.Lake) {
      // check if all cards are raft card
      for (const card of cards) {
        // return false if a card is not raft card
        if (card.getName() !== TravelCardType.Raft) {
          return false;
        }
      }
      if (cards.length !== 2) {
        return false;
      }
    }
    // travel on land
    else {
      const edgeItems = edge.getItems();
      let travelcounter: Counter | undefined = undefined;
      let obstacle: Obstacle | undefined = undefined;
      for (const item of edgeItems) {
        if (item instanceof Counter) {
          travelcounter = <Counter>item;
        }
        if (item instanceof Obstacle) {
          obstacle = <Obstacle>item;
        }
      }
      if (travelcounter === undefined) return false;

      // check if it is the case of caravan
      let isCaravan = false;
      for (const card of cards) {
        // check if the card type correspond to the counter type
        if (!card.getName().includes(travelcounter.getName())) {
          isCaravan = true;
        }
      }

      if (isCaravan) {
        if (obstacle === undefined) {
          if (cards.length < 3) return false;
        } else {
          if (cards.length < 4) return false;
        }
      } else {
        let numCardsRequired = travelcounter.getCardsNeeded().get(edgeType);
        if (numCardsRequired === undefined) return false;
        if (obstacle !== undefined) {
          numCardsRequired += 1;
        }
        if (cards.length < numCardsRequired) return false;
      }
    }
    return true;
  }
}

import {CardUnit, TravelCard} from '../classes/CardUnit';
import Edge from '../classes/Edge';
import {Counter, Obstacle} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {EdgeType} from '../enums/EdgeType';
import {TravelCardType} from '../enums/TravelCardType';
import PlayerManager from './PlayerManager';

export class CardManager {
  private static cardManagerInstance: CardManager;
  private cardPile: Array<CardUnit>;

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

  public addToPile(player: Player, card: CardUnit): void {
    player.removeCard(card);
    this.cardPile.push(card);
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
        if (obstacle === undefined) {
          numCardsRequired += 1;
        }
        if (cards.length < numCardsRequired) return false;
      }
    }
    return true;
  }
}

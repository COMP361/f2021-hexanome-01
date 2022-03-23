import {CardUnit, TravelCard} from '../classes/CardUnit';
import Edge from '../classes/Edge';
import {Counter} from '../classes/ItemUnit';
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

  public playCards(
    player: Player,
    cards: Array<CardUnit>,
    edge: Edge
  ): boolean {
    const edgeType = edge.getType();
    let isLegal = true;
    if (edgeType === EdgeType.River) {
      cards.forEach(card => {
        if (card.getName() !== TravelCardType.Raft) {
          // not the right card
          isLegal = false;
        }
      });
      // 1 raft if traveling with current
      if (player.getCurrentLocation() === edge.getSrcTown()) {
        // only need 1 raft
        if (cards.length !== 1) {
          isLegal = false;
        }
      }
      // against current
      else if (cards.length !== 2) {
        isLegal = false;
      }
    } else if (edgeType === EdgeType.Lake) {
      cards.forEach(card => {
        if (card.getName() !== TravelCardType.Raft) {
          // not the right card
          isLegal = false;
        }
      });
      if (cards.length !== 2) {
        isLegal = false;
      }
    }
    // we have counters since we are on land
    else {
      const edgeItems = edge.getItems();
      edgeItems.forEach(item => {
        // need to change this later for elfengold
        if (item instanceof Counter) {
          // caravan
          if (
            (cards.length === 3 && edgeItems.length !== 1) ||
            (cards.length === 4 && edgeItems.length !== 2)
          ) {
            isLegal = false;
          } else {
            console.log(item);
            const map = item.getCardsNeeded();
            console.log(map);
            const numOfCards = map.get(edgeType);
            cards.forEach(card => {
              // ex. pig-card includes pig
              if (!card.getName().includes(item.getName())) {
                // not the right card
                isLegal = false;
              }
            });
            if (
              (edgeItems.length === 1 && cards.length !== numOfCards) ||
              (numOfCards &&
                edgeItems.length === 2 &&
                cards.length !== numOfCards + 1)
            ) {
              isLegal = false;
            }
          }
        }
      });
    }
    // the cards were legal
    if (isLegal) {
      cards.forEach(card => {
        // put cards back to pile
        this.addToPile(player, card);
      });
      // set player to new town
      PlayerManager.getInstance().movePlayer(player, edge);
    }
    return isLegal;
  }
}

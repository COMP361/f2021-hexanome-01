import {
  CardUnit,
  GoldCard,
  MagicSpellCard,
  TownCard,
  TravelCard,
} from '../classes/CardUnit';
import Edge from '../classes/Edge';
import {Counter, Obstacle, Spell} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {EdgeType} from '../enums/EdgeType';
import {GameVariant, SubVariant} from '../enums/GameVariant';
import {ObstacleType} from '../enums/ObstacleType';
import {SpellType} from '../enums/SpellType';
import {TravelCardType} from '../enums/TravelCardType';
import GameManager from './GameManager';

export class CardManager {
  private static cardManagerInstance: CardManager;
  private cardPile: Array<CardUnit>;
  private faceUpPile: Array<CardUnit>;
  private goldCardPile: Array<GoldCard>;
  private amountDrawn: number;

  private constructor() {
    this.cardPile = [];
    this.faceUpPile = [];
    this.goldCardPile = [];
    this.amountDrawn = 0;
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
    if (GameManager.getInstance().getSubVariant() === SubVariant.witch) {
      for (let i = 0; i < 6; i++) {
        this.cardPile.push(new MagicSpellCard(SpellType.Witch));
      }
    }
  }

  public getAmountDrawn(): number {
    return this.amountDrawn;
  }

  public setAmountDrawn(amountDrawn: number): void {
    this.amountDrawn = amountDrawn;
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

  public claimFaceUpCard(player: Player, index: number): void {
    const faceUpCard = this.faceUpPile[index];
    player.addCard(faceUpCard);

    let newCard = this.getRandomCard();
    while (newCard instanceof GoldCard) {
      newCard = this.getRandomCard();
    }

    this.faceUpPile[index] = newCard;
    this.amountDrawn++;
  }

  public claimGoldCardPile(player: Player): void {
    let totalGold = 0;
    this.goldCardPile.forEach(card => {
      totalGold += card.getAmount();
    });
    const newBalance = player.getGold() + totalGold;
    player.setGold(newBalance);
    this.goldCardPile = [];
    this.amountDrawn++;
  }

  public claimFaceDownCard(player: Player): void {
    const randomCard = this.getRandomCard();
    if (!(randomCard instanceof GoldCard)) {
      player.addCard(randomCard);
      this.amountDrawn++;
    }
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
    } else {
      this.flipCard();
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
    const isElfengold: boolean =
      GameManager.getInstance().getGameVariant() === GameVariant.elfengold;
    let hasWitchCard = false;
    for (const card of cards) {
      // check if a witch card is selected
      if (card.getName() === TravelCardType.Witch) {
        hasWitchCard = true;
        cards.splice(cards.indexOf(card), 1);
      }
    }
    // check if it is a normal move boot
    if (
      edge.getDestTown() !== player.getCurrentLocation() &&
      edge.getSrcTown() !== player.getCurrentLocation()
    )
      return false;
    const edgeType = edge.getType();
    // travel on river
    if (edgeType === EdgeType.River) {
      let numcards = cards.length;
      if (isElfengold) {
        // check if all cards are raft card or witch card
        for (const card of cards) {
          // return false if a card is not raft card and not a witch card
          if (
            card.getName() !== TravelCardType.Raft &&
            card.getName() !== TravelCardType.Witch
          ) {
            return false;
          }
        }
        const edgeItems = edge.getItems();
        let obstacle: Obstacle | undefined = undefined;
        for (const item of edgeItems) {
          if (
            item instanceof Obstacle &&
            item.getName() === ObstacleType.SeaMonster
          ) {
            obstacle = <Obstacle>item;
          }
        }
        if (obstacle !== undefined) {
          if (hasWitchCard) {
            if (player.hasEnoughCoins(1)) {
              // 1 raft if traveling with current
              if (player.getCurrentLocation() === edge.getSrcTown()) {
                // only need 1 raft
                if (numcards !== 1) {
                  return false;
                }
              }
              // against current
              else if (numcards !== 2) {
                return false;
              }
              player.deductCoins(1);
              return true;
            } else {
              return false;
            }
          } else {
            numcards--;
          }
        }
      } else {
        // check if all cards are raft card
        for (const card of cards) {
          // return false if a card is not raft card
          if (card.getName() !== TravelCardType.Raft) {
            return false;
          }
        }
      }

      // 1 raft if traveling with current
      if (player.getCurrentLocation() === edge.getSrcTown()) {
        // only need 1 raft
        if (numcards !== 1) {
          return false;
        }
      }
      // against current
      else if (numcards !== 2) {
        return false;
      }
    }
    // travel on lake
    else if (edgeType === EdgeType.Lake) {
      let numcards = cards.length;
      if (isElfengold) {
        // check if all cards are raft card or witch card
        for (const card of cards) {
          // return false if a card is not raft card and not a witch card
          if (
            card.getName() !== TravelCardType.Raft &&
            card.getName() !== TravelCardType.Witch
          ) {
            return false;
          }
        }
        const edgeItems = edge.getItems();
        let obstacle: Obstacle | undefined = undefined;
        for (const item of edgeItems) {
          if (
            item instanceof Obstacle &&
            item.getName() === ObstacleType.SeaMonster
          ) {
            obstacle = <Obstacle>item;
          }
        }
        if (obstacle !== undefined) {
          if (hasWitchCard) {
            if (player.hasEnoughCoins(1)) {
              if (numcards !== 2) {
                return false;
              }
              player.deductCoins(1);
              return true;
            } else {
              return false;
            }
          } else {
            numcards--;
          }
        }
      } else {
        // check if all cards are raft card
        for (const card of cards) {
          // return false if a card is not raft card
          if (card.getName() !== TravelCardType.Raft) {
            return false;
          }
        }
      }
      if (numcards !== 2) {
        return false;
      }
    }
    // travel on land
    else {
      // if the game version is Elfengold,
      // we need to check if double spell is used and apply different set of logic
      // otherwise we just use the same logic as Elfenland
      // assuming witch card can be use in caravan to go pass obstacle
      if (isElfengold) {
        let hasDoubleSpell = false;
        const edgeItems = edge.getItems();
        for (const item of edgeItems) {
          if (item instanceof Spell) {
            hasDoubleSpell = item.getName() === SpellType.Double;
          }
        }
        if (hasDoubleSpell) {
          let travelcounter1: Counter | undefined = undefined;
          let travelcounter2: Counter | undefined = undefined;
          let obstacle: Obstacle | undefined = undefined;
          for (const item of edgeItems) {
            if (item instanceof Counter) {
              if (travelcounter1 === undefined) {
                travelcounter1 = <Counter>item;
              } else {
                travelcounter2 = <Counter>item;
              }
            }
            if (item instanceof Obstacle) {
              obstacle = <Obstacle>item;
            }
          }
          if (travelcounter1 === undefined || travelcounter2 === undefined)
            return false;
          // check if it is the case of caravan
          let isCaravan = false;
          for (const card of cards) {
            // check if the card type correspond to the counter type
            if (
              !card.getName().includes(travelcounter1.getName()) &&
              !card.getName().includes(travelcounter2.getName())
            ) {
              isCaravan = true;
            }
          }

          if (isCaravan) {
            if (obstacle === undefined) {
              if (cards.length !== 3) return false;
            } else {
              if (hasWitchCard) {
                if (player.hasEnoughCoins(1)) {
                  if (cards.length !== 3) return false;
                  player.deductCoins(1);
                  return true;
                } else {
                  return false;
                }
              } else {
                if (cards.length !== 4) return false;
              }
            }
          } else {
            let numCardsRequired1 = travelcounter1
              .getCardsNeeded()
              .get(edgeType);
            let numCardsRequired2 = travelcounter1
              .getCardsNeeded()
              .get(edgeType);
            if (numCardsRequired1 === undefined) return false;
            if (numCardsRequired2 === undefined) return false;
            if (obstacle !== undefined) {
              if (hasWitchCard) {
                if (player.hasEnoughCoins(1)) {
                  for (const card of cards) {
                    // check if the card type correspond to the counter type
                    if (card.getName().includes(travelcounter1.getName())) {
                      numCardsRequired1 -= 1;
                    } else if (
                      card.getName().includes(travelcounter2.getName())
                    ) {
                      numCardsRequired2 -= 1;
                    }
                  }
                  if (numCardsRequired1 !== 0 && numCardsRequired2 !== 0) {
                    return false;
                  } else if (
                    numCardsRequired1 === 0 &&
                    numCardsRequired2 === 0
                  ) {
                    return false;
                  }
                  player.deductCoins(1);
                  return true;
                } else {
                  return false;
                }
              } else {
                numCardsRequired1 += 1;
                numCardsRequired2 += 1;
              }
            }
            for (const card of cards) {
              // check if the card type correspond to the counter type
              if (card.getName().includes(travelcounter1.getName())) {
                numCardsRequired1 -= 1;
              } else if (card.getName().includes(travelcounter2.getName())) {
                numCardsRequired2 -= 1;
              }
            }
            if (numCardsRequired1 !== 0 && numCardsRequired2 !== 0) {
              return false;
            }
          }
          return true;
        }
      }
      // for Elfenland
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
      console.log(travelcounter);
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
          if (cards.length !== 3) return false;
        } else {
          if (isElfengold && hasWitchCard) {
            if (player.hasEnoughCoins(1)) {
              if (cards.length !== 3) return false;
              player.deductCoins(1);
              return true;
            } else {
              return false;
            }
          } else {
            if (cards.length !== 4) return false;
          }
        }
      } else {
        let numCardsRequired = travelcounter.getCardsNeeded().get(edgeType);
        console.log(numCardsRequired);
        if (numCardsRequired === undefined) return false;
        if (obstacle !== undefined) {
          if (isElfengold && hasWitchCard) {
            if (player.hasEnoughCoins(1)) {
              console.log(numCardsRequired);
              if (cards.length !== numCardsRequired) return false;
              player.deductCoins(1);
              return true;
            } else {
              return false;
            }
          } else {
            numCardsRequired += 1;
          }
        }
        console.log(cards.length);
        if (cards.length !== numCardsRequired) return false;
      }
    }
    return true;
  }

  public isMagicFlight(player: Player, card: CardUnit): boolean {
    if (GameManager.getInstance().getGameVariant() === GameVariant.elfengold) {
      // check if a witch card is selected
      if (card.getName() === TravelCardType.Witch) {
        if (player.hasEnoughCoins(3)) {
          player.deductCoins(3);
          return true;
        }
      }
    }
    return false;
  }

  public update(manager: any) {
    this.cardPile = manager.cardPile.map((card: any) => {
      if (card.type === 'magic-spell-card') {
        return new MagicSpellCard(card.name);
      } else if (card.type === 'travel-card') {
        return new TravelCard(card.name);
      } else if (card.type === 'gold-card') {
        return new GoldCard(card.amount);
      } else {
        return new TownCard(card.name);
      }
    });
    this.faceUpPile = manager.faceUpPile.map((card: any) => {
      if (card.type === 'magic-spell-card') {
        return new MagicSpellCard(card.name);
      } else if (card.type === 'travel-card') {
        return new TravelCard(card.name);
      } else if (card.type === 'gold-card') {
        return new GoldCard(card.amount);
      } else {
        return new TownCard(card.name);
      }
    });
    this.goldCardPile = manager.goldCardPile.map((card: any) => {
      return new GoldCard(card.amount);
    });
    this.amountDrawn = manager.amountDrawn;
  }
}

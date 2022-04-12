import internal from 'stream';
import {BootColour} from '../enums/BootColour';
import {SubVariant} from '../enums/GameVariant';
import GameManager from '../managers/GameManager';
import RoadManager from '../managers/RoadManager';
import {
  CardUnit,
  GoldCard,
  MagicSpellCard,
  TownCard,
  TravelCard,
} from './CardUnit';
import ItemInventory from './ItemInventory';
import {Counter, GoldPiece, ItemUnit, Obstacle, Spell} from './ItemUnit';
import Town from './Town';

export default class Player {
  private gold: integer;
  private score: integer;
  private bootColour: BootColour;
  private bootColourHex: number;
  private currentLocation: Town;
  private myItems: Array<ItemUnit>;
  private myCards: Array<CardUnit>;
  private visitedTowns: Array<Town>;
  private secretTown: Town;
  private passedTurn: boolean;
  private goldToAdd: integer;

  constructor(pBootColour: BootColour, pCurrentLocation: Town) {
    this.bootColour = pBootColour;
    this.currentLocation = pCurrentLocation;

    this.gold = 0;
    this.goldToAdd = 0;
    this.score = 0;
    this.myItems = [];
    this.myCards = [];
    this.visitedTowns = [];
    this.secretTown = Town.getTown('null');
    this.passedTurn = false;

    // Colour to Hex Map for global variable.
    const colourToHex: Map<BootColour, number> = new Map();
    colourToHex.set(BootColour.Black, 0x000000);
    colourToHex.set(BootColour.Blue, 0x004499);
    colourToHex.set(BootColour.Green, 0x008811);
    colourToHex.set(BootColour.Red, 0x991111);
    colourToHex.set(BootColour.Yellow, 0xffff00);
    colourToHex.set(BootColour.Purple, 0x880099);

    // Set the appropriate hex according to player's boot colour.
    this.bootColourHex = colourToHex.get(pBootColour)!;
  }

  public getGold(): integer {
    return this.gold;
  }

  public getPassedTurn(): boolean {
    return this.passedTurn;
  }

  public getHexColour(): number {
    return this.bootColourHex;
  }

  public setSecretTown(town: Town): void {
    this.secretTown = town;
  }

  public setPassedTurn(b: boolean): void {
    this.passedTurn = b;
  }

  public getSecretTown(): Town {
    return this.secretTown;
  }

  public getScore(): integer {
    return this.score;
  }

  public getActualScore(): integer {
    if (
      this.secretTown.isNull() ||
      GameManager.getInstance().getSubVariant() === SubVariant.destination
    ) {
      return this.score;
    } else {
      return (
        this.score -
        RoadManager.getInstance().getDistance(
          this.currentLocation,
          this.secretTown
        )
      );
    }
  }

  public getTownDistance(): integer {
    if (this.secretTown.isNull()) {
      return -1;
    } else {
      return RoadManager.getInstance().getDistance(
        this.currentLocation,
        this.secretTown
      );
    }
  }

  public getBootColour(): BootColour {
    return this.bootColour;
  }

  public getCurrentLocation(): Town {
    return this.currentLocation;
  }

  public getVisitedTowns(): Array<Town> {
    return this.visitedTowns;
  }

  // Not well encapsulated...
  public getItems(): Array<ItemUnit> {
    return this.myItems;
  }

  public clearItems(): void {
    this.myItems = [];
  }

  public getCards(): Array<CardUnit> {
    return this.myCards;
  }

  public setGold(pGold: integer): void {
    this.gold = pGold;
  }

  public addGoldToAdd(pGold: integer): void {
    this.goldToAdd += pGold;
  }

  public getGoldToAdd(): integer {
    return this.goldToAdd;
  }

  public chooseGold(): void {
    this.gold += this.goldToAdd;
    this.goldToAdd = 0;
  }

  public chooseCards(): void {
    this.goldToAdd = 0;
  }

  public hasEnoughCoins(pAmount: integer): boolean {
    return this.gold >= pAmount;
  }

  public deductCoins(pAmount: integer): void {
    this.gold -= pAmount;
  }

  public setScore(pScore: integer): void {
    this.score = pScore;
  }

  public setCurrentLocation(pTown: Town): void {
    this.currentLocation = pTown;
  }

  public addItem(pItem: ItemUnit): void {
    this.myItems.push(pItem);
  }

  public removeItem(pItem: ItemUnit): void {
    const index = this.myItems.indexOf(pItem);
    if (index !== -1) {
      this.myItems.splice(index, 1);
    }
  }

  public addCard(pCard: CardUnit): void {
    this.myCards.push(pCard);
  }

  public removeCard(pCard: CardUnit): void {
    const index = this.myCards.indexOf(pCard);
    if (index !== -1) {
      this.myCards.splice(index, 1);
    }
  }

  public addVisitedTown(pTown: Town): void {
    // Check if player has already visited this town
    if (!this.visitedTowns.includes(pTown)) {
      this.visitedTowns.push(pTown);
    }
  }

  public resetPlayer(): void {
    this.currentLocation = RoadManager.getInstance()
      .getTowns()
      .get('elvenhold')!;
    this.gold = 0;
    this.score = 0;
    this.myItems = [];
    this.visitedTowns = [];
  }

  public update(player: any): Player {
    this.currentLocation = RoadManager.getInstance()
      .getTowns()
      .get(player.currentLocation.name)!;
    this.gold = player.gold;
    this.score = player.score;
    this.myItems = player.myItems.map((item: any) => {
      if (item.type === 'spell') {
        return new Spell(item.name, item.allowedEdges, item.isHidden);
      } else if (item.type === 'counter') {
        return new Counter(
          item.name,
          item.allowedEdges,
          item.cardsNeeded,
          item.isHidden
        );
      } else if (item.type === 'gold-piece') {
        return new GoldPiece(item.allowedEdges, item.isHidden);
      } else {
        return new Obstacle(
          item.name,
          item.allowedEdges,
          item.needsCounter,
          item.isHidden
        );
      }
    });
    this.myCards = player.myCards.map((card: any) => {
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
    this.visitedTowns = player.visitedTowns.map((town: any) => {
      return RoadManager.getInstance().getTowns().get(town.name)!;
    });
    this.secretTown =
      RoadManager.getInstance().getTowns().get(player.secretTown.name)! ||
      undefined;
    this.passedTurn = player.passedTurn;
    return this;
  }
}

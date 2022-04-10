import internal from 'stream';
import {BootColour} from '../enums/BootColour';
import RoadManager from '../managers/RoadManager';
import {CardUnit} from './CardUnit';
import {ItemUnit} from './ItemUnit';
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
    if (this.secretTown.isNull()) {
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

  public getCards(): Array<CardUnit> {
    return this.myCards;
  }

  public setGold(pGold: integer): void {
    this.gold = pGold;
  }

  public addGoldToAdd(pGold: integer): void {
    this.goldToAdd += pGold;
  }

  public chooseGold(): void {
    this.gold += this.goldToAdd;
    this.goldToAdd = 0;
  }

  public chooseCards(): void {
    // let numcards = 2;
    // while (this.getCards().length < 8 && numcards > 0) {
    //   const randomCard: CardUnit = CardManager.getInstance().getRandomCard();
    //   this.addCard(randomCard);
    //   numcards--;
    // }
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
}

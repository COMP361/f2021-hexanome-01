import {BootColour} from '../enums/BootColour';
import RoadManager from '../managers/RoadManager';
import {CardUnit} from './CardUnit';
import {ItemUnit} from './ItemUnit';
import Town from './Town';

export default class Player {
  private gold: integer;
  private score: integer;
  private bootColour: BootColour;
  private currentLocation: Town;
  private myItems: Array<ItemUnit>;
  private myCards: Array<CardUnit>;
  private visitedTowns: Array<Town>;
  private destinationTown: Town;

  constructor(pBootColour: BootColour, pCurrentLocation: Town) {
    this.bootColour = pBootColour;
    this.currentLocation = pCurrentLocation;

    this.gold = 0;
    this.score = 0;
    this.myItems = [];
    this.myCards = [];
    this.visitedTowns = [];
    this.destinationTown = Town.getTown('null');
  }

  public getGold(): integer {
    return this.gold;
  }

  public setDestinationTown(town: Town): void {
    this.destinationTown = town;
  }

  public getDestinationTown(): Town {
    return this.destinationTown;
  }

  public getScore(): integer {
    return this.score;
  }

  public getActualScore(): integer {
    if (this.destinationTown.isNull()) {
      return this.score;
    } else {
      return (
        this.score -
        RoadManager.getInstance().getDistance(
          this.currentLocation,
          this.destinationTown
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

  public setScore(pScore: integer): void {
    this.score = pScore;
  }

  public setCurrentLocation(pTown: Town): void {
    this.currentLocation = pTown;
  }

  public addItem(pItem: ItemUnit): void {
    this.myItems.push(pItem);
  }

  public addCard(pCard: CardUnit): void {
    this.myCards.push(pCard);
  }

  public addVisitedTown(pTown: Town): void {
    this.visitedTowns.push(pTown);
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

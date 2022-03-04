import {BootColour} from '../enums/BootColour';
import RoadManager from '../managers/RoadManager';
import {Counter} from './ItemUnit';
import Town from './Town';

export default class Player {
  private gold: integer;
  private score: integer;
  private bootColour: BootColour;
  private currentLocation: Town;
  private myCounters: Array<Counter>;
  private visitedTowns: Array<Town>;

  constructor(pBootColour: BootColour, pCurrentLocation: Town) {
    this.bootColour = pBootColour;
    this.currentLocation = pCurrentLocation;

    this.gold = 0;
    this.score = 0;
    this.myCounters = [];
    this.visitedTowns = [];
  }

  public getGold(): integer {
    return this.gold;
  }

  public getScore(): integer {
    return this.score;
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
  public getCounters(): Array<Counter> {
    return this.myCounters;
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

  public addCounter(pCounter: Counter): void {
    this.myCounters.push(pCounter);
  }

  public addVisitedTown(pTown: Town): void {
    this.visitedTowns.push(pTown);
  }

  public resetPlayer(): void {
    this.currentLocation = RoadManager.getInstance().getTowns().elvenhold;
    this.gold = 0;
    this.score = 0;
    this.myCounters = [];
    this.visitedTowns = [];
  }
}

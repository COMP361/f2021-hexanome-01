import {
  Counter,
  GoldPiece,
  ItemUnit,
  Obstacle,
  Spell,
} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {GameVariant} from '../enums/GameVariant';
import {ObstacleType} from '../enums/ObstacleType';
import {SpellType} from '../enums/SpellType';
import GameManager from './GameManager';

export default class ItemManager {
  private static itemManagerInstance: ItemManager;
  private itemPile: Array<ItemUnit>;
  private faceUpPile: Array<ItemUnit>;

  constructor() {
    this.itemPile = [];
    this.faceUpPile = [];
    const gameVariant = GameManager.getInstance().getGameVariant();
    if (gameVariant === GameVariant.elfenland) {
      for (let i = 0; i < 8; i++) {
        this.itemPile.push(
          new Counter(
            CounterType.ElfCycle,
            [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
            new Map([
              [EdgeType.Plain, 1],
              [EdgeType.Wood, 1],
              [EdgeType.Mountain, 2],
            ])
          )
        );
        this.itemPile.push(
          new Counter(
            CounterType.MagicCloud,
            [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
            new Map([
              [EdgeType.Plain, 2],
              [EdgeType.Wood, 2],
              [EdgeType.Mountain, 1],
            ])
          )
        );
        this.itemPile.push(
          new Counter(
            CounterType.Unicorn,
            [EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
            new Map([
              [EdgeType.Wood, 1],
              [EdgeType.Desert, 2],
              [EdgeType.Mountain, 1],
            ])
          )
        );
        this.itemPile.push(
          new Counter(
            CounterType.TrollWagon,
            [EdgeType.Plain, EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
            new Map([
              [EdgeType.Plain, 1],
              [EdgeType.Wood, 2],
              [EdgeType.Desert, 2],
              [EdgeType.Mountain, 2],
            ])
          )
        );
        this.itemPile.push(
          new Counter(
            CounterType.Dragon,
            [EdgeType.Plain, EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
            new Map([
              [EdgeType.Plain, 1],
              [EdgeType.Wood, 2],
              [EdgeType.Desert, 1],
              [EdgeType.Mountain, 1],
            ])
          )
        );
        this.itemPile.push(
          new Counter(
            CounterType.GiantPig,
            [EdgeType.Plain, EdgeType.Wood],
            new Map([
              [EdgeType.Plain, 1],
              [EdgeType.Wood, 1],
            ])
          )
        );
      }
    } else {
      for (let i = 0; i < 9; i++) {
        if (i < 2) {
          this.itemPile.push(
            new GoldPiece([
              EdgeType.Plain,
              EdgeType.Wood,
              EdgeType.Desert,
              EdgeType.Mountain,
            ])
          );
          this.itemPile.push(
            new Spell(SpellType.Double, [
              EdgeType.Plain,
              EdgeType.Wood,
              EdgeType.Desert,
              EdgeType.Mountain,
            ])
          );
          this.itemPile.push(
            new Spell(SpellType.Exchange, [
              EdgeType.Plain,
              EdgeType.Wood,
              EdgeType.Desert,
              EdgeType.Mountain,
            ])
          );
          this.itemPile.push(
            new Obstacle(ObstacleType.SeaMonster, [
              EdgeType.Lake,
              EdgeType.River,
            ])
          );
          this.itemPile.push(
            new Obstacle(ObstacleType.Tree, [
              EdgeType.Plain,
              EdgeType.Wood,
              EdgeType.Mountain,
              EdgeType.Desert,
            ])
          );
        }
        if (i < 4) {
          this.itemPile.push(
            new Counter(
              CounterType.Dragon,
              [
                EdgeType.Plain,
                EdgeType.Wood,
                EdgeType.Desert,
                EdgeType.Mountain,
              ],
              new Map([
                [EdgeType.Plain, 1],
                [EdgeType.Wood, 2],
                [EdgeType.Desert, 1],
                [EdgeType.Mountain, 1],
              ])
            )
          );
          this.itemPile.push(
            new Counter(
              CounterType.MagicCloud,
              [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
              new Map([
                [EdgeType.Plain, 2],
                [EdgeType.Wood, 2],
                [EdgeType.Mountain, 1],
              ])
            )
          );
        }
        if (i < 5) {
          this.itemPile.push(
            new Counter(
              CounterType.Unicorn,
              [EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
              new Map([
                [EdgeType.Wood, 1],
                [EdgeType.Desert, 2],
                [EdgeType.Mountain, 1],
              ])
            )
          );
        }
        if (i < 8) {
          this.itemPile.push(
            new Counter(
              CounterType.TrollWagon,
              [
                EdgeType.Plain,
                EdgeType.Wood,
                EdgeType.Desert,
                EdgeType.Mountain,
              ],
              new Map([
                [EdgeType.Plain, 1],
                [EdgeType.Wood, 2],
                [EdgeType.Desert, 2],
                [EdgeType.Mountain, 2],
              ])
            )
          );
          this.itemPile.push(
            new Counter(
              CounterType.ElfCycle,
              [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
              new Map([
                [EdgeType.Plain, 1],
                [EdgeType.Wood, 1],
                [EdgeType.Mountain, 2],
              ])
            )
          );
        }
        this.itemPile.push(
          new Counter(
            CounterType.GiantPig,
            [EdgeType.Plain, EdgeType.Wood],
            new Map([
              [EdgeType.Plain, 1],
              [EdgeType.Wood, 1],
            ])
          )
        );
      }
    }
  }

  static getInstance(): ItemManager {
    if (!ItemManager.itemManagerInstance) {
      ItemManager.itemManagerInstance = new ItemManager();
    }
    return ItemManager.itemManagerInstance;
  }

  getItemPile(): Array<ItemUnit> {
    return this.itemPile;
  }

  getRandomItem(): ItemUnit {
    const index = Math.floor(Math.random() * this.itemPile.length);
    const item = this.itemPile[index];
    this.itemPile.splice(index, 1);
    return item;
  }

  getTreeObstacle(): Obstacle {
    return new Obstacle(ObstacleType.Tree, [
      EdgeType.Plain,
      EdgeType.Wood,
      EdgeType.Mountain,
      EdgeType.Desert,
    ]);
  }

  flipCounters(): void {
    for (let i = 0; i < 5; i++) {
      this.faceUpPile.push(this.getRandomItem());
    }
  }
  getFaceUpPile(): Array<ItemUnit> {
    return this.faceUpPile;
  }

  removeFaceUpItem(i: any): void {
    this.faceUpPile[i] = this.getRandomItem();
  }

  addToPile(item: ItemUnit, player: Player | null = null): void {
    if (player !== null) {
      player.removeItem(item);
    }
    this.itemPile.push(item);
  }

  update(manager: any): void {
    this.itemPile = manager.itemPile.map(
      (counter: any) =>
        new Counter(counter.name, counter.allowedEdges, counter.cardsNeeded)
    );
    this.faceUpPile = manager.faceUpPile.map(
      (counter: any) =>
        new Counter(counter.name, counter.allowedEdges, counter.cardsNeeded)
    );
    console.log(this.itemPile);
  }
}

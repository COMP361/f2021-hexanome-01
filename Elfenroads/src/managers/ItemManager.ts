import {Counter, ItemUnit, Obstacle} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {ObstacleType} from '../enums/ObstacleType';

export default class ItemManager {
  private static itemManagerInstance: ItemManager;
  private itemPile: Array<ItemUnit>;
  private faceUpPile: Array<ItemUnit>;

  constructor() {
    // contains item for elfenroads
    this.itemPile = [];
    this.faceUpPile = [];
    //Elfcycle
    const elfMap: Map<EdgeType, number> = new Map();
    elfMap.set(EdgeType.Plain, 1);
    elfMap.set(EdgeType.Wood, 1);
    elfMap.set(EdgeType.Mountain, 2);
    //cloud
    const cloudMap: Map<EdgeType, number> = new Map();
    cloudMap.set(EdgeType.Plain, 2);
    cloudMap.set(EdgeType.Wood, 2);
    cloudMap.set(EdgeType.Mountain, 1);
    //unicron
    const unicronMap: Map<EdgeType, number> = new Map();
    unicronMap.set(EdgeType.Wood, 1);
    unicronMap.set(EdgeType.Desert, 2);
    unicronMap.set(EdgeType.Mountain, 1);
    //trollwagon
    const trollMap: Map<EdgeType, number> = new Map();
    trollMap.set(EdgeType.Plain, 1);
    trollMap.set(EdgeType.Wood, 2);
    trollMap.set(EdgeType.Desert, 2);
    trollMap.set(EdgeType.Mountain, 2);
    //dragon
    const dragonMap: Map<EdgeType, number> = new Map();
    dragonMap.set(EdgeType.Plain, 1);
    dragonMap.set(EdgeType.Wood, 2);
    dragonMap.set(EdgeType.Desert, 1);
    dragonMap.set(EdgeType.Mountain, 1);
    //pig
    const pigMap: Map<EdgeType, number> = new Map();
    pigMap.set(EdgeType.Plain, 1);
    pigMap.set(EdgeType.Wood, 1);

    for (let i = 0; i < 8; i++) {
      this.itemPile.push(
        new Counter(
          CounterType.ElfCycle,
          [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
          elfMap
        )
      );
      this.itemPile.push(
        new Counter(
          CounterType.MagicCloud,
          [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
          cloudMap
        )
      );
      this.itemPile.push(
        new Counter(
          CounterType.Unicorn,
          [EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
          unicronMap
        )
      );
      this.itemPile.push(
        new Counter(
          CounterType.TrollWagon,
          [EdgeType.Plain, EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
          trollMap
        )
      );
      this.itemPile.push(
        new Counter(
          CounterType.Dragon,
          [EdgeType.Plain, EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
          dragonMap
        )
      );
      this.itemPile.push(
        new Counter(
          CounterType.GiantPig,
          [EdgeType.Plain, EdgeType.Wood],
          pigMap
        )
      );
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

  addToPile(player: Player, item: ItemUnit): void {
    player.removeItem(item);
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

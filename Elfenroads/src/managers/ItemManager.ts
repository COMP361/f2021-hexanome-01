import {Counter, ItemUnit, Obstacle} from '../classes/ItemUnit';
import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';
import {ObstacleType} from '../enums/ObstacleType';

export default class ItemManager {
  private static itemManagerInstance: ItemManager;
  private itemPile: Array<ItemUnit>;

  private constructor() {
    // contains item for elfenroads
    this.itemPile = [];
    for (let i = 0; i < 8; i++) {
      if (i < 6) {
        this.itemPile.push(
          new Obstacle(ObstacleType.Tree, [
            EdgeType.Plain,
            EdgeType.Wood,
            EdgeType.Mountain,
            EdgeType.Desert,
          ])
        );
      }
      this.itemPile.push(
        new Counter(CounterType.ElfCycle, [
          EdgeType.Plain,
          EdgeType.Wood,
          EdgeType.Mountain,
        ])
      );
      this.itemPile.push(
        new Counter(CounterType.MagicCloud, [
          EdgeType.Plain,
          EdgeType.Wood,
          EdgeType.Mountain,
        ])
      );
      this.itemPile.push(
        new Counter(CounterType.Unicorn, [
          EdgeType.Wood,
          EdgeType.Desert,
          EdgeType.Mountain,
        ])
      );
      this.itemPile.push(
        new Counter(CounterType.TrollWagon, [
          EdgeType.Plain,
          EdgeType.Wood,
          EdgeType.Desert,
          EdgeType.Mountain,
        ])
      );
      this.itemPile.push(
        new Counter(CounterType.Dragon, [
          EdgeType.Plain,
          EdgeType.Wood,
          EdgeType.Desert,
          EdgeType.Mountain,
        ])
      );
      this.itemPile.push(
        new Counter(CounterType.GiantPig, [EdgeType.Plain, EdgeType.Wood])
      );
    }
  }

  public static getInstance(): ItemManager {
    if (!ItemManager.itemManagerInstance) {
      ItemManager.itemManagerInstance = new ItemManager();
    }
    return ItemManager.itemManagerInstance;
  }

  public getItemPile(): Array<ItemUnit> {
    return this.itemPile;
  }

  public getRandomItem(): ItemUnit {
    const index = Math.floor(Math.random() * this.itemPile.length);
    const item = this.itemPile[index];
    this.itemPile.splice(index, 1);
    return item;
  }
}

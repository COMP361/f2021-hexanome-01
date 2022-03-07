import {Counter, ItemUnit} from '../classes/ItemUnit';
import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';

export default class ItemManager {
  private static itemManagerInstance: ItemManager;
  private itemPile: Array<ItemUnit>;

  private constructor() {
    // Only added a few for now...
    this.itemPile = [
      new Counter(CounterType.ElfCycle, [
        EdgeType.Plain,
        EdgeType.Wood,
        EdgeType.Mountain,
      ]),
      new Counter(CounterType.MagicCloud, [
        EdgeType.Plain,
        EdgeType.Wood,
        EdgeType.Mountain,
      ]),
      new Counter(CounterType.Unicorn, [
        EdgeType.Wood,
        EdgeType.Desert,
        EdgeType.Mountain,
      ]),
      new Counter(CounterType.TrollWagon, [
        EdgeType.Plain,
        EdgeType.Wood,
        EdgeType.Desert,
        EdgeType.Mountain,
      ]),
      new Counter(CounterType.Dragon, [
        EdgeType.Plain,
        EdgeType.Wood,
        EdgeType.Desert,
        EdgeType.Mountain,
      ]),
    ];
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
    const item =
      this.itemPile[Math.floor(Math.random() * this.itemPile.length)];
    return item.getCopy();
  }
}

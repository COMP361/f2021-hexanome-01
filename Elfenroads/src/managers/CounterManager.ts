import {Counter} from '../classes/ItemUnit';
import {CounterType} from '../enums/CounterType';
import {EdgeType} from '../enums/EdgeType';

export default class CounterManager {
  private static counterManagerInstance: CounterManager;
  private counterPile: Array<Counter>;

  private constructor() {
    // Only added a few for now...
    this.counterPile = [
      new Counter(
        CounterType.ElfCycle,
        [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
        'elfcycle-counter'
      ),
      new Counter(
        CounterType.MagicCloud,
        [EdgeType.Plain, EdgeType.Wood, EdgeType.Mountain],
        'cloud-counter'
      ),
      new Counter(
        CounterType.Unicorn,
        [EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
        'unicorn-counter'
      ),
      new Counter(
        CounterType.TrollWagon,
        [EdgeType.Plain, EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
        'troll-wagon-counter'
      ),
      new Counter(
        CounterType.Dragon,
        [EdgeType.Plain, EdgeType.Wood, EdgeType.Desert, EdgeType.Mountain],
        'dragon-counter'
      ),
    ];
  }

  public static getInstance(): CounterManager {
    if (!CounterManager.counterManagerInstance) {
      CounterManager.counterManagerInstance = new CounterManager();
    }
    return CounterManager.counterManagerInstance;
  }

  public getCounterPile(): Array<Counter> {
    return this.counterPile;
  }

  public getRandomCounter(): Counter {
    return this.counterPile[
      Math.floor(Math.random() * this.counterPile.length)
    ];
  }
}

import { EdgeType } from '../model/Edge';
import {
  Counter,
  CounterType,
  ItemUnit,
  Obstacle,
  ObstacleType,
  SpellType,
} from '../model/ItemUnit';

export default class ItemManager {
  private allowedEdges: Map<
    CounterType | SpellType | ObstacleType,
    EdgeType[]
  > = new Map();

  private availableItems: ItemUnit[] = [];
  private availableObstacles: ItemUnit[] = [];
  constructor(game: String, numPlayer: number) {
    this.generateAllowedEdges();
    this.populateItems(game, numPlayer);
  }

  generateAllowedEdges(): void {
    this.allowedEdges.set(CounterType.ELFCYCLE, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
    ]);

    this.allowedEdges.set(CounterType.MAGICCLOUD, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
    ]);

    this.allowedEdges.set(CounterType.UNICORN, [
      EdgeType.DESERT,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
    ]);

    this.allowedEdges.set(CounterType.TROLLWAGON, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
      EdgeType.DESERT,
    ]);

    this.allowedEdges.set(CounterType.DRAGON, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
      EdgeType.DESERT,
    ]);
    this.allowedEdges.set(CounterType.GIANTPIG, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
    ]);

    this.allowedEdges.set(ObstacleType.TREE, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
      EdgeType.DESERT,
    ]);

    this.allowedEdges.set(ObstacleType.SEAMONSTER, [
      EdgeType.RIVER,
      EdgeType.LAKE,
    ]);

    this.allowedEdges.set(SpellType.DOUBLE, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
      EdgeType.DESERT,
    ]);

    this.allowedEdges.set(SpellType.EXCHANGE, [
      EdgeType.PLAIN,
      EdgeType.WOOD,
      EdgeType.MOUNTAIN,
      EdgeType.DESERT,
    ]);
  }

  populateItems(game: String, numPlayer: number): void {
    for (let i = 0; i < numPlayer; i++) {
      this.availableObstacles.push(new Obstacle(ObstacleType.TREE));
    }

    for (const type in CounterType) {
      for (let i = 0; i < 8; i++) {
        this.availableItems.push(new Counter(CounterType[type] as CounterType));
      }
    }

    this.availableItems.sort(() => Math.random() - 0.5);
  }
}

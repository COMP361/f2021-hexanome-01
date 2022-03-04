import {Counter} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import CounterManager from './CounterManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';

export default class GameManager {
  private static gameManagerInstance: GameManager;
  private counterManger: CounterManager;
  private playerManager: PlayerManager;
  private roadManager: RoadManager;

  private constructor() {
    // Instantiate all other Singleton Managers
    this.counterManger = CounterManager.getInstance();
    this.playerManager = PlayerManager.getInstance();
    this.roadManager = RoadManager.getInstance();
  }

  public static getInstance(): GameManager {
    if (!GameManager.gameManagerInstance) {
      GameManager.gameManagerInstance = new GameManager();
    }
    return GameManager.gameManagerInstance;
  }

  /**
   * SIMULATION OF GAME
   */
  public playGame(): void {
    // Add our player/players. Imagine we have many to add.
    this.playerManager.addPlayer(
      new Player(BootColour.Green, this.roadManager.getTowns().elvenhold)
    );

    // Now, let's pretend that the current player is drawing random counters
    const random1: Counter = this.counterManger.getRandomCounter();
    const random2: Counter = this.counterManger.getRandomCounter();

    const currentPlayer: Player = this.playerManager.getCurrentPlayer();

    currentPlayer.addCounter(random1);
    currentPlayer.addCounter(random2);
  }
}

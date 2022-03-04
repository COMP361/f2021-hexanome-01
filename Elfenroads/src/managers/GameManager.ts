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
    // Starting town is set to elvenhold.
    this.playerManager.addPlayer(
      new Player(BootColour.Green, this.roadManager.getTowns().elvenhold)
    );

    // Now, let's pretend that the current player is drawing random counters

    // Draw the random counters from the counter pile. Counters aren't remove for simulation purposes.
    const random1: Counter = this.counterManger.getRandomCounter();
    const random2: Counter = this.counterManger.getRandomCounter();

    // Get current player
    const currentPlayer: Player = this.playerManager.getCurrentPlayer();

    // Add the random counters to the player's owned counters
    currentPlayer.addCounter(random1);
    currentPlayer.addCounter(random2);
  }
}

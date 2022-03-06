import {CardUnit} from '../classes/CardUnit';
import {Counter} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import {CardManager} from './CardManagaer';
import CounterManager from './CounterManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';

export default class GameManager {
  private static gameManagerInstance: GameManager;
  private counterManager: CounterManager;
  private cardManager: CardManager;
  private playerManager: PlayerManager;
  private roadManager: RoadManager;

  private constructor() {
    // Instantiate all other Singleton Managers
    this.counterManager = CounterManager.getInstance();
    this.cardManager = CardManager.getInstance();
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
    // Add our player/players. Imagine we have many to add based on the lobby.
    // Starting town is set to elvenhold.
    this.playerManager.addPlayer(
      new Player(
        BootColour.Green,
        this.roadManager.getTowns().get('elvenhold')!
      )
    );

    this.playerManager.addPlayer(
      new Player(BootColour.Red, this.roadManager.getTowns().get('elvenhold')!)
    );

    this.playerManager.addPlayer(
      new Player(
        BootColour.Yellow,
        this.roadManager.getTowns().get('elvenhold')!
      )
    );

    // Now, let's pretend that the current player is drawing random counters

    // Draw the random counters from the counter pile. Counters aren't remove for simulation purposes.
    const random1: Counter = this.counterManager.getRandomCounter();
    const random2: Counter = this.counterManager.getRandomCounter();

    // Draw random cards from the card pile.
    const card1: CardUnit = this.cardManager.getRandomCard();
    const card2: CardUnit = this.cardManager.getRandomCard();
    const card3: CardUnit = this.cardManager.getRandomCard();

    // Get current player
    const currentPlayer: Player = this.playerManager.getCurrentPlayer();

    // Add the random counters/cards to the player's owned counters/cards
    currentPlayer.addCounter(random1);
    currentPlayer.addCounter(random2);
    currentPlayer.addCard(card1);
    currentPlayer.addCard(card2);
    currentPlayer.addCard(card3);
  }
}

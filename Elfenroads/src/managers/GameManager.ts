import {CardUnit} from '../classes/CardUnit';
import {ItemUnit} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import {CardManager} from './CardManager';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';

export default class GameManager {
  private static gameManagerInstance: GameManager;
  private itemManager: ItemManager;
  private cardManager: CardManager;
  private playerManager: PlayerManager;
  private roadManager: RoadManager;

  private constructor() {
    // Instantiate all other Singleton Managers
    this.itemManager = ItemManager.getInstance();
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
      new Player(BootColour.Blue, this.roadManager.getTowns().get('elvenhold')!)
    );

    this.playerManager.addPlayer(
      new Player(
        BootColour.Yellow,
        this.roadManager.getTowns().get('elvenhold')!
      )
    );

    // Now, let's pretend that the current player is drawing random counters
    for (const player of this.playerManager.getPlayers()) {
      // Draw the random counters from the counter pile. Counters aren't remove for simulation purposes.
      const random1: ItemUnit = this.itemManager.getRandomItem();
      const random2: ItemUnit = this.itemManager.getRandomItem();
      random2.isHidden = true;

      // Draw random cards from the card pile.
      const card1: CardUnit = this.cardManager.getRandomCard();
      const card2: CardUnit = this.cardManager.getRandomCard();
      const card3: CardUnit = this.cardManager.getRandomCard();

      // Add the random counters/cards to the player's owned counters/cards
      player.addItem(random1);
      player.addItem(random2);

      player.addCard(card1);
      player.addCard(card2);
      player.addCard(card3);
    }
  }
}

import {CardUnit} from '../classes/CardUnit';
import {ItemUnit} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import {CardManager} from './CardManager';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';
import Phaser from 'phaser';
import {getSession, getUser} from '../utils/storageUtils';
const colorMap: any = {
  '008000': BootColour.Green,
  '0000FF': BootColour.Blue,
  '800080': BootColour.Purple,
  FF0000: BootColour.Red,
  FFFF00: BootColour.Yellow,
  '000000': BootColour.Black,
};

export default class GameManager {
  private static gameManagerInstance: GameManager;
  private itemManager: ItemManager;
  private cardManager: CardManager;
  private playerManager: PlayerManager;
  private roadManager: RoadManager;
  private round: integer;

  private constructor() {
    // Instantiate all other Singleton Managers
    this.itemManager = ItemManager.getInstance();
    this.cardManager = CardManager.getInstance();
    this.playerManager = PlayerManager.getInstance();
    this.roadManager = RoadManager.getInstance();
    this.round = 1;
  }

  public static getInstance(): GameManager {
    if (!GameManager.gameManagerInstance) {
      GameManager.gameManagerInstance = new GameManager();
    }
    return GameManager.gameManagerInstance;
  }

  public getRound(): integer {
    return this.round;
  }

  /**
   * SIMULATION OF GAME
   */
  public playGame(mainScene: Phaser.Scene): void {
    // Step 1: Get players and inialize them based on their bootchoices
    this.initializePlayers();

    // Step 2: Get number of rounds
    const numRounds: integer = 3;

    // Step 3: Play number of rounds
    for (let i = 1; i < numRounds + 1; i++) {
      this.playRound(mainScene, i - 1);
    }

    // Step 4: Determine winner
  }
  private playRound(mainScene: Phaser.Scene, pStartingPlayer: integer): void {
    // Phase 1 & 2: Deal Travel Cards and one random facedown Counter
    this.dealCardsAndCounter();

    PlayerManager.getInstance().setCurrentPlayerIndex(pStartingPlayer);
    // Phase 3: Draw additional Transportation counters
    mainScene.scene.launch('drawcountersscene', () => {
      mainScene.scene.stop('drawcountersscene');

      PlayerManager.getInstance().setCurrentPlayerIndex(pStartingPlayer);
      // Phase 4: Plan route
      mainScene.scene.launch('planroutescene', () => {
        mainScene.scene.stop('planroutescene');

        PlayerManager.getInstance().setCurrentPlayerIndex(pStartingPlayer);
        // Phase 5: Move Boot
        mainScene.scene.launch('movebootscene');
        this.round++;
      });
    });
  }

  private dealCardsAndCounter(): void {
    for (const player of this.playerManager.getPlayers()) {
      // Deal up to 8 cards
      while (player.getCards().length < 8) {
        const randomCard: CardUnit = this.cardManager.getRandomCard();
        player.addCard(randomCard);
      }

      // Deal the random facedown counter from the counter pile.
      const randomItem: ItemUnit = this.itemManager.getRandomItem();
      randomItem.setHidden(true);
      player.addItem(randomItem);
    }
  }

  private initializePlayers(): void {
    // Create our players. Imagine we have many to add based on the lobby.
    // Starting town is set to elvenhold.
    const {name} = getUser();

    const session = getSession();
    session.users.forEach((user: any) => {
      const player = new Player(
        colorMap[user.preferredColour],
        this.roadManager.getTowns().get('elvenhold')!
      );

      // Add current player
      this.playerManager.addPlayer(player);

      // Set the local player
      if (user.name === name) {
        this.playerManager.setLocalPlayer(player);
      }
    });
  }

  private drawAdditionalCounters(): void {}
}

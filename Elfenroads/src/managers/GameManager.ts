import {CardUnit} from '../classes/CardUnit';
import {ItemUnit} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import {CardManager} from './CardManager';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';
import Phaser from 'phaser';

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
  public playGame(mainScene: Phaser.Scene): void {
    // Step 1: Get players and inialize them based on their bootchoices
    this.initializePlayers();

    // Step 2: Get number of rounds
    const numRounds: integer = 1;

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
        mainScene.scene.launch('selectionscene');
        mainScene.scene.launch('movebootscene');
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
    const p1: Player = new Player(
      BootColour.Yellow,
      this.roadManager.getTowns().get('elvenhold')!
    );

    const p2: Player = new Player(
      BootColour.Red,
      this.roadManager.getTowns().get('elvenhold')!
    );

    const p3: Player = new Player(
      BootColour.Black,
      this.roadManager.getTowns().get('elvenhold')!
    );

    // Add all players
    this.playerManager.addPlayer(p1);
    this.playerManager.addPlayer(p2);
    this.playerManager.addPlayer(p3);

    // Set the local player for UI rendering purposes
    this.playerManager.setLocalPlayer(p1);
  }

  private drawAdditionalCounters(): void {}
}

import {CardUnit} from '../classes/CardUnit';
import {ItemUnit} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import {CardManager} from './CardManager';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';
import Phaser from 'phaser';
import Town from '../classes/Town';

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
      this.playRound(mainScene);
    }

    // Step 4: Determine winner

    /**
     * SHOWCASE FOR WAKEING AND SLEEPING PHASER SCENES
     */
    mainScene.scene.launch('movebootscene');

    const width = mainScene.cameras.main.width;
    const toggleMoveBootButton = mainScene.add.sprite(
      width - 30,
      100,
      'brown-box'
    );
    mainScene.add
      .image(toggleMoveBootButton.x, toggleMoveBootButton.y, 'power')
      .setScale(0.7);

    // Add interactive pointer options for toggleMoveBootButton
    toggleMoveBootButton
      .setInteractive()
      .on('pointerdown', () => {
        toggleMoveBootButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        toggleMoveBootButton.clearTint();
      })
      .on('pointerup', () => {
        toggleMoveBootButton.clearTint();
        if (mainScene.scene.isSleeping('movebootscene')) {
          mainScene.scene.wake('movebootscene');
        } else {
          mainScene.scene.sleep('movebootscene');
        }
      });

    // BLOCK END

    /**
     * SHOWCASE FOR CHANGING PLAYER TURN
     */
    // Create small button with the "next" icon
    const passTurnButton = mainScene.add.sprite(width - 30, 150, 'brown-box');
    mainScene.add
      .image(passTurnButton.x, passTurnButton.y, 'next')
      .setScale(0.7);

    // Add interactive pointer options for passTurnButton
    // After click, currentPlayer is updated via playerManager
    // PlayerTurnScene is rerendered to show whose turn it is
    passTurnButton
      .setInteractive()
      .on('pointerdown', () => {
        passTurnButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        passTurnButton.clearTint();
      })
      .on('pointerup', () => {
        passTurnButton.clearTint();
        this.playerManager.setNextPlayer();
        mainScene.scene.get('playerturnscene').scene.restart();
      });
  }

  private playRound(mainScene: Phaser.Scene): void {
    // Phase 1 & 2: Deal Travel Cards and one random facedown Counter
    this.dealCardsAndCounter();

    // Phase 3: Draw additional Transportation counters
    mainScene.scene.launch('drawcountersscene');
  }

  private dealCardsAndCounter(): void {
    for (const player of this.playerManager.getPlayers()) {
      // Deal up to 8 cards
      while (player.getCards().length < 8) {
        const randomCard: CardUnit = this.cardManager.getRandomCard();
        player.addCard(randomCard);
      }

      // Deal the random facedown counter from the counter pile.
      const random1: ItemUnit = this.itemManager.getRandomItem();
      random1.setHidden(true);
      player.addItem(random1);
    }
  }

  private initializePlayers(): void {
    // Add our player/players. Imagine we have many to add based on the lobby.
    // Starting town is set to elvenhold.
    this.playerManager.addPlayer(
      new Player(BootColour.Green, Town.getTown('elvenhold'))
    );

    this.playerManager.addPlayer(
      new Player(BootColour.Red, Town.getTown('elvenhold'))
    );

    this.playerManager.addPlayer(
      new Player(BootColour.Black, Town.getTown('elvenhold'))
    );

    this.playerManager.setPlayerDest(0, Town.getTown('elvenhold'));
  }

  private drawAdditionalCounters(): void {}
}

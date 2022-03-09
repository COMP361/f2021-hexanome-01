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
      random2.setHidden(true);

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
}

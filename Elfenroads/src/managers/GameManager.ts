import {CardUnit} from '../classes/CardUnit';
import {ItemUnit, Obstacle} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import {CardManager} from './CardManager';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';
import Phaser from 'phaser';
import {getSession, getSessionId, getUser} from '../utils/storageUtils';
import {io} from 'socket.io-client';
import {GameVariant} from '../enums/GameVariant';
import {throwServerError} from '@apollo/client';
import {Console} from 'console';

const colorMap: any = {
  '008000': BootColour.Green,
  '0000FF': BootColour.Blue,
  '800080': BootColour.Purple,
  FF0000: BootColour.Red,
  FFFF00: BootColour.Yellow,
  '000000': BootColour.Black,
};

export default class GameManager {
  // Singleton Field
  private static gameManagerInstance: GameManager;

  // Manager Fields
  private itemManager: ItemManager;
  private cardManager: CardManager;
  private playerManager: PlayerManager;
  private roadManager: RoadManager;

  // Connection Fields
  private socket: any;
  private initialized: boolean;

  // Gameplay Fields
  private round: integer;
  private numRounds: integer;
  private gameVariant: GameVariant;
  private mainScene!: Phaser.Scene;

  private constructor() {
    // Instantiate all other Singleton Managers
    this.itemManager = ItemManager.getInstance();
    this.cardManager = CardManager.getInstance();
    this.playerManager = PlayerManager.getInstance();
    this.roadManager = RoadManager.getInstance();
    this.socket = io('http://elfenroads.westus3.cloudapp.azure.com:3455/');
    this.socket.emit('joinLobby', {
      game: 'ElfenlandVer1',
      session_id: getSessionId(),
    });
    this.socket.emit('chat', {
      game: 'ElfenlandVer1',
      session_id: getSessionId(),
      data: getUser().name,
    });
    this.initialized = false;

    // hard coded this for now
    this.gameVariant = GameVariant.elfengold;
    this.numRounds = 3;
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

  public getGameVariant(): GameVariant {
    return this.gameVariant;
  }

  public playGame(mainScene: Phaser.Scene): void {
    // Step 0: Initialize the main Phaser.Scene
    this.mainScene = mainScene;

    // Step 1: Get players and inialize them based on their bootchoices
    this.initializePlayers();

    // Step 2: initialize the item and card pile
    this.itemManager.initializePile();
    this.cardManager.initializePile();

    // Step 4: Play specific type of round based on game version
    switch (this.gameVariant) {
      case GameVariant.elfenland:
        this.playRoundElfenland();
        break;
      case GameVariant.elfengold:
        this.playRoundElfengold();
        break;
      default:
        console.log("I don't know that game variant.");
    }
  }

  private playRoundElfenland(): void {
    console.log(`Playing Elfenland Round: ${this.round}`);
    // Check to see if we have played enough rounds
    if (this.round > this.numRounds) {
      this.mainScene.scene.pause('uiscene');
      this.mainScene.scene.launch('winnerscene');
      return;
    }

    // Phase 1 & 2
    this.setUpRoundElfenland();

    // Phase 3: Draw additional Transportation counters
    this.playerManager.readyUpPlayers();
    this.mainScene.scene.launch('drawcountersscene', () => {
      this.mainScene.scene.stop('drawcountersscene');

      // Phase 4: Plan route
      this.playerManager.readyUpPlayers(); // Reinitialize players turn
      this.mainScene.scene.launch('planroutescene', () => {
        this.mainScene.scene.stop('planroutescene');

        // Phase 5: Move Boot
        this.playerManager.readyUpPlayers(); // Reinitialize players turn
        this.mainScene.scene.launch('selectionscene', () => {
          this.mainScene.scene.stop('selectionscene');

          // Phase 6: Finish the Round
          if (this.round < this.numRounds) {
            this.playerManager.readyUpPlayers();
            this.mainScene.scene.launch('roundcleanupscene', () => {
              this.mainScene.scene.stop('roundcleanupscene');
              this.playerManager.setNextStartingPlayer();
              this.round++;
              this.playRoundElfenland();
            });
          } else {
            this.round++;
            this.playRoundElfenland();
          }
        });
      });
    });
  }

  private playRoundElfengold(): void {
    console.log(`Playing Elfengold Round: ${this.round}`);
    // Check to see if we have played enough rounds
    if (this.round > this.numRounds) {
      this.mainScene.scene.launch('winnerscene');
      return;
    }

    this.setUpRoundElfengold();

    // In first round, we skip phase 1 & 2
    if (this.round === 1) {
      // Phase 3: Draw Tokens and Counters
      this.playerManager.readyUpPlayers(); // Reinitialize players turn
      this.mainScene.scene.launch('drawtwocounterscene', () => {
        this.mainScene.scene.stop('drawtwocounterscene');
        // Phase 4: Auction
        this.playerManager.readyUpPlayers(); // Reinitialize players turn
        this.mainScene.scene.launch('auctionscene', () => {
          this.mainScene.scene.stop('auctionscene');

          // Phase 5: Plan the Travel Routes
          this.playerManager.readyUpPlayers(); // Reinitialize players turn
          this.mainScene.scene.launch('planroutescene', () => {
            this.mainScene.scene.stop('planroutescene');

            // Phase 6: Move the Elf Boot
            this.playerManager.readyUpPlayers(); // Reinitialize players turn
            this.mainScene.scene.launch('selectionscene', () => {
              this.mainScene.scene.stop('selectionscene');

              // Phase 7: Finish the Round
              this.playerManager.readyUpPlayers();
              this.mainScene.scene.launch('roundcleanupscene', () => {
                this.mainScene.scene.stop('roundcleanupscene');
                this.playerManager.setNextStartingPlayer();
                this.round++;
                this.playRoundElfengold();
              });
            });
          });
        });
      });
    }

    // In subsequence rounds we go through all phases
    else {
      // Phase 1: Draw Travel Cards
      this.playerManager.readyUpPlayers(); // Reinitialize players turn
      this.mainScene.scene.launch('drawcardssscene', () => {
        this.mainScene.scene.stop('drawcardssscene');

        // Phase 2: Distribute Gold Coins
        // Handled by setUpRoundElfengold()

        // Phase 3: Draw Tokens and Counters
        this.playerManager.readyUpPlayers(); // Reinitialize players turn
        this.mainScene.scene.launch('drawtwocounterscene', () => {
          this.mainScene.scene.stop('drawtwocounterscene');
          // Phase 4: Auction
          this.playerManager.readyUpPlayers(); // Reinitialize players turn
          this.mainScene.scene.launch('auctionscene', () => {
            this.mainScene.scene.stop('auctionscene');

            // Phase 5: Plan the Travel Routes
            this.playerManager.readyUpPlayers(); // Reinitialize players turn
            this.mainScene.scene.launch('planroutescene', () => {
              this.mainScene.scene.stop('planroutescene');

              // Phase 6: Move the Elf Boot
              this.playerManager.readyUpPlayers(); // Reinitialize players turn
              this.mainScene.scene.launch('selectionscene', () => {
                this.mainScene.scene.stop('selectionscene');

                // Phase 7: Finish the Round
                if (this.round < this.numRounds) {
                  this.playerManager.readyUpPlayers();
                  this.mainScene.scene.launch('roundcleanupscene', () => {
                    this.mainScene.scene.stop('roundcleanupscene');
                    this.playerManager.setNextStartingPlayer();
                    this.round++;
                    this.playRoundElfengold();
                  });
                } else {
                  this.round++;
                  this.playRoundElfengold();
                }
              });
            });
          });
        });
      });
    }
  }

  private setUpRoundElfenland(): void {
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

      if (this.round === 1) {
        const tree: Obstacle = this.itemManager.getTreeObstacle();
        player.addItem(tree);
      }

      this.itemManager.flipCounters();
    }
  }

  private setUpRoundElfengold(): void {
    const isFirstRound: boolean = this.round === 1;

    // If firstRound, Deal up to 5 cards and initlaize faceUpPile
    if (isFirstRound) {
      for (const player of this.playerManager.getPlayers()) {
        while (player.getCards().length < 5) {
          const randomCard: CardUnit = this.cardManager.getRandomCard();
          player.addCard(randomCard);
        }
        player.setGold(12);
      }

      // Initialze faceUpPile for subsequence rounds
      for (let i = 0; i < 3; i++) {
        CardManager.getInstance().flipCard();
      }
      CardManager.getInstance().addGoldCardsToPile();
    }

    // If not first round, then only give them gold
    else {
      this.playerManager.getPlayers().forEach(player => {
        player.setGold(player.getGold() + 2);
      });
    }
  }

  private initializePlayers(): void {
    // Get all towns in Array format to initialize player's random secret town
    const allTownsArray = RoadManager.getInstance()
      .getAllTownsAsArray()
      .filter(town => town.getName() !== 'null');

    // Create our players. Imagine we have many to add based on the lobby.
    // Starting town is set to elvenhold.
    const {name} = getUser();

    const session = getSession();

    // Initialize each player from session
    session.users.forEach((user: any) => {
      const player = new Player(
        colorMap[user.preferredColour],
        this.roadManager.getTowns().get('elvenhold')!
      );

      // Set a random secret town to the current player
      const randomIndex = Math.floor(Math.random() * allTownsArray.length);
      const randomTown = allTownsArray[randomIndex];
      allTownsArray.splice(randomIndex, 1);
      player.setSecretTown(randomTown);

      // Add the starting town (elvenhold) to the visitedTowns map of player
      player.addVisitedTown(
        RoadManager.getInstance().getTowns().get('elvenhold')!
      );

      // Add current player
      this.playerManager.addPlayer(player);

      // Set the local player
      if (user.name === name) {
        this.playerManager.setLocalPlayer(player);
      }
    });
  }
}

import {CardUnit} from '../classes/CardUnit';
import {ItemUnit, Obstacle} from '../classes/ItemUnit';
import Player from '../classes/Player';
import {BootColour} from '../enums/BootColour';
import {CardManager} from './CardManager';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';
import Phaser from 'phaser';
import {getSession, getUser} from '../utils/storageUtils';
import {GameVariant} from '../enums/GameVariant';
import SocketManager from './SocketManager';

const colorMap: any = {
  '008000': BootColour.Green,
  '0000FF': BootColour.Blue,
  '800080': BootColour.Purple,
  FF0000: BootColour.Red,
  FFFF00: BootColour.Yellow,
  '000000': BootColour.Black,
};

const phaseMap: any = {
  // Elfenland
  0: ['drawcountersscene', 'planroutescene', 'selectionscene', 'reset'],
  // Elfengold
  1: [
    'drawcardssscene',
    'auctionscene',
    'planroutescene',
    'selectionscene',
    'reset',
  ],
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
  private phase: integer;

  private constructor() {
    // Instantiate all other Singleton Managers
    this.itemManager = ItemManager.getInstance();
    this.cardManager = CardManager.getInstance();
    this.playerManager = PlayerManager.getInstance();
    this.roadManager = RoadManager.getInstance();
    this.initialized = false;

    // hard coded this for now
    this.gameVariant = GameVariant.elfenland;
    this.numRounds = 3;
    this.round = 1;
    this.phase = -1;

    SocketManager.getInstance();
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

  public getNumRounds(): integer {
    return this.numRounds;
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
    this.playRound();
  }

  private playRound(): void {
    console.log(`Playing ${this.gameVariant} Round: ${this.round}`);
    // Check to see if we have played enough rounds
    if (this.round > this.numRounds) {
      this.mainScene.scene.pause('uiscene');
      this.mainScene.scene.launch('winnerscene');
      return;
    }

    // Each round, the host is in charge of the initial state
    if (getUser().name === getSession().gameSession.creator) {
      // Phase 1 & 2
      this.dealCardsAndCounter();
      this.itemManager.flipCounters();

      // Once all cards / items have been distibuted, we send
      // the relevant managers to the other players
      SocketManager.getInstance().emitStatusChange({
        roundSetup: true,
        CardManager: CardManager.getInstance(),
        ItemManager: ItemManager.getInstance(),
        PlayerManager: PlayerManager.getInstance(),
      });
    }

    // We then listen for any incoming messages from the socket
    // to launch the round once we've received the initial state.
    SocketManager.getInstance()
      .getSocket()
      .on('statusChange', () => {
        // The host will broadcast the managers any time a new
        // player joins the game, so once we receive them we set
        // this.initialized to true. That way, we aren't receiving
        // redundant information.
        if (!this.initialized) {
          this.initialized = true;
          // this.nextScene is a recursive function that cycles
          // through the necessary scenes for this.gameVariant.
          // We only need to call it once per round since the rest
          // of the cycle is dealt with via callbacks and recursive
          // calls.
          this.nextScene();
        }
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
      const tree: Obstacle = this.itemManager.getTreeObstacle();
      player.addItem(tree);
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

  // This needs to be an arrow function in order to give access to this.*
  // inside of other classes (i.e. the scenes it's being sent to).
  nextScene = (): void => {
    // If this isn't the first phase, stop the previous scene
    if (this.phase !== -1) {
      this.mainScene.scene.stop(phaseMap[this.gameVariant][this.phase]);
    }
    this.phase++;
    // Reset if the round is over
    if (phaseMap[this.gameVariant][this.phase] === 'reset') {
      // Finish the round
      if (this.round < this.numRounds) {
        // Reinitialize players turn
        this.playerManager.readyUpPlayers();
        // Launch cleanup
        this.mainScene.scene.launch('roundcleanupscene', () => {
          this.mainScene.scene.stop('roundcleanupscene');
          this.playerManager.setNextStartingPlayer();
          this.round++;
          this.phase = -1;
          this.initialized = false;
          this.playRound();
        });
      } else {
        this.round++;
        this.phase = -1;
        this.initialized = false;
        this.playRound();
      }
    } else {
      // If we are in the first phase of the first round of elfengold, skip the first phases
      if (
        this.gameVariant === GameVariant.elfengold &&
        this.round === 1 &&
        this.phase === 0
      ) {
        this.phase = 1;
      }
      // Reinitialize players turn
      this.playerManager.readyUpPlayers();
      // Launch the next scene
      this.mainScene.scene.launch(
        phaseMap[this.gameVariant][this.phase],
        this.nextScene
      );
    }
  };
}

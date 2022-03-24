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
  private socket: any;
  private initialized: boolean;
  private round: integer;

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
    this.round = 0;
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
    const numRounds: integer = 1;

    // Step 3: Play number of rounds
    for (let i = 1; i < numRounds + 1; i++) {
      this.round = i;
      this.playRound(mainScene, i - 1);
    }

    // Step 4: Determine winner
  }

  private playRound(mainScene: Phaser.Scene, pStartingPlayer: integer): void {
    // Phase 1 & 2
    this.dealCardsAndCounter();

    // Initialize session with managers
    if (getUser().name === getSession().gameSession.creator) {
      ItemManager.getInstance().flipCounters();
      this.socket.emit('statusChange', {
        game: 'ElfenlandVer1',
        session_id: getSessionId(),
        data: {
          itemManager: ItemManager.getInstance(),
          cardManager: CardManager.getInstance(),
          playerManager: PlayerManager.getInstance(),
          roadManager: RoadManager.getInstance(),
        },
      });
      this.socket.on('chat', () => {
        this.socket.emit('statusChange', {
          game: 'ElfenlandVer1',
          session_id: getSessionId(),
          data: {
            itemManager: ItemManager.getInstance(),
            cardManager: CardManager.getInstance(),
            playerManager: PlayerManager.getInstance(),
            roadManager: RoadManager.getInstance(),
          },
        });
      });
    }
    this.socket.on('statusChange', (data: any) => {
      if (!this.initialized) {
        const managers = data.msg.data;

        // ItemManager.getInstance().update(managers.itemManager);
        this.initialized = true;

        PlayerManager.getInstance().setCurrentPlayerIndex(pStartingPlayer);
        // Phase 3: Draw additional Transportation counters
        mainScene.scene.launch('drawcountersscene', () => {
          mainScene.scene.stop('drawcountersscene');

          PlayerManager.getInstance().setCurrentPlayerIndex(pStartingPlayer);
          // Phase 4: Plan route
          mainScene.scene.launch('planroutescene', () => {
            mainScene.scene.stop('planroutescene');

            // Reinitialize players turn
            PlayerManager.getInstance()
              .getPlayers()
              .forEach(player => player.setPassedTurn(false));

            PlayerManager.getInstance().setCurrentPlayerIndex(pStartingPlayer);

            // Phase 5: Move Boot
            mainScene.scene.launch('selectionscene', () => {
              mainScene.scene.stop('selectionscene');

              // Create text to notify whose turn it is using boot color substring
              const playerText: Phaser.GameObjects.Text = mainScene.add
                .text(10, 5, 'GAMEOVER', {
                  fontFamily: 'MedievalSharp',
                  fontSize: '50px',
                })
                .setColor('white');

              // Grab width of text to determine size of panel behind
              const textWidth: number = playerText.width;

              // Create brown ui panel element relative to the size of the text
              const brownPanel: Phaser.GameObjects.RenderTexture = mainScene.add
                .nineslice(0, 0, textWidth + 20, 60, 'brown-panel', 24)
                .setOrigin(0, 0);

              // Grab width of current game to center our container
              const gameWidth: number = mainScene.scale.width;

              // Initialize container to group elements
              // Need to center the container relative to the gameWidth and the size of the text box
              const container: Phaser.GameObjects.Container =
                mainScene.add.container(
                  gameWidth / 2 - brownPanel.width / 2,
                  20
                );

              // Render the brown panel and text
              container.add(brownPanel).setDepth(3);
              container.add(playerText).setDepth(3);
            });
          });
        });
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

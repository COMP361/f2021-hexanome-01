import Phaser from 'phaser';
import CardInventory from '../classes/CardInventory';
import CheatSheetMenu from '../classes/CheatSheetMenu';
import eventsCenter from '../classes/EventsCenter';
import ItemInventory from '../classes/ItemInventory';
import {ItemUnit} from '../classes/ItemUnit';
import Player from '../classes/Player';
import PlayerIcon from '../classes/PlayerIcon';
import SettingsMenu from '../classes/SettingsMenu';
import Town from '../classes/Town';
import GameManager from '../managers/GameManager';
import PlayerManager from '../managers/PlayerManager';
import RoadManager from '../managers/RoadManager';

export default class UIScene extends Phaser.Scene {
  private width = 0;
  private height = 0;
  private menuButtons: Array<any> = [];
  private inventoryOpen = true;
  private inventories: Array<any> = [];
  public static itemSprites: Array<Phaser.GameObjects.Sprite>;
  public static cardSprites: Array<Phaser.GameObjects.Sprite>;
  public static itemSpritesOnEdges: Array<Phaser.GameObjects.Sprite>;

  constructor() {
    super('uiscene');
  }

  // Default functon that is called when the Phaser Scene is launched.
  create() {
    this.width = this.scale.width; // Initialize our global variable based on the scene width
    this.height = this.scale.height; // Initialize our global variable based on the scene height

    // Render all of the UI elements
    this.createBoard();
    this.createPlayerIcons();
    this.createPlayerTurnBanner();
    this.createCheatSheetMenu();
    this.createSettingsMenu();
    this.createTownPieceToggle();
    this.createDestinationTownBanner();
    this.renderEdges();
    this.renderBoots();
    this.createPlayerInventory();
  }

  public static getResponsivePosition(
    scene: Phaser.Scene,
    xPos: number,
    yPos: number
  ) {
    const x = (xPos / 1600) * scene.cameras.main.width;
    const y = (yPos / 750) * scene.cameras.main.height;
    return [x, y];
  }

  // Renders the background, board, and map.
  private createBoard(): void {
    // Send UIScene to back so that UI can sit on top.
    this.scene.sendToBack();

    // Create light brown background
    this.add
      .image(0, 0, 'brownBackground')
      .setOrigin(0, 0)
      .setDisplaySize(this.width, this.height);

    // Create map
    const map = this.add
      .image(this.width / 2, this.height / 2, 'map')
      .setDisplaySize(this.width * 0.6, this.height * 0.7)
      .setDepth(2);

    // Create dark brown board to go under map
    const brownPanel = this.add.nineslice(
      map.getTopLeft().x,
      map.getTopLeft().y,
      map.displayWidth,
      map.displayHeight,
      'brown-panel',
      24
    );
    brownPanel.setDepth(1);

    // Create Round Card

    // Get current round
    const currentRoundNumber: number = GameManager.getInstance().getRound();

    // Render card based on the position of the map and current round
    this.add
      .sprite(
        map.getTopRight().x - 90,
        map.getTopRight().y + 85,
        `R${currentRoundNumber}`
      )
      .setDepth(3)
      .setScale(0.165);
  }

  // Renders the Player icons on the left.
  private createPlayerIcons(): void {
    const players: Array<Player> = PlayerManager.getInstance().getPlayers();

    // For rendering purposes, we want to display all counters face up for local player
    const localPlayer: Player = PlayerManager.getInstance().getLocalPlayer();

    for (let i = 0; i < players.length; i++) {
      const icon: PlayerIcon = new PlayerIcon(
        this,
        this.width / 7,
        this.height / 4 + 70 * i,
        players[i].getBootColour(),
        players[i].getScore()
      );
      const items: Array<ItemUnit> = players[i].getItems();
      for (let j = 0; j < items.length; j++) {
        if (items[j].getHidden() && players[i] !== localPlayer) {
          icon.addItem('unknown-counter');
        } else {
          icon.addItem(items[j].getName());
        }
      }
    }
  }

  // Renders the Player Boots across the map.
  private renderBoots(): void {
    let xOffset: integer = 0;

    // Loop through players and render their boots based on current Town.
    PlayerManager.getInstance()
      .getPlayers()
      .forEach(player => {
        const pos = UIScene.getResponsivePosition(
          this,
          player.getCurrentLocation().getXposition(),
          player.getCurrentLocation().getYposition()
        );
        this.add
          .sprite(pos[0] + xOffset, pos[1], player.getBootColour())
          .setDepth(3)
          .setScale(0.15);
        xOffset += 10;
      });
  }

  // Displays whose turn is it.
  private createPlayerTurnBanner(): void {
    // Get the currentPlayer because it is their turn
    const currentPlayer: Player =
      PlayerManager.getInstance().getCurrentPlayer();

    // Extract substring of boot color from boot enum
    const bootString: string = currentPlayer
      .getBootColour()
      .slice(0, currentPlayer.getBootColour().indexOf('-'));

    // Create text to notify whose turn it is using boot color substring
    const playerText: Phaser.GameObjects.Text = this.add
      .text(10, 5, `${bootString.toUpperCase()}`, {
        fontFamily: 'MedievalSharp',
        fontSize: '50px',
      })
      .setColor(`${bootString.toLowerCase()}`);

    // Grab width of text to determine size of panel behind
    const textWidth: number = playerText.width;

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, textWidth + 20, 60, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Grab width of current game to center our container
    const gameWidth: number = this.width;

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      20
    );

    // Render the brown panel and text
    container.add(brownPanel).setDepth(3);
    container.add(playerText).setDepth(3);
  }

  // Creates the Elfenroads cheat sheet card/menu on the top right.
  private createCheatSheetMenu(): void {
    // Create menu that will slide out after clicking question mark button
    const cheatSheetMenu = new CheatSheetMenu(this);

    // Add menu object to button object array
    this.menuButtons.push(cheatSheetMenu);

    // Create question mark button
    const cheatsheetButton = this.add.sprite(this.width - 80, 30, 'brown-box');
    this.add
      .image(cheatsheetButton.x, cheatsheetButton.y, 'question')
      .setScale(0.7);

    // Add interactivity (display image when hover over) for cheatsheetButton
    cheatsheetButton
      .setInteractive()
      .on('pointerdown', () => {
        cheatsheetButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        cheatsheetButton.clearTint();
      })
      .on('pointerup', () => {
        cheatsheetButton.clearTint();
        if (cheatSheetMenu.isOpen) {
          cheatSheetMenu.hide();
        } else {
          this.menuButtons.forEach(m => {
            m.hide();
          });
          cheatSheetMenu.show();
        }
      });
  }

  // Creates the settings menu on the top right.
  private createSettingsMenu(): void {
    // Create menu that will slide out after clicking settingsButton
    const settingsMenu = new SettingsMenu(this);

    // Add menu object to button object array
    this.menuButtons.push(settingsMenu);

    // Create settingsButton (gear icon)
    const settingsButton = this.add.sprite(this.width - 30, 30, 'brown-box');
    this.add.image(settingsButton.x, settingsButton.y, 'gear').setScale(0.7);

    // Add interactive pointer options for settingsButton
    settingsButton
      .setInteractive()
      .on('pointerdown', () => {
        settingsButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        settingsButton.clearTint();
      })
      .on('pointerup', () => {
        settingsButton.clearTint();
        if (settingsMenu.isOpen) {
          settingsMenu.hide();
        } else {
          this.menuButtons.forEach(m => {
            m.hide();
          });
          settingsMenu.show();
        }
      });
  }

  // Displays Player's current acquired town pieces.
  private createTownPieceToggle(): void {
    /* toggles town piece visibility */
    const townPieceButton = this.add.sprite(this.width - 130, 30, 'brown-box');
    this.add
      .image(townPieceButton.x, townPieceButton.y, 'information')
      .setScale(0.7);

    // Add interactivity
    townPieceButton
      .setInteractive()
      .on('pointerdown', () => {
        townPieceButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        townPieceButton.clearTint();
      })
      .on('pointerup', () => {
        townPieceButton.clearTint();
        eventsCenter.emit('update-town-piece-vis', true);
      });
  }

  // Displays the local Player's secret town.
  private createDestinationTownBanner(): void {
    // Get local player's destination town name
    const destinationTownName = PlayerManager.getInstance()
      .getLocalPlayer()
      .getDestinationTown()
      .getName();

    // Create the name of the local player's destination town
    const destText: Phaser.GameObjects.Text = this.add.text(
      10,
      10,
      `${destinationTownName}`,
      {
        fontFamily: 'MedievalSharp',
        fontSize: '24px',
      }
    );

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, destText.width + 20, 30, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Create Phaser container to render the text and brown panel
    const container: Phaser.GameObjects.Container = this.add.container(
      this.width - 360,
      8
    );

    // Add the text and brown panel to container to be displayed
    container.add(brownPanel);
    container.add(destText);
  }

  // Renders the current Counters/Items on each edge.
  private renderEdges(): void {
    UIScene.itemSpritesOnEdges = [];

    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        const pos = UIScene.getResponsivePosition(
          this,
          edge.getPosition()[0],
          edge.getPosition()[1]
        );
        let xOffset = 0;
        edge.getItems().forEach(item => {
          // Render sprite to this Phaser Scene and offset based on the other Items
          const itemSprite = this.add
            .sprite(pos[0] + xOffset, pos[1], item.getName())
            .setData(item)
            .setData({currentEdge: edge, mainScene: this})
            .setScale(0.25)
            .setDepth(4);
          UIScene.itemSpritesOnEdges.push(itemSprite);
          xOffset += 30;
        });
      });
  }

  // Displays the local Player's current inventory.
  private createPlayerInventory(): void {
    // Create our ItemInventory.
    const itemInventory = new ItemInventory(this);

    this.inventories.push(itemInventory);

    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const localPlayer = PlayerManager.getInstance().getLocalPlayer();
    const playerItems = localPlayer.getItems();

    // display all the Items on screen
    playerItems.forEach(item => {
      itemInventory.renderItem(item);
    });

    UIScene.itemSprites = itemInventory.getSprites();

    // Create our CardInventory.
    const cardInventory = new CardInventory(this);

    this.inventories.push(cardInventory);

    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const playerCards = localPlayer.getCards();

    // display all the cards on screen
    playerCards.forEach(card => {
      cardInventory.renderCard(card.getName());
    });

    UIScene.cardSprites = cardInventory.getSprites();

    const {height} = this.scale;

    // Create Inventory button at bottom left corner to toggle all types of inventories.
    const inventoryButton = this.add.sprite(30, height - 30, 'brown-box');
    this.add
      .image(inventoryButton.x, inventoryButton.y, 'open-box')
      .setScale(0.7);

    inventoryButton
      .setInteractive()
      .on('pointerdown', () => {
        inventoryButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        inventoryButton.clearTint();
      })
      .on('pointerup', () => {
        inventoryButton.clearTint();
        if (this.inventoryOpen) {
          this.inventoryOpen = false;
          this.inventories.forEach(inventory => {
            inventory.hide();
          });
        } else {
          this.inventoryOpen = true;
          this.inventories.forEach(inventory => {
            inventory.show();
          });
        }
      });
  }
}

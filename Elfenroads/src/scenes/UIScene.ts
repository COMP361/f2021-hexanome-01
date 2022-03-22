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
  private menuButtons: Array<any>;
  private inventoryOpen = true;
  private inventories: Array<any> = [];
  public static itemSprites: Array<Phaser.GameObjects.Sprite> = [];
  public static cardSprites: Array<Phaser.GameObjects.Sprite> = [];

  constructor() {
    super('uiscene');
    this.menuButtons = [];
  }

  create() {
    this.createBoard();
    this.createPlayerIcons();
    this.createPlayerTurnBanner();
    this.createCheatSheetMenu();
    this.createSettingsMenu();
    this.createTownPieceToggle();
    this.createDestinationTownBanner();
    this.renderEdges();
    this.createPlayerInventory();
  }

  private createBoard(): void {
    // Send UIScene to back so that UI can sit on top.
    this.scene.sendToBack();

    // Create light brown background
    const background = this.add.image(0, 0, 'brownBackground').setOrigin(0, 0);
    background.displayWidth = this.sys.canvas.width;
    background.displayHeight = this.sys.canvas.height;

    // Create map
    const map = this.add
      .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map')
      .setDisplaySize(
        this.cameras.main.width * 0.6,
        this.cameras.main.height * 0.7
      )
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

  private createPlayerIcons(): void {
    const players: Array<Player> = PlayerManager.getInstance().getPlayers();
    let bootX = 0;

    // For rendering purposes, we want to display all counters face up for local player
    const localPlayer: Player = PlayerManager.getInstance().getLocalPlayer();

    for (let i = 0; i < players.length; i++) {
      const icon: PlayerIcon = new PlayerIcon(
        this,
        this.cameras.main.width / 7,
        this.cameras.main.height / 4 + 70 * i,
        players[i].getBootColour()
      );
      const items: Array<ItemUnit> = players[i].getItems();
      for (let j = 0; j < items.length; j++) {
        if (items[j].getHidden() && players[i] !== localPlayer) {
          icon.addItem('unknown-counter');
        } else {
          icon.addItem(items[j].getName());
        }
      }
      if (players[i] !== localPlayer) {
        icon.addBootImg(
          (players[i].getCurrentLocation().getXposition() / 1600) *
            this.cameras.main.width +
            bootX,
          (players[i].getCurrentLocation().getYposition() / 750) *
            this.cameras.main.height,
          this.cameras.main.width * 0.04,
          this.cameras.main.height * 0.08
        );
      }
      bootX += 15;
    }
  }

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
    const gameWidth: number = this.cameras.main.width;

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

  // Method to create elfenroads cheat sheet card/menu
  private createCheatSheetMenu(): void {
    const width = this.cameras.main.width;
    // Create menu that will slide out after clicking question mark button
    const cheatSheetMenu = new CheatSheetMenu(this);

    // Add menu object to button object array
    this.menuButtons.push(cheatSheetMenu);

    // Create question mark button
    const cheatsheetButton = this.add.sprite(width - 80, 30, 'brown-box');
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

  // Method to create Settings menu
  private createSettingsMenu(): void {
    // Create menu that will slide out after clicking settingsButton
    const settingsMenu = new SettingsMenu(this);

    // Add menu object to button object array
    this.menuButtons.push(settingsMenu);

    // Create settingsButton (gear icon)
    const width = this.cameras.main.width;
    const settingsButton = this.add.sprite(width - 30, 30, 'brown-box');
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

  private createTownPieceToggle(): void {
    const {width} = this.scale;
    /* toggles town piece visibility */
    const townPieceButton = this.add.sprite(width - 130, 30, 'brown-box');
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
        eventsCenter.emit('update-town-piece-vis', true);
      });
  }

  private createDestinationTownBanner(): void {
    const {width} = this.scale;
    const towns = Array.from(Town.getAllTowns().keys());
    const town = towns[Math.floor(Math.random() * towns.length)];
    /*destination town*/
    const destText: Phaser.GameObjects.Text = this.add.text(6, 10, `${town}`, {
      fontFamily: 'MedievalSharp',
      fontSize: '24px',
    });

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, destText.width + 20, 30, 'brown-panel', 24)
      .setOrigin(0, 0);

    const container: Phaser.GameObjects.Container = this.add.container(
      width - 360,
      8
    );

    container.add(brownPanel);
    container.add(destText);
  }

  private renderEdges(): void {
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        const x = (edge.getPosition()[0] / 1600) * this.cameras.main.width;
        const y = (edge.getPosition()[1] / 750) * this.cameras.main.height;
        let xOffset = 0;
        edge.getItems().forEach(item => {
          // If item is in map add it to Phaser container
          if (item) {
            // Render sprite to this Phaser Scene and offset based on the other Items
            this.add
              .sprite(x + xOffset, y, item.getName())
              .setData(item)
              .setScale(0.25)
              .setDepth(3);
          }
          xOffset += 30;
        });
      });
  }

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

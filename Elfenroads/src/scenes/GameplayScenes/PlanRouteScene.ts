import {GameObjects} from 'phaser';
import Edge from '../../classes/Edge';
import {
  Counter,
  GoldPiece,
  ItemUnit,
  Obstacle,
  Spell,
} from '../../classes/ItemUnit';
import {SpellType} from '../../enums/SpellType';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import UIScene from '../UIScene';

export default class PlanRouteScene extends Phaser.Scene {
  selectedItemSprite!: Phaser.GameObjects.Sprite;
  selectedItem: ItemUnit | null = null;
  selectedDoubleItem: ItemUnit | null = null;
  selectedDoubleItemSprite!: Phaser.GameObjects.Sprite;
  cancelButton!: Phaser.GameObjects.Container;
  exchangeItemSprites!: Array<Phaser.GameObjects.Sprite>;
  checkmarkSprites!: Array<Phaser.GameObjects.Sprite>;
  edgeSprites!: Array<Phaser.GameObjects.Sprite>;
  cb: any;

  constructor() {
    super('planroutescene');
    this.exchangeItemSprites = [];
    this.checkmarkSprites = [];
    this.edgeSprites = UIScene.itemSpritesOnEdges;
  }

  create(cb: any) {
    this.cb = cb;
    // Create text to notify that it is draw counter phase

    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Plan Route',
      {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
      }
    );

    const gameWidth: number = this.cameras.main.width;
    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, drawCounterText.width + 20, 40, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      90
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(drawCounterText);

    /**
     * SHOWCASE FOR CHANGING PLAYER TURN
     */
    // Create small button with the "next" icon
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const passTurnButton = this.add.sprite(
      width - 30,
      height - 30,
      'brown-box'
    );
    this.add.image(passTurnButton.x, passTurnButton.y, 'next').setScale(0.7);

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
        this.sound.play('pass');
        PlayerManager.getInstance().getCurrentPlayer().setPassedTurn(true);
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('uiscene').scene.restart();
        let finishedPlayers: integer = 0;
        PlayerManager.getInstance()
          .getPlayers()
          .forEach(player => {
            if (player.getPassedTurn() === true) {
              finishedPlayers++;
            }
          });

        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          this.cb();
        } else {
          this.scene.restart();
        }
      });

    this.planRoute();
  }

  goldOrObsExist(items: Array<ItemUnit>) {
    for (const item of items) {
      if (item instanceof GoldPiece || item instanceof Obstacle) {
        return true;
      }
    }
    return false;
  }

  isItemValid(edge: Edge) {
    if (this.selectedItem) {
      return (
        // exchange does not place items
        this.selectedItem.getName() !== SpellType.Exchange &&
        // an edge can either have a gold piece or obstacle not both
        (((this.selectedItem instanceof GoldPiece ||
          this.selectedItem instanceof Obstacle) &&
          !this.goldOrObsExist(edge.getItems())) ||
          (!(this.selectedItem instanceof GoldPiece) &&
            !(this.selectedItem instanceof Obstacle))) &&
        // check if item can be placed in region
        this.selectedItem.getAllowedEdges().includes(edge.getType()) &&
        // if item needs transportation counter, check wether we have it on the edge vise versa
        ((edge.getItems().length === 0 &&
          !this.selectedItem.getNeedsCounter()) ||
          (this.selectedItem.getNeedsCounter() && edge.getItems().length >= 1))
      );
    }
    return false;
  }

  drawAllowedEdges(graphics: any, zoneRadius: number) {
    graphics.lineStyle(8, 0x8a6440, 0.7);
    // highlight every draggable counter
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        if (this.isItemValid(edge)) {
          const pos = UIScene.getResponsivePosition(
            this,
            edge.getPosition()[0],
            edge.getPosition()[1]
          );
          graphics.strokeCircle(pos[0], pos[1], zoneRadius / 3);
        }
      });
  }

  resetSpell() {
    this.selectedItem = null;
    this.selectedDoubleItem = null;
    this.exchangeItemSprites = [];
    this.cancelButton.setVisible(false);
    this.checkmarkSprites.forEach(checkmark => {
      checkmark.destroy();
    });
    this.checkmarkSprites = [];
  }

  disableItems() {
    const itemSprites = UIScene.itemSprites;
    itemSprites.forEach(itemSprite => {
      const item = itemSprite.getData('item');
      // only set counters interactive when using double and
      // disable all counters when using exchange
      if (
        this.selectedItem &&
        ((!(item instanceof Counter) &&
          this.selectedItem.getName() === SpellType.Double) ||
          this.selectedItem.getName() === SpellType.Exchange)
      ) {
        itemSprite.removeInteractive();
      }
    });
  }

  confirmExchangeItem(itemSprite: Phaser.GameObjects.Sprite) {
    // only transportations counter can be exchanged
    const item = itemSprite.getData('item');
    if (item instanceof Counter) {
      const checkmark = this.add
        .sprite(itemSprite.x, itemSprite.y, 'checkmark')
        .setScale(0.7);
      this.checkmarkSprites.push(checkmark);
      this.exchangeItemSprites.push(itemSprite);

      // swap when the second counter is selected
      if (this.exchangeItemSprites.length === 2) {
        const item1 = this.exchangeItemSprites[0].getData('item');
        const item2 = this.exchangeItemSprites[1].getData('item');
        const edge1 = this.exchangeItemSprites[0].getData('currentEdge');
        const edge2 = this.exchangeItemSprites[1].getData('currentEdge');
        // prevent swaps with the same counter or on the same edge
        if (item1.getName() !== item2.getName() && edge1 !== edge2) {
          edge1.removeItem(item1);
          edge1.addItem(item2);
          edge2.removeItem(item2);
          edge2.addItem(item1);
          const currPlayer = PlayerManager.getInstance().getCurrentPlayer();
          if (this.selectedItem) {
            currPlayer.removeItem(this.selectedItem);
            this.selectedItemSprite.destroy();
          }
          this.resetSpell();

          PlayerManager.getInstance().setNextPlayer();
          this.scene.get('uiscene').scene.restart();
        } else {
          this.exchangeItemSprites.splice(1, 1);
          this.checkmarkSprites[1].destroy();
          this.checkmarkSprites.splice(1, 1);
        }
      }
    }
  }

  initializeExchange() {
    this.edgeSprites = UIScene.itemSpritesOnEdges;
    if (this.edgeSprites) {
      this.edgeSprites.forEach(itemSprite => {
        itemSprite
          .setInteractive()
          .on('pointerdown', () => {
            itemSprite.setTint(0xd3d3d3);
          })
          .on('pointerout', () => {
            itemSprite.clearTint();
          })
          .on('pointerup', () => {
            this.confirmExchangeItem(itemSprite);
          });
      });
    }
  }

  selectItem(
    item: Phaser.GameObjects.Sprite,
    zoneRadius: number,
    graphics: GameObjects.Graphics
  ) {
    item.clearTint();
    graphics.clear();
    const playerItem = item.getData('item');
    // check wether we are in the double spell state
    if (
      this.selectedItem &&
      this.selectedItem.getName() === SpellType.Double &&
      playerItem instanceof Counter
    ) {
      this.selectedDoubleItem = playerItem;
      this.selectedDoubleItemSprite = item;
      this.drawAllowedEdges(graphics, zoneRadius);
    } else {
      // normal state goes here
      this.selectedItem = playerItem;
      this.selectedItemSprite = item;
      // go to spell state
      if (this.selectedItem instanceof Spell && !this.cancelButton.visible) {
        this.cancelButton.setVisible(true);
        this.disableItems();
        if (this.selectedItem.getName() === SpellType.Exchange) {
          this.initializeExchange();
        }
      } else {
        // normal state
        this.cancelButton.setVisible(false);
        this.drawAllowedEdges(graphics, zoneRadius);
      }
    }
  }

  placeItem(edge: Edge, graphics: GameObjects.Graphics) {
    if (this.selectedItem) {
      if (this.isItemValid(edge)) {
        const currPlayer = PlayerManager.getInstance().getCurrentPlayer();
        if (this.selectedItem.getName() === SpellType.Double) {
          // can only be placed if we selected the double item
          if (this.selectedDoubleItem) {
            // prevent placing second if we have the same
            for (const item of edge.getItems()) {
              if (item.getName() === this.selectedDoubleItem.getName()) {
                return;
              }
            }
            edge.addItem(this.selectedDoubleItem);
            currPlayer.removeItem(this.selectedDoubleItem);
            this.selectedDoubleItemSprite.destroy();
            this.cancelButton.setVisible(false);
            currPlayer.removeItem(this.selectedItem);
            this.selectedItemSprite.destroy();
          } else {
            return;
          }
        } else {
          // normal counters
          edge.addItem(this.selectedItem);
          currPlayer.removeItem(this.selectedItem);
          this.selectedItemSprite.destroy();
        }
        this.resetSpell();
        this.checkmarkSprites.forEach(checkmark => {
          checkmark.destroy();
        });
        this.sound.play('place');
        graphics.clear();
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('uiscene').scene.restart();
      }
    }
  }

  // cancel button for spells
  createCancelButton(graphics: GameObjects.Graphics) {
    const container = this.add.container(
      this.scale.width / 2,
      this.scale.height - 60
    );
    const spellText = this.add
      .text(10, 10, 'Cancel Spell', {
        fontFamily: 'MedievalSharp',
        fontSize: '24px',
        color: 'white',
      })
      .setDepth(5);
    const cancelButton = this.add.nineslice(
      0,
      0,
      spellText.width + 20,
      30,
      'brown-panel',
      24
    );
    container.add(cancelButton);
    container.add(spellText);
    container.setVisible(false);
    cancelButton
      .setInteractive()
      .on('pointerdown', () => {
        cancelButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        cancelButton.clearTint();
      })
      .on('pointerup', () => {
        cancelButton.clearTint();
        // set all the items in the inventory interactive
        UIScene.itemSprites.forEach(sprite => {
          sprite.setInteractive();
        });
        // disable interactive items on edges
        if (
          this.selectedItem &&
          this.selectedItem.getName() === SpellType.Exchange
        ) {
          this.edgeSprites.forEach(sprite => {
            sprite.removeInteractive();
          });
        }
        this.resetSpell();
        graphics.clear();
      });
    return container;
  }

  planRoute() {
    const graphics = this.add.graphics();
    const zoneRadius = UIScene.getResponsivePosition(this, 30, 30)[0];
    this.cancelButton = this.createCancelButton(graphics);
    // creating all the dropzones for counters
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        const pos = UIScene.getResponsivePosition(
          this,
          edge.getPosition()[0],
          edge.getPosition()[1]
        );
        this.add
          .zone(pos[0], pos[1], 10, 10)
          .setData(edge)
          .setInteractive()
          .on('pointerup', () => {
            this.placeItem(edge, graphics);
          });
      });

    // make items draggable
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      UIScene.itemSprites.forEach(item => {
        item
          .setInteractive()
          .on('pointerdown', () => {
            item.setTint(0xd3d3d3);
          })
          .on('pointerout', () => {
            item.clearTint();
          })
          .on('pointerup', () => {
            this.selectItem(item, zoneRadius, graphics);
          });
      });
    }
  }
}

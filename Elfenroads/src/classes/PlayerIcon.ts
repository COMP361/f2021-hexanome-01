import Phaser from 'phaser';
import {BootColour} from '../enums/BootColour';

// helper class for getting the right image
export class ImgStore {
  private actorStore: Map<BootColour, string> = new Map();
  private panelStore: Map<BootColour, string> = new Map();

  private constructor() {
    // set up actor image store
    this.actorStore.set(BootColour.Black, 'black-actor');
    this.actorStore.set(BootColour.Blue, 'blue-actor');
    this.actorStore.set(BootColour.Green, 'green-actor');
    this.actorStore.set(BootColour.Red, 'red-actor');
    this.actorStore.set(BootColour.Yellow, 'yellow-actor');
    this.actorStore.set(BootColour.Purple, 'purple-actor');
    // set up panel image store
    this.panelStore.set(BootColour.Black, 'black-panel');
    this.panelStore.set(BootColour.Blue, 'blue-panel');
    this.panelStore.set(BootColour.Green, 'green-panel');
    this.panelStore.set(BootColour.Red, 'red-panel');
    this.panelStore.set(BootColour.Yellow, 'yellow-panel');
    this.panelStore.set(BootColour.Purple, 'purple-panel');
  }

  public static instance(): ImgStore {
    return new ImgStore();
  }

  public getActor(c: BootColour) {
    return String(this.actorStore.get(c));
  }

  public getPanel(c: BootColour) {
    return String(this.panelStore.get(c));
  }
}

export default class PlayerIcon {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private xpos: number;
  private ypos: number;
  private panel: Phaser.GameObjects.RenderTexture;
  private numItems: number;
  private color: BootColour;
  private isCurrentPlayer: boolean;
  private score: number;
  private gold: number;
  private isElfengold: boolean;

  public constructor(
    scene: Phaser.Scene,
    xpos: number,
    ypos: number,
    color: BootColour,
    isCurrentPlayer: boolean,
    score: number,
    gold: number,
    isElfengold: boolean
  ) {
    this.scene = scene;
    this.xpos = xpos;
    this.ypos = ypos;
    this.numItems = 0;
    this.color = color;
    this.isCurrentPlayer = isCurrentPlayer;
    this.score = score;
    this.gold = gold;
    this.isElfengold = isElfengold;

    const store: ImgStore = ImgStore.instance();

    /* add playerIcon */
    const playerIcon: Phaser.GameObjects.Sprite = this.scene.add
      .sprite(this.xpos, this.ypos, store.getActor(this.color))
      .setDepth(3)
      .setScale(0.3);

    this.panel = this.scene.add
      .nineslice(0, 0, 120, 60, store.getPanel(this.color), 24)
      .setOrigin(0, 0);

    this.container = this.scene.add
      .container(this.xpos + 30, this.ypos - 30)
      .setDepth(3)
      .add(this.panel)
      .setVisible(false);

    const scoreContainer: Phaser.GameObjects.Container =
      this.renderScore().setVisible(false);

    // Only create the gold container if game variant is isElfengold
    let goldContainer: Phaser.GameObjects.Container;
    if (isElfengold) {
      goldContainer = this.renderGold().setVisible(false);
    }

    // If this icon is the current player, then render the bouncing pointer
    this.isCurrentPlayer && this.renderPointer(playerIcon.getLeftCenter().x);

    playerIcon
      .setInteractive()
      .on('pointerdown', () => {
        playerIcon.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        playerIcon.clearTint();
      })
      .on('pointerup', () => {
        playerIcon.clearTint();
        scoreContainer.setVisible(!scoreContainer.visible);
        this.container.setVisible(!this.container.visible);
        this.isElfengold && goldContainer.setVisible(!goldContainer.visible);
      });
  }

  // Show player current score
  private renderScore(): Phaser.GameObjects.Container {
    const scoreContainer = this.scene.add.container(
      this.xpos - 39,
      this.ypos - 13
    );
    const greyPanel: Phaser.GameObjects.Sprite = this.scene.add.sprite(
      0,
      0,
      'grey-slider'
    );

    scoreContainer.add(greyPanel);

    const scoreText = this.scene.add
      .text(
        greyPanel.getCenter().x - 3,
        greyPanel.getCenter().y - 1,
        `${this.score}`,
        {
          fontFamily: 'MedievalSharp',
          fontSize: '19px',
          color: 'black',
        }
      )
      .setOrigin(0.5, 0.5);

    scoreContainer.add(scoreText);

    return scoreContainer;
  }

  // Show player current gold amount
  private renderGold(): Phaser.GameObjects.Container {
    const goldAmountContainer = this.scene.add.container(
      this.xpos - 39,
      this.ypos + 16
    );
    const yellowPanel: Phaser.GameObjects.Sprite = this.scene.add.sprite(
      0,
      0,
      'yellow-slider'
    );

    goldAmountContainer.add(yellowPanel);

    const goldAmountText = this.scene.add
      .text(
        yellowPanel.getCenter().x - 3,
        yellowPanel.getCenter().y - 1,
        `${this.gold}`,
        {
          fontFamily: 'MedievalSharp',
          fontSize: '19px',
          color: 'black',
        }
      )
      .setOrigin(0.5, 0.5);

    goldAmountContainer.add(goldAmountText);

    return goldAmountContainer;
  }

  // Create the bouncing pointer inidicator using the relative position of the icon
  private renderPointer(xEdge: number): void {
    const image = this.scene.add
      .image(xEdge - 20, this.ypos, 'brown-gauntlet')
      .setFlipX(true);

    image.rotation = 0.79;

    this.scene.tweens.add({
      targets: image,
      x: this.xpos - 70,
      duration: 600,
      ease: 'Power1',
      yoyo: true,
      repeat: Infinity,
    });
  }

  public addItem(img: string): void {
    const item: Phaser.GameObjects.Sprite = this.scene.add
      .sprite(5 + this.numItems * 60, 5, img)
      .setOrigin(0, 0);
    item.setScale(0.3);
    this.numItems++;
    this.panel.setSize(60 * this.numItems, 60);
    this.container.add(item);
  }
}

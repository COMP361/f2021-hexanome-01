import Phaser from 'phaser';
import {BootColour} from '../enums/BootColour';
import eventsCenter from './EventsCenter';

// helper class for getting the right image
class ImgStore {
  private actorStore: Map<BootColour, string> = new Map();
  private bootStore: Map<BootColour, string> = new Map();
  private panelStore: Map<BootColour, string> = new Map();
  private circleStore: Map<BootColour, string> = new Map();
  private constructor() {
    // set up actor image store
    this.actorStore.set(BootColour.Black, 'black-actor');
    this.actorStore.set(BootColour.Blue, 'blue-actor');
    this.actorStore.set(BootColour.Green, 'green-actor');
    this.actorStore.set(BootColour.Red, 'red-actor');
    this.actorStore.set(BootColour.Yellow, 'yellow-actor');
    this.actorStore.set(BootColour.Purple, 'purple-actor');
    // set up boot image store
    this.bootStore.set(BootColour.Black, 'black-boot');
    this.bootStore.set(BootColour.Blue, 'blue-boot');
    this.bootStore.set(BootColour.Green, 'green-boot');
    this.bootStore.set(BootColour.Red, 'red-boot');
    this.bootStore.set(BootColour.Yellow, 'yellow-boot');
    this.bootStore.set(BootColour.Purple, 'purple-boot');
    // set up panel image store
    this.panelStore.set(BootColour.Black, 'black-panel');
    this.panelStore.set(BootColour.Blue, 'blue-panel');
    this.panelStore.set(BootColour.Green, 'green-panel');
    this.panelStore.set(BootColour.Red, 'red-panel');
    this.panelStore.set(BootColour.Yellow, 'yellow-panel');
    this.panelStore.set(BootColour.Purple, 'purple-panel');
    // set up circle image store
    this.circleStore.set(BootColour.Black, 'black-circle');
    this.circleStore.set(BootColour.Blue, 'blue-circle');
    this.circleStore.set(BootColour.Green, 'green-circle');
    this.circleStore.set(BootColour.Red, 'red-circle');
    this.circleStore.set(BootColour.Yellow, 'yellow-circle');
    this.circleStore.set(BootColour.Purple, 'purple-circle');
  }

  public static instance(): ImgStore {
    return new ImgStore();
  }

  public getActor(c: BootColour) {
    return String(this.actorStore.get(c));
  }

  public getBoot(c: BootColour) {
    return String(this.bootStore.get(c));
  }

  public getPanel(c: BootColour) {
    return String(this.panelStore.get(c));
  }

  public getCircle(c: BootColour) {
    return String(this.circleStore.get(c));
  }
}

export default class PlayerIcon {
  private scene: Phaser.Scene;
  private isShowed: boolean;
  private container: Phaser.GameObjects.Container;
  private xpos: number;
  private panel: Phaser.GameObjects.RenderTexture;
  private numItems: number;
  private color: BootColour;

  public constructor(
    scene: Phaser.Scene,
    xpos: number,
    ypos: number,
    color: BootColour
  ) {
    this.scene = scene;
    this.isShowed = false;
    this.xpos = xpos;
    this.numItems = 0;
    this.color = color;

    const store: ImgStore = ImgStore.instance();

    /* add player token */
    const token: Phaser.GameObjects.Sprite = this.scene.add
      .sprite(xpos, ypos, store.getActor(color))
      .setDepth(3);

    const panel: Phaser.GameObjects.RenderTexture = this.scene.add
      .nineslice(0, 0, 120, 60, store.getPanel(color), 24)
      .setOrigin(0, 0);
    this.panel = panel;

    token.setScale(0.3);

    const aContainer: Phaser.GameObjects.Container = this.scene.add
      .container(xpos + 30, ypos - 30)
      .setDepth(3);
    this.container = aContainer;
    aContainer.add(panel);
    aContainer.setVisible(false);

    token
      .setInteractive()
      .on('pointerdown', () => {
        token.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        token.clearTint();
      })
      .on('pointerup', () => {
        token.clearTint();
        aContainer.setVisible(!aContainer.visible);
      });

    // Show player current score
    const circle: Phaser.GameObjects.Sprite = this.scene.add.sprite(
      xpos - 70,
      ypos,
      store.getCircle(color)
    );
    const score: Phaser.GameObjects.Text = this.scene.add.text(
      xpos - 80,
      ypos - 12,
      '0'
    );
    score.setColor('black');
    score.setFontSize(32);
    circle.setScale(1.75);

    eventsCenter.on(
      'update-points',
      (points: number) => (score.text = `${points}`),
      this
    );
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

  public addBootImg(
    xpos: number,
    ypos: number,
    width: number,
    height: number
  ): void {
    const boot: Phaser.GameObjects.Sprite = this.scene.add.sprite(
      xpos,
      ypos,
      ImgStore.instance().getBoot(this.color)
    );
    boot.setDisplaySize(width, height);
  }
}

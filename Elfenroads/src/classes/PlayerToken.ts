import eventsCenter from '../classes/EventsCenter';

export default class PlayerToken {
    scene: Phaser.Scene;
    isShowed: boolean;
    container: Phaser.GameObjects.Container;
    xpos: number;
    panel: Phaser.GameObjects.RenderTexture;
    numCounter: number;

    constructor(scene: Phaser.Scene, xpos: number, ypos: number, img: string) {
        this.scene = scene;
        this.isShowed = false;
        this.xpos = xpos;
        this.numCounter = 0;

        /* add player token */
        const token = this.scene.add.sprite(xpos, ypos, img);
        const panel = this.scene.add.nineslice(0, 0, 120, 60, 'blue-panel', 24).setOrigin(0, 0);
        this.panel = panel;

        token.setScale(0.3);

        const aContainer = this.scene.add.container(xpos + 30, ypos - 30);
        this.container = aContainer;
        aContainer.add(panel);
        aContainer.setVisible(false);

        token.setInteractive().on('pointerdown', function() {
            token.setTint(0xd3d3d3);
        })
        .on('pointerout', function() {
            token.clearTint();
        })
        .on('pointerup', function() {
            token.clearTint();
            aContainer.setVisible(!aContainer.visible);
        });

        // Show player current score
        const circle = this.scene.add.sprite(xpos - 70, ypos, 'green-circle');
        const score = this.scene.add.text(xpos - 80, ypos - 12, '0');
        score.setColor('black');
        score.setFontSize(32);
        circle.setScale(2);

        eventsCenter.on('update-points', (points:number) => score.text = `${points}`, this);
    }

    addCounter(img: string) {
        const counter = this.scene.add.sprite(5+this.numCounter*60, 5, img).setOrigin(0, 0);
        counter.setScale(0.3);
        this.numCounter ++;
        this.panel.setSize(60*this.numCounter, 60);
        this.container.add(counter);
    }
}

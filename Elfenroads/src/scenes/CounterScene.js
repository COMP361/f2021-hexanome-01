import Phaser from 'phaser';

const edges = [
    // lisselen - wylhien
    [470, 170],
    // lisselen - parundia
    [470, 260],
    // lisselen - yttar
    [400, 270],
    // wylhien - parundia
    [535, 220],
    // wylhien - albaran
    [655, 245],
    // wylhien - jaccaranda
    [650, 170],
    // jaccaranda - tichih
    [900, 190],
    // jaccaranda - throtmanni
    [790, 230],
    // throtmanni - albaran
    [785, 290],
    // throtmanni - deodor
    [855, 300],
    // throtmanni - rivinia
    [950, 275],
    // throtmanni - tichih
    [980, 240],
    // tichih - ergeren
    [1120, 270],
    // yttar - parundia (water)
    [470, 315],
    // yttar - grangor
    [380, 390],
    // yttar - grangor (water)
    [420, 380],
    // parundia - grangor (water)
    [475, 365],
    // parundia - albaran
    [630, 300],
    // albaran - dagamura
    [685, 385],
    // albaran - feodor
    [765, 340],
    // feodor - dagamura
    [760, 390],
    // feodor - lapphalya
    [855, 415],
    // feodor - rivinia
    [915, 325],
    // rivinia - lopphalya
    [940, 380],
    // ergeren - elvenhold
    [1165, 375],
    // grangor - mahdavikia
    [390, 505],
    // kihromah - dagamura
    [615, 420],
    // dagamura - mahdavikia
    [570, 485],
    // dagamura - jxara
    [670, 495],
    // dagamura - lapphalya
    [750, 475],
    // lapphalya - jxara
    [760, 525],
    // lapphalya - virst
    [855, 520],
    // lapphalya - elvenhold
    [950, 455],
    // elvenhold - virst (water)
    [985, 495],
    // elevenhold - strykhaven (water)
    [1060, 485],
    // elvenghold - beata
    [1150, 455],
    // mahdavikia - jxara
    [540, 570],
    // jxara - virst
    [770, 585],
    // virst - strykhaven (water)
    [1010, 540],
    // virst - strykhaven
    [1025, 595],
    // strykhaven - beata
    [1190, 545],

];

const counters = [
    'giant-pig-counter',
    'elfcycle',
    'magic-cloud',
    'unicorn',
    'troll-wagon',
    'dragon',
];

export default class CounterScene extends Phaser.Scene {
    constructor() {
      super('counterscene');
    }
    create() {
        const graphics = this.add.graphics();
        const zoneRadius = 20;
        // creating all the dropzones for counters
        edges.forEach((edge) => {
            this.add
            .zone(
                edge[0] / 1600 * this.cameras.main.width, edge[1] / 750 * this.cameras.main.height)
            .setCircleDropZone(zoneRadius);
        });
        let counterX = 750 / 1600 * this.cameras.main.width;
        counters.forEach((counter) => {
            const counterSprite =
            this.add
                .sprite(
                    counterX / 1600 * this.cameras.main.width, 670 / 750 * this.cameras.main.height, counter)
                .setInteractive();
            // set initial position and relative size
            counterSprite.setDisplaySize(this.cameras.main.width * 0.03, this.cameras.main.height * 0.03);
            // make counter draggable to any position
            this.input.setDraggable(counterSprite);
            counterX += 50 / 1600 * this.cameras.main.width;
        });

        this.input.on('dragstart', function(pointer, gameObject) {
            gameObject.setTint(0x808080);
        });

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            graphics.lineStyle(2, 0xff0000, 1);
            // highlight every draggable counter
            edges.forEach((edge) => {
                graphics.strokeCircle(
                    edge[0] / 1600 * this.cameras.main.width, edge[1] / 750 * this.cameras.main.height, zoneRadius);
            });
        });

        // if the counter is dragged to the drop zone, it will stay in it
        this.input.on('drop', function(pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
        });

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.clearTint();
            // otherwise the counter will be back to original position
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            // clear edges highlight
            graphics.clear();
        });
    }
}

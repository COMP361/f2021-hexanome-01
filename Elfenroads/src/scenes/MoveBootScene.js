import Phaser from 'phaser';

export default class BoardGame extends Phaser.Scene {
  constructor() {
    super('movebootscene');
  }
  create() {
    const graphics = this.add.graphics();
    const zoneWidth = 60 / 1600 * this.cameras.main.width;
    const zoneHeight = 60 / 750 * this.cameras.main.height;
    // town coordinates on a 1600 x 750 screen
    // elvenhold, feodor, lapphalya, rivinia, ergeren, beafa, strykhaven, virst, jxara, mahdavikia, grangor, kihrimah, dagamura, albaran, parundia,
    // usselen, wylhien, jaccaranda, throtmanni, tichih, yttar
    const townsCoor = [
      [1050, 400], [835, 370], [840, 470], [1005, 315], [1190, 315], [1200, 490], [1090, 540], [915, 570], [655, 560],  [450, 555], [415, 455],
      [550, 410],  [680, 435], [685, 335], [555, 285],  [400, 225],  [560, 160],  [725, 185],  [890, 250], [1060, 200], [390, 330]
    ];
    // create dropzone for each town
    for (let i = 0; i < townsCoor.length; i++) {
      this.add.zone(townsCoor[i][0] / 1600 * this.cameras.main.width, townsCoor[i][1] / 750 * this.cameras.main.height, zoneWidth, zoneHeight)
          .setRectangleDropZone(zoneWidth, zoneHeight);
    }

    /* move boot */
    // set initial position and relative size
    const elfenboot = this.add.sprite(1050 / 1600 * this.cameras.main.width, 400 / 750 * this.cameras.main.height, 'boot').setInteractive();
    elfenboot.setDisplaySize(this.cameras.main.width * 0.04, this.cameras.main.height * 0.08);

    // make elfenboot draggable to any position
    this.input.setDraggable(elfenboot);

    this.input.on('dragstart', function(pointer, gameObject) {
      gameObject.setTint(0x808080);
    });

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      graphics.lineStyle(2, 0xffff00, 1);
      // highlight every draggable town
      for (let i = 0; i < townsCoor.length; i++) {
        graphics.strokeRect(
            (townsCoor[i][0] - 30) / 1600 * this.cameras.main.width, (townsCoor[i][1] - 30) / 750 * this.cameras.main.height, zoneWidth, zoneHeight);
      }
    });

    // if the boot is dragged to the drop zone, it will stay in it
    this.input.on('drop', function(pointer, gameObject, dropZone) {
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
    });

    this.input.on('dragend', function(pointer, gameObject, dropped) {
      gameObject.clearTint();
      if (!dropped) {  // otherwise the boot will be back to original position
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      // clear towns highlight
      graphics.clear();
    });
  }
}

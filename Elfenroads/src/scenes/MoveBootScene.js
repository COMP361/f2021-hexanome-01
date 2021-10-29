import Phaser from 'phaser';

export default class BoardGame extends Phaser.Scene {
  constructor() {
    super('movebootscene');
  }

  create() {
    /* hard code positions of towns */
    // elvenhold
    this.add.zone(1040, 420, 80, 80).setRectangleDropZone(80, 80);
    // feodor
    this.add.zone(840, 365, 60, 60).setRectangleDropZone(60, 60);
    // lapphalya
    this.add.zone(830, 480, 60, 60).setRectangleDropZone(60, 60);
    // rivinia
    this.add.zone(990, 310, 60, 60).setRectangleDropZone(60, 60);
    // ergeren
    this.add.zone(1175, 310, 60, 60).setRectangleDropZone(60, 60);
    // beafa
    this.add.zone(1200, 490, 60, 60).setRectangleDropZone(60, 60);
    // strykhaven
    this.add.zone(1080, 540, 60, 60).setRectangleDropZone(60, 60);
    // virst
    this.add.zone(900, 570, 60, 60).setRectangleDropZone(60, 60);
    // jxara
    this.add.zone(650, 560, 60, 60).setRectangleDropZone(60, 60);
    // mahdavikia
    this.add.zone(410, 570, 60, 60).setRectangleDropZone(60, 60);
    // grangor
    this.add.zone(400, 450, 60, 60).setRectangleDropZone(60, 60);
    // kihrimah
    this.add.zone(530, 400, 60, 60).setRectangleDropZone(60, 60);
    // dagamura
    this.add.zone(670, 435, 60, 60).setRectangleDropZone(60, 60);
    // albaran
    this.add.zone(680, 340, 60, 60).setRectangleDropZone(60, 60);
    // parundia
    this.add.zone(540, 285, 60, 60).setRectangleDropZone(60, 60);
    // usselen
    this.add.zone(400, 225, 60, 60).setRectangleDropZone(60, 60);
    // wylhien
    this.add.zone(550, 150, 60, 60).setRectangleDropZone(60, 60);
    // jaccaranda
    this.add.zone(715, 190, 60, 60).setRectangleDropZone(60, 60);
    // throtmanni
    this.add.zone(880, 255, 60, 60).setRectangleDropZone(60, 60);
    // tichih
    this.add.zone(1060, 200, 60, 60).setRectangleDropZone(60, 60);
    // yttar
    this.add.zone(380, 335, 60, 60).setRectangleDropZone(60, 60);

    /* move boot */
    // set initial position and relative size
    const elfenboot = this.add.sprite(this.cameras.main.width * 0.65, this.cameras.main.height * 0.55, 'boot').setInteractive();
    elfenboot.setDisplaySize(this.cameras.main.width * 0.04, this.cameras.main.height * 0.08);

    // make elfenboot draggable to any position
    this.input.setDraggable(elfenboot);

    this.input.on('dragstart', function(pointer, gameObject) {
      gameObject.setTint(0x808080);
    });

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // if the boot is dragged to the drop zone, it will stay in it
    this.input.on('drop', function(pointer, gameObject, dropZone) {
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
    });

    this.input.on('dragend', function(pointer, gameObject, dropped) {
      gameObject.clearTint();
      // otherwise the boot will be back to original position
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
  }
}

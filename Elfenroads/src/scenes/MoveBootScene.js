import Phaser from 'phaser'

export default class BoardGame extends Phaser.Scene {
  constructor() {
    super('movebootscene')
  }

  create() {
    /* for showing drag position */
    // var label = this.add.text(0, 0, '', { font: "48px Arial Black", fill:
    // "#c51b7d" }); label.setStroke('#de77ae', 8);

    /* hard code positions of towns */
    // var elvenhold =
    this.add.zone(1040, 420, 80, 80).setRectangleDropZone(80, 80);
    // var feodor =
    this.add.zone(840, 365, 60, 60).setRectangleDropZone(60, 60);
    // var lapphalya =
    this.add.zone(830, 480, 60, 60).setRectangleDropZone(60, 60);
    // var rivinia =
    this.add.zone(990, 310, 60, 60).setRectangleDropZone(60, 60);
    // var ergeren =
    this.add.zone(1175, 310, 60, 60).setRectangleDropZone(60, 60);
    // var beafa =
    this.add.zone(1200, 490, 60, 60).setRectangleDropZone(60, 60);
    // var strykhaven =
    this.add.zone(1080, 540, 60, 60).setRectangleDropZone(60, 60);
    // var virst =
    this.add.zone(900, 570, 60, 60).setRectangleDropZone(60, 60);
    // var jxara =
    this.add.zone(650, 560, 60, 60).setRectangleDropZone(60, 60);
    // var mahdavikia =
    this.add.zone(410, 570, 60, 60).setRectangleDropZone(60, 60);
    // var grangor =
    this.add.zone(400, 450, 60, 60).setRectangleDropZone(60, 60);
    // var kihrimah =
    this.add.zone(530, 400, 60, 60).setRectangleDropZone(60, 60);
    // var dagamura =
    this.add.zone(670, 435, 60, 60).setRectangleDropZone(60, 60);
    // var albaran =
    this.add.zone(680, 340, 60, 60).setRectangleDropZone(60, 60);
    // var parundia =
    this.add.zone(540, 285, 60, 60).setRectangleDropZone(60, 60);
    // var usselen =
    this.add.zone(400, 225, 60, 60).setRectangleDropZone(60, 60);
    // var wylhien =
    this.add.zone(550, 150, 60, 60).setRectangleDropZone(60, 60);
    // var jaccaranda =
    this.add.zone(715, 190, 60, 60).setRectangleDropZone(60, 60);
    // var throtmanni =
    this.add.zone(880, 255, 60, 60).setRectangleDropZone(60, 60);
    // var tichih =
    this.add.zone(1060, 200, 60, 60).setRectangleDropZone(60, 60);
    // var yttar =
    this.add.zone(380, 335, 60, 60).setRectangleDropZone(60, 60);

    /* move boot */
    // set initial position and relative size
    const elfenboot = this.add
                          .sprite(
                              this.cameras.main.width * 0.65,
                              this.cameras.main.height * 0.55, 'boot')
                          .setInteractive();
    elfenboot.setDisplaySize(
        this.cameras.main.width * 0.04, this.cameras.main.height * 0.08);

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
      // label.setText(gameObject.x + ":" + gameObject.y);
      if (!dropped)  // otherwise the boot will be back to original position
      {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
  }
}
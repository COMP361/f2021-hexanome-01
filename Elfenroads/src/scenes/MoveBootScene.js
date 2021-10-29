import Phaser from 'phaser';

import eventsCenter from './EventsCenter';
import {Town} from './Towns';

export const Towns = {
  elvenhold: new Town('elvenhold', [1050, 400]),
  feodor: new Town('feodor', [835, 370]),
  lapphalya: new Town('lapphalya', [840, 470]),
  rivinia: new Town('rivinia', [1005, 315]),
  ergeren: new Town('ergeren', [1190, 315]),
  beafa: new Town('beafa', [1200, 490]),
  strykhaven: new Town('strykhaven', [1090, 540]),
  virst: new Town('virst', [915, 570]),
  jxara: new Town('jxara', [655, 560]),
  mahdavikia: new Town('mahdavikia', [450, 555]),
  grangor: new Town('grangor', [415, 455]),
  kihrimah: new Town('kihrimah', [550, 410]),
  dagamura: new Town('dagamura', [680, 435]),
  albaran: new Town('albaran', [685, 335]),
  parundia: new Town('parundia', [555, 285]),
  usselen: new Town('usselen', [400, 225]),
  wylhien: new Town('wylhien', [560, 160]),
  jaccaranda: new Town('jaccaranda', [725, 185]),
  throtmanni: new Town('throtmanni', [890, 250]),
  tichih: new Town('tichih:', [1060, 200]),
  yttar: new Town('yttar', [390, 330]),
};
export default class BoardGame extends Phaser.Scene {
  constructor() {
    super('movebootscene');
  }
  create() {
    const graphics = this.add.graphics();
    const zoneWidth = 60 / 1600 * this.cameras.main.width;
    const zoneHeight = 60 / 750 * this.cameras.main.height;

    // will have to have another class to define the player object in the future
    const Player = {
      name: 'green',
      currentTown: Towns.elvenhold,
      points: 0,
    };

    Towns.elvenhold.setCurrentPlayers({Player});

    // Initialize each town
    for (const town in Towns) {
      if (Towns[town].position) {
        this.add
            .zone(
                Towns[town].position[0] / 1600 * this.cameras.main.width, Towns[town].position[1] / 750 * this.cameras.main.height, zoneWidth,
                zoneHeight)
            .setRectangleDropZone(zoneWidth, zoneHeight);
        if (Towns[town].name === 'elvenhold') {
          continue;
        }
        Towns[town].setTownPieceHolder(this.add.circle(
            Towns[town].position[0] / 1600 * this.cameras.main.width, (Towns[town].position[1] - 40) / 750 * this.cameras.main.height, 15, 0x000000));
        Towns[town].setTownPieces(this.add.circle(
            Towns[town].position[0] / 1600 * this.cameras.main.width, (Towns[town].position[1] - 40) / 750 * this.cameras.main.height, 10, 0x007700));
      }
    }
    this.updateVis();

    // update visibility of town pieces
    eventsCenter.on('update-town-piece-vis', this.updateVis, this);

    /* move boot */
    const elvenboot =
        this.add
            .sprite(
                Towns.elvenhold.position[0] / 1600 * this.cameras.main.width, Towns.elvenhold.position[1] / 750 * this.cameras.main.height, 'boot')
            .setInteractive();

    // set initial position and relative size
    elvenboot.setDisplaySize(this.cameras.main.width * 0.04, this.cameras.main.height * 0.08);

    // make elfenboot draggable to any position
    this.input.setDraggable(elvenboot);

    this.input.on('dragstart', function(pointer, gameObject) {
      gameObject.setTint(0x808080);
    });

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      graphics.lineStyle(2, 0xffff00, 1);
      // highlight every draggable town
      for (const town in Towns) {
        if (Towns[town].position) {
          graphics.strokeRect(
              (Towns[town].position[0] - 30) / 1600 * this.cameras.main.width, (Towns[town].position[1] - 30) / 750 * this.cameras.main.height,
              zoneWidth, zoneHeight);
        }
      }
    });

    // if the boot is dragged to the drop zone, it will stay in it
    this.input.on('drop', function(pointer, gameObject, dropZone) {
      for (const town in Towns) {
        if (Towns[town].position[0] / 1600 * this.cameras.main.width === dropZone.x &&
            Towns[town].position[1] / 750 * this.cameras.main.height === dropZone.y) {
          if (Towns[town].townPieces.active) {
            Towns[town].townPieces.destroy();
            Player.points++;
            eventsCenter.emit('update-points', Player.points);
          }
        }
      }
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
      // clear towns highlight
      graphics.clear();
    });
  }

  updateVis() {
    for (const town in Towns) {
      if (Towns[town]) {
        if (Towns[town].townPieces.active) {
          Towns[town].townPieces.setVisible(!Towns[town].townPieces.visible);
        }
        if (Towns[town].townPieceHolder.active) {
          Towns[town].townPieceHolder.setVisible(!Towns[town].townPieceHolder.visible);
        }
      }
    }
  }
}

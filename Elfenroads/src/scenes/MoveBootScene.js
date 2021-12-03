import Phaser from 'phaser';
import {allTowns, createTowns, moveToNewTown, singleSession} from '../utils/queryUtils';
import {colors, getSessionId, getUser} from '../utils/storageUtils';

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
  tichih: new Town('tichih', [1060, 200]),
  yttar: new Town('yttar', [390, 330]),
};

const sessionId = getSessionId();

export default class BoardGame extends Phaser.Scene {
  constructor() {
    super('movebootscene');

    this.players = {};
    this.elvenboots = {};
  }
  async create() {
    const graphics = this.add.graphics();
    const zoneWidth = 60 / 1600 * this.cameras.main.width;
    const zoneHeight = 60 / 750 * this.cameras.main.height;

    await new Promise((res) => createTowns(sessionId).then(res));

    // will have to have another class to define the player object in the future
    // const Player = {
    //   name: 'green',
    //   currentTown: Towns.elvenhold,
    //   points: 0,
    // };

    let playerList = [];

    await new Promise((res) => singleSession(getSessionId())
    .then((result) => result.data.data.Session)
    .then((session) => {
      res(playerList = session.players);
    }));

    playerList.forEach((player, ind) => {
      const playerObj = {
        name: player,
        currentTown: Towns.elvenhold,
        points: 0,
        color: colors[ind],
        indent: ind * 10,
        dragging: false,
      };
      this.players[player] = playerObj;
      Towns.elvenhold.setCurrentPlayers({playerObj});
    });

    const me = getUser().name;

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
    // const elvenboot =
    //     this.add
    //         .sprite(
    //             Towns.elvenhold.position[0] / 1600 * this.cameras.main.width, Towns.elvenhold.position[1] / 750 * this.cameras.main.height, 'boot-green')
    //         .setInteractive();

    playerList.forEach((player, ind) => {
      if (player === me) {
        this.elvenboots[player] = this.add
          .sprite(
            Towns.elvenhold.position[0] / 1600 * this.cameras.main.width + ind * 10, Towns.elvenhold.position[1] / 750 * this.cameras.main.height, `boot-${this.players[player].color}`,
          )
          .setInteractive();

        this.elvenboots[player].setDisplaySize(this.cameras.main.width * 0.04, this.cameras.main.height * 0.08);
      } else {
        this.elvenboots[player] = this.add
          .sprite(
            Towns.elvenhold.position[0] / 1600 * this.cameras.main.width + ind * 10, Towns.elvenhold.position[1] / 750 * this.cameras.main.height, `boot-${this.players[player].color}`,
          );

        this.elvenboots[player].setDisplaySize(this.cameras.main.width * 0.04, this.cameras.main.height * 0.08);
      }
    });

    // make elfenboot draggable to any position
    this.input.setDraggable(this.elvenboots[me]);

    this.input.on('dragstart', function(pointer, gameObject) {
      gameObject.setTint(0x808080);
      this.children.bringToTop(gameObject);
    }, this);

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      this.players[me].dragging = true;
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
    }, this);

    // if the boot is dragged to the drop zone, it will stay in it
    this.input.on('drop', function(pointer, gameObject, dropZone) {
      for (const town in Towns) {
        if (Towns[town].position[0] / 1600 * this.cameras.main.width === dropZone.x &&
            Towns[town].position[1] / 750 * this.cameras.main.height === dropZone.y) {
          if (Towns[town].townPieces.active) {
            Towns[town].townPieces.destroy();
            this.players[me].points++;
            eventsCenter.emit('update-points', this.players[me].points);
          }
          moveToNewTown(me, Towns[town].name, this.players[me].currentTown.name, sessionId);
          this.players[me].currentTown = Towns[town];
        }
      }
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      this.players[me].dragging = false;
    }, this);

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
    setInterval(() => {
      allTowns(sessionId)
      .then((res) => res.data.data)
      .then((data) => {
        data.AllTowns.forEach((town) => {
          if (town.currentPlayers.length) {
            town.currentPlayers.forEach((player) => {
              if (this.players[player.name]) this.players[player.name].currentTown = Towns[town.name];
            });
          }
        });
      });
    }, 1000);
  }

  update() {
    for (const p in this.players) {
      if (this.players[p] && this.elvenboots[p] && !this.players[p].dragging) {
        const town = Towns[this.players[p].currentTown.name];
        const posX = town.position[0] / 1600 * this.cameras.main.width + this.players[p].indent;
        const posY = town.position[1] / 750 * this.cameras.main.height;

        // if boot moved on the server, move the boot to the new town
        if (this.elvenboots[p].x !== posX || this.elvenboots[p].y !== posY) {
          this.elvenboots[p].setPosition(posX, posY);
        }
      }
    }
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

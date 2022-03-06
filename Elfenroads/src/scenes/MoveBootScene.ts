/* eslint-disable prettier/prettier */
import Phaser from 'phaser';

import eventsCenter from '../classes/EventsCenter';
import PlayerManager from '../managers/PlayerManager';
import RoadManager from '../managers/RoadManager';
import Town from '../classes/Town';

export default class BoardGame extends Phaser.Scene {
  constructor() {
    super('movebootscene');
  }
  create() {
    const graphics = this.add.graphics();
    const zoneWidth = (60 / 1600) * this.cameras.main.width;
    const zoneHeight = (60 / 750) * this.cameras.main.height;

    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const Towns = RoadManager.getInstance().getTowns();
    const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();
    Towns.elvenhold.addVisitingPlayer(currentPlayer);

    // Initialize each town
    for (const townname in Towns) {
      const town: Town = Towns[townname];
      const position: Array<integer> = town.getPosition();
      if (position) {
        this.add
          .zone(
            (position[0] / 1600) * this.cameras.main.width,
            (position[1] / 750) * this.cameras.main.height,
            zoneWidth,
            zoneHeight
          )
          .setRectangleDropZone(zoneWidth, zoneHeight);
        if (town.getName() === 'elvenhold') {
          continue;
        }
        town.setTownPieceHolder(
          this.add.circle(
            (position[0] / 1600) * this.cameras.main.width,
            ((position[1] - 40) / 750) * this.cameras.main.height,
            15,
            0x000000
          )
        );

        town.setTownPieces(
          this.add.circle(
            (position[0] / 1600) * this.cameras.main.width,
            ((position[1] - 40) / 750) * this.cameras.main.height,
            10,
            0x007700
          )
        );
      }
    }
    this.updateVis();

    // update visibility of town pieces
    eventsCenter.on('update-town-piece-vis', this.updateVis, this);

    /* move boot */
    const elvenboot = this.add
      .sprite(
        (Towns.elvenhold.getXposition() / 1580) * this.cameras.main.width,
        (Towns.elvenhold.getYposition() / 750) * this.cameras.main.height,
        'boot'
      )
      .setInteractive();

    // set initial position and relative size
    elvenboot.setDisplaySize(
      this.cameras.main.width * 0.04,
      this.cameras.main.height * 0.08
    );

    // make elfenboot draggable to any position
    this.input.setDraggable(elvenboot);

    this.input.on(
      'dragstart',
      (pointer: any, gameObject: {setTint: (arg0: number) => void}) => {
        gameObject.setTint(0x808080);
      }
    );

    this.input.on(
      'drag',
      (pointer: any, gameObject: {x: any; y: any}, dragX: any, dragY: any) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        graphics.lineStyle(2, 0xffff00, 1);
        // highlight every draggable town
        for (const townname in Towns) {
          const town = Towns[townname];
          if (town.getPosition()) {
            graphics.strokeRect(
              ((town.getXposition() - 30) / 1600) * this.cameras.main.width,
              ((town.getYposition() - 30) / 750) * this.cameras.main.height,
              zoneWidth,
              zoneHeight
            );
          }
        }
      }
    );

    // if the boot is dragged to the drop zone, it will stay in it
    this.input.on(
      'drop',
      (
        pointer: any,
        gameObject: {x: any; y: any},
        dropZone: {x: number; y: number}
      ) => {
        for (const townname in Towns) {
          const town = Towns[townname];
          if (
            (town.getXposition() / 1600) * this.cameras.main.width ===
              dropZone.x &&
            (town.getYposition() / 750) * this.cameras.main.height ===
              dropZone.y
          ) {
            if (town.townPieceIsActive()) {
              town.destroyTownPiece();
              const score: number = currentPlayer.getScore() + 1;
              currentPlayer.setScore(score);
              eventsCenter.emit('update-points', score);
            }
          }
        }
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
      }
    );

    this.input.on(
      'dragend',
      (
        pointer: any,
        gameObject: {
          clearTint: () => void;
          x: any;
          input: {dragStartX: any; dragStartY: any};
          y: any;
        },
        dropped: any
      ) => {
        gameObject.clearTint();
        // otherwise the boot will be back to original position
        if (!dropped) {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
        }
        // clear towns highlight
        graphics.clear();
      }
    );
  }

  updateVis() {
    const Towns = RoadManager.getInstance().getTowns();
    for (const townname in Towns) {
      const town = Towns[townname];
      if (town) {
        if (town.townPieceIsActive()) {
          town.alterTownPieceVisibility();
        }
        if (town.townPieceHolderIsActive()) {
          town.alterTownPieceHolderVisibility();
        }
      }
    }
  }
}

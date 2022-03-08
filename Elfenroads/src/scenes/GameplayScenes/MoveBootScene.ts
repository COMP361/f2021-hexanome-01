/* eslint-disable prettier/prettier */
import Phaser from 'phaser';

import eventsCenter from '../../classes/EventsCenter';
import PlayerManager from '../../managers/PlayerManager';
import RoadManager from '../../managers/RoadManager';
import Town from '../../classes/Town';

export default class BoardGame extends Phaser.Scene {
  private townPieces: Map<string, Phaser.GameObjects.Arc> = new Map();
  private townPieceHolders: Map<string, Phaser.GameObjects.Arc> = new Map();

  constructor() {
    super('movebootscene');
  }
  create() {
    // SIMULATING ONE SINGLE PLAYER. THIS IS NOT FINAL.
    const Towns = RoadManager.getInstance().getTowns();
    const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();
    const elvenhold: Town = Towns.get('elvenhold')!;
    elvenhold.addVisitingPlayer(currentPlayer);

    // Create text to notify that it is move boot phase
    const moveBootText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Move Boot',
      {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
      }
    );

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, moveBootText.width + 20, 40, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Grab width of current game to center our container
    const gameWidth: number = this.cameras.main.width;

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      90
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(moveBootText);

    const graphics = this.add.graphics();
    const zoneWidth = (60 / 1600) * this.cameras.main.width;
    const zoneHeight = (60 / 750) * this.cameras.main.height;

    // Initialize each town
    for (const currentTown of Towns.values()) {
      const position: Array<integer> = currentTown.getPosition();
      if (position) {
        this.add
          .zone(
            (position[0] / 1600) * this.cameras.main.width,
            (position[1] / 750) * this.cameras.main.height,
            zoneWidth,
            zoneHeight
          )
          .setRectangleDropZone(zoneWidth, zoneHeight);
        if (currentTown.getName() === 'elvenhold') {
          continue;
        }
        this.townPieceHolders.set(
          currentTown.getName(),
          this.add.circle(
            (position[0] / 1600) * this.cameras.main.width,
            ((position[1] - 40) / 750) * this.cameras.main.height,
            15,
            0x000000
          )
        );

        this.townPieces.set(
          currentTown.getName(),
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

    // for demostration
    const bootColour = currentPlayer.getBootColour();

    /* move boot */
    const elvenboot = this.add
      .sprite(
        (elvenhold.getXposition() / 1600) * this.cameras.main.width,
        (elvenhold.getYposition() / 750) * this.cameras.main.height,
        bootColour
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
        for (const currentTown of Towns.values()) {
          if (currentTown.getPosition()) {
            graphics.strokeRect(
              ((currentTown.getXposition() - 30) / 1600) *
                this.cameras.main.width,
              ((currentTown.getYposition() - 30) / 750) *
                this.cameras.main.height,
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
        for (const currentTown of Towns.values()) {
          if (
            (currentTown.getXposition() / 1600) * this.cameras.main.width ===
              dropZone.x &&
            (currentTown.getYposition() / 750) * this.cameras.main.height ===
              dropZone.y
          ) {
            const townPiece: Phaser.GameObjects.Arc | undefined =
              this.townPieces.get(currentTown.getName());
            if (townPiece === undefined) continue;
            if (townPiece.active) {
              townPiece.destroy();
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
    for (const currentTownName of Towns.keys()) {
      if (currentTownName) {
        const townPiece: Phaser.GameObjects.Arc | undefined =
          this.townPieces.get(currentTownName);
        const holder: Phaser.GameObjects.Arc | undefined =
          this.townPieceHolders.get(currentTownName);
        if (townPiece === undefined || holder === undefined) continue;
        if (townPiece.active) {
          townPiece.setVisible(!townPiece.visible);
        }
        if (holder.active) {
          holder.setVisible(!holder.visible);
        }
      }
    }
  }
}

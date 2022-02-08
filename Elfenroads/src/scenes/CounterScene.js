import Phaser from 'phaser';
import {Edge} from '../classes/Edge';
import {Towns} from './MoveBootScene';
import {Counter, Obstacle} from '../classes/ItemUnit';

// const SpellType = {
//     double: 'double',
//     exchange: 'exchange',
// };

const CounterType = {
  giantPig: 'pig-counter',
  elfcycle: 'elfcycle-counter',
  magicCloud: 'cloud-counter',
  unicorn: 'unicorn-counter',
  trollWagon: 'troll-wagon-counter',
  dragon: 'dragon-counter',
};

const ObstacleType = {
  seaMonster: 'sea-monster',
  tree: 'tree',
};

const EdgeType = {
  plain: 'plain',
  wood: 'wood',
  desert: 'desert',
  mountain: 'mountain',
  river: 'river',
  lake: 'lake',
};

const Counters = [
  new Counter(CounterType.giantPig, [EdgeType.plain, EdgeType.wood]),
  new Counter(CounterType.elfcycle, [
    EdgeType.plain,
    EdgeType.wood,
    EdgeType.mountain,
  ]),
  new Counter(CounterType.magicCloud, [
    EdgeType.plain,
    EdgeType.wood,
    EdgeType.mountain,
  ]),
  new Counter(CounterType.unicorn, [
    EdgeType.wood,
    EdgeType.desert,
    EdgeType.mountain,
  ]),
  new Counter(CounterType.trollWagon, [
    EdgeType.plain,
    EdgeType.wood,
    EdgeType.desert,
    EdgeType.mountain,
  ]),
  new Counter(CounterType.dragon, [
    EdgeType.plain,
    EdgeType.wood,
    EdgeType.desert,
    EdgeType.mountain,
  ]),
];

const Obstacles = [
  new Obstacle(ObstacleType.tree, [
    EdgeType.plain,
    EdgeType.wood,
    EdgeType.desert,
    EdgeType.mountain,
  ]),
  new Obstacle(ObstacleType.seaMonster, [EdgeType.lake, EdgeType.river]),
];

export const Edges = [
  // Usselen - wylhien
  new Edge(Towns.usselen, Towns.wylhien, EdgeType.plain, [470, 170]),
  // Usselen - parundia
  new Edge(Towns.usselen, Towns.parundia, EdgeType.wood, [470, 260]),
  // Usselen - yttar
  new Edge(Towns.usselen, Towns.yttar, EdgeType.wood, [400, 270]),
  // wylhien - parundia
  new Edge(Towns.wylhien, Towns.parundia, EdgeType.plain, [535, 220]),
  // wylhien - albaran
  new Edge(Towns.wylhien, Towns.albaran, EdgeType.desert, [655, 245]),
  // wylhien - jaccaranda
  new Edge(Towns.wylhien, Towns.jaccaranda, EdgeType.mountain, [650, 170]),
  // jaccaranda - tichih
  new Edge(Towns.jaccaranda, Towns.tichih, EdgeType.mountain, [900, 190]),
  // jaccaranda - throtmanni
  new Edge(Towns.jaccaranda, Towns.throtmanni, EdgeType.mountain, [790, 230]),
  // throtmanni - albaran
  new Edge(Towns.throtmanni, Towns.albaran, EdgeType.desert, [785, 290]),
  // throtmanni - feodor
  new Edge(Towns.throtmanni, Towns.feodor, EdgeType.desert, [855, 300]),
  // throtmanni - rivinia
  new Edge(Towns.throtmanni, Towns.rivinia, EdgeType.wood, [950, 275]),
  // throtmanni - tichih
  new Edge(Towns.throtmanni, Towns.tichih, EdgeType.plain, [980, 240]),
  // tichih - ergeren
  new Edge(Towns.tichih, Towns.ergeren, EdgeType.wood, [1120, 270]),
  // yttar - parundia (water)
  new Edge(Towns.yttar, Towns.parundia, EdgeType.lake, [470, 315]),
  // yttar - grangor
  new Edge(Towns.yttar, Towns.grangor, EdgeType.mountain, [380, 390]),
  // yttar - grangor (water)
  new Edge(Towns.yttar, Towns.grangor, EdgeType.lake, [420, 380]),
  // parundia - grangor (water)
  new Edge(Towns.parundia, Towns.grangor, EdgeType.lake, [475, 365]),
  // parundia - albaran
  new Edge(Towns.parundia, Towns.albaran, EdgeType.desert, [630, 300]),
  // albaran - dagamura
  new Edge(Towns.albaran, Towns.dagamura, EdgeType.desert, [685, 385]),
  // albaran - feodor
  new Edge(Towns.albaran, Towns.feodor, EdgeType.desert, [765, 340]),
  // feodor - dagamura
  new Edge(Towns.feodor, Towns.dagamura, EdgeType.desert, [760, 390]),
  // feodor - lapphalya
  new Edge(Towns.feodor, Towns.lapphalya, EdgeType.wood, [855, 415]),
  // feodor - rivinia
  new Edge(Towns.feodor, Towns.rivinia, EdgeType.wood, [915, 325]),
  // rivinia - lapphalya
  new Edge(Towns.rivinia, Towns.lapphalya, EdgeType.wood, [940, 380]),
  // ergeren - elvenhold
  new Edge(Towns.ergeren, Towns.elvenhold, EdgeType.wood, [1165, 375]),
  // grangor - mahdavikia
  new Edge(Towns.grangor, Towns.mahdavikia, EdgeType.mountain, [390, 505]),
  // kihromah - dagamura
  new Edge(Towns.kihromah, Towns.dagamura, EdgeType.wood, [615, 420]),
  // dagamura - mahdavikia
  new Edge(Towns.dagamura, Towns.mahdavikia, EdgeType.mountain, [570, 485]),
  // dagamura - jxara
  new Edge(Towns.dagamura, Towns.jxara, EdgeType.wood, [670, 495]),
  // dagamura - lapphalya
  new Edge(Towns.dagamura, Towns.lapphalya, EdgeType.wood, [750, 475]),
  // lapphalya - jxara
  new Edge(Towns.lapphalya, Towns.jxara, EdgeType.wood, [760, 525]),
  // lapphalya - virst
  new Edge(Towns.lapphalya, Towns.virst, EdgeType.plain, [855, 520]),
  // lapphalya - elvenhold
  new Edge(Towns.lapphalya, Towns.elvenhold, EdgeType.plain, [950, 455]),
  // elvenhold - virst (water)
  new Edge(Towns.elvenhold, Towns.virst, EdgeType.lake, [985, 495]),
  // elvenhold - strykhaven (water)
  new Edge(Towns.elvenhold, Towns.strykhaven, EdgeType.lake, [1060, 485]),
  // elvenghold - beata
  new Edge(Towns.elvenhold, Towns.beata, EdgeType.plain, [1150, 455]),
  // mahdavikia - jxara
  new Edge(Towns.mahdavikia, Towns.jxara, EdgeType.mountain, [540, 570]),
  // jxara - virst
  new Edge(Towns.jxara, Towns.virst, EdgeType.plain, [770, 585]),
  // virst - strykhaven (water)
  new Edge(Towns.virst, Towns.strykhaven, EdgeType.lake, [1010, 540]),
  // virst - strykhaven
  new Edge(Towns.virst, Towns.strykhaven, EdgeType.mountain, [1025, 595]),
  // strykhaven - beata
  new Edge(Towns.strykhaven, Towns.beata, EdgeType.plain, [1190, 545]),
  // Wylhien - Usselen (river)
  new Edge(Towns.wylhien, Towns.usselen, EdgeType.river, [500, 205]),
  // Elvenhold - rivinia (river)
  new Edge(Towns.elvenhold, Towns.rivinia, EdgeType.river, [1080, 340]),
  // rivinia - tichih (river)
  new Edge(Towns.rivinia, Towns.tichih, EdgeType.river, [1060, 270]),
  // beata - elvenhold (river)
  new Edge(Towns.beata, Towns.elvenhold, EdgeType.river, [1180, 425]),
  // virst - jxara (river)
  new Edge(Towns.virst, Towns.jxara, EdgeType.river, [705, 600]),
  // jxara - mahdavikia (river)
  new Edge(Towns.jxara, Towns.mahdavikia, EdgeType.river, [490, 580]),
  // mahdavikia - grangor (river)
  new Edge(Towns.mahdavikia, Towns.grangor, EdgeType.river, [430, 505]),
];

export default class CounterScene extends Phaser.Scene {
  constructor() {
    super('counterscene');
  }
  create() {
    const graphics = this.add.graphics();
    const zoneRadius = (30 / 1600) * this.cameras.main.width;
    // creating all the dropzones for counters
    Edges.forEach(edge => {
      const zone = this.add
        .zone(
          (edge.position[0] / 1600) * this.cameras.main.width,
          (edge.position[1] / 750) * this.cameras.main.height
        )
        .setCircleDropZone(zoneRadius);
      // assign edge object to each zone
      zone.setData(edge);
    });

    // //// This block is hard coded. We will relate counters with player objects later //////
    let counterX = (750 / 1600) * this.cameras.main.width;
    Counters.forEach(counter => {
      const counterSprite = this.add
        .sprite(
          (counterX / 1600) * this.cameras.main.width,
          (670 / 750) * this.cameras.main.height,
          counter.counterType
        )
        .setInteractive();
      // set sprite data
      counterSprite.setData(counter);
      // set initial position and relative size
      counterSprite.setScale(0.25);
      // make counter draggable to any position
      this.input.setDraggable(counterSprite);
      counterX += (50 / 1600) * this.cameras.main.width;
    });
    Obstacles.forEach(obstacle => {
      const obstacleSprite = this.add
        .sprite(
          (counterX / 1600) * this.cameras.main.width,
          (670 / 750) * this.cameras.main.height,
          obstacle.obstacleType
        )
        .setInteractive();
      // set sprite data
      obstacleSprite.setData(obstacle);
      // set initial position and relative size
      obstacleSprite.setScale(0.25);
      // make counter draggable to any position
      this.input.setDraggable(obstacleSprite);
      counterX += (50 / 1600) * this.cameras.main.width;
    });
    // //// block ends here //////

    this.input.on('dragstart', (pointer, gameObject) => {
      gameObject.setTint(0x808080);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      graphics.lineStyle(8, 0x8a6440, 0.7);
      // highlight every draggable counter
      Edges.forEach(edge => {
        if (gameObject.data.list.allowedEdges.includes(edge.edgeType)) {
          graphics.strokeCircle(
            (edge.position[0] / 1600) * this.cameras.main.width,
            (edge.position[1] / 750) * this.cameras.main.height,
            zoneRadius / 3
          );
        }
      });
    });

    // if the counter is dragged to the drop zone, it will stay in it
    this.input.on('drop', (pointer, gameObject, dropZone) => {
      console.log(dropZone.data.values);
      if (
        gameObject.data.values.allowedEdges.includes(
          dropZone.data.values.edgeType
        ) &&
        dropZone.data.values.items.length === 0 &&
        gameObject.data.values.obstacleType !== ObstacleType.tree
      ) {
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        dropZone.data.values.items.push(gameObject.data.values);
      } else if (
        gameObject.data.values.obstacleType === ObstacleType.tree &&
        dropZone.data.values.items.length === 1
      ) {
        gameObject.x = dropZone.x - 30;
        gameObject.y = dropZone.y;
        dropZone.data.values.items.push(gameObject.data.values);
      } else {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    this.input.on('dragend', (pointer, gameObject, dropped) => {
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

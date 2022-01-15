import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    // /////////////////////////////////////////////////////////
    // ///// THIS IS WHERE ALL ASSETS WILL BE PRELOADED IN ////////
    // /////////////////////////////////////////////////////////

    // Assets for BoardScene.js
    this.load.image('brownBackground', 'assets/background/brown.jpg');
    this.load.image('map', 'assets/boardgame/map.png');

    // Assets for UIScene.js/MoveBootScene.js
    this.load.image('boot', 'assets/boardgame/green_boot.png');

    // Assets for UIScene.js/SettingsScene.js
    this.load.image('gear', 'assets/ui/iconpack/PNG/White/1x/gear.png');
    this.load.image('brown-box', 'assets/ui/rpgpack/PNG/buttonSquare_brown_pressed.png');
    this.load.image('brown-panel', 'assets/ui/rpgpack/PNG/buttonLong_brown_pressed.png');
    this.load.image('music-on', 'assets/ui/iconpack/PNG/White/1x/musicOn.png');
    this.load.image('music-off', 'assets/ui/iconpack/PNG/White/1x/musicOff.png');
    this.load.image('save', 'assets/ui/iconpack/PNG/White/1x/save.png');
    this.load.image('door', 'assets/ui/iconpack/PNG/White/1x/door.png');
    this.load.image('information', 'assets/ui/iconpack/PNG/White/1x/information.png');

    // Assets for UIScene.js/CheatSheetScene.js
    this.load.image('question', 'assets/ui/iconpack/PNG/White/1x/question.png');
    this.load.image('grid', 'assets/boardgame/grid.png');

    // Assets for UIScene.js/
    this.load.image('blue-actor', 'assets/ui/uipack_fixed/PNG/blue_actor.png');
    this.load.image('green-actor', 'assets/ui/uipack_fixed/PNG/green_circle.png');
    this.load.image('blue-actorcards', 'assets/ui/uipack_fixed/PNG/blue_actor_cards.png');

    // Assests for ...
    // Assests for CardScene.js
    this.load.image('giant-pig-card', 'assets/boardgame/T01.png');
    this.load.image('elf-cycle-card', 'assets/boardgame/T02.png');
    this.load.image('magic-cloud-card', 'assets/boardgame/T03.png');
    this.load.image('unicorn-card', 'assets/boardgame/T04.png');
    this.load.image('troll-wagon-card', 'assets/boardgame/T05.png');
    this.load.image('dragon-card', 'assets/boardgame/T06.png');
    this.load.image('raft-card', 'assets/boardgame/T07.png');
    this.load.image('witch-card', 'assets/boardgame/witch.png');
  }

  create() {
    // Starts MainScene.js
    this.scene.start('mainscene');
  }
}

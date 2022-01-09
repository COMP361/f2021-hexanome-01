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
    this.load.image('gear', 'assets/ui/iconpack/PNG/Black/1x/gear.png');
    this.load.image('grey-box', 'assets/ui/uipack_fixed/PNG/grey_box.png');
    this.load.image('grey-panel', 'assets/ui/uipack_fixed/PNG/grey_panel.png');
    this.load.image('music-on', 'assets/ui/iconpack/PNG/Black/1x/musicOn.png');
    this.load.image('music-off', 'assets/ui/iconpack/PNG/Black/1x/musicOff.png');
    this.load.image('save', 'assets/ui/iconpack/PNG/Black/1x/save.png');
    this.load.image('door', 'assets/ui/iconpack/PNG/Black/1x/door.png');
    this.load.image('information', 'assets/ui/iconpack/PNG/Black/1x/information.png');

    // Assets for UIScene.js/CheatSheetScene.js
    this.load.image('question', 'assets/ui/iconpack/PNG/Black/1x/question.png');
    this.load.image('grid', 'assets/boardgame/grid.png');

    // Assets for UIScene.js/
    this.load.image('blue-actor', 'assets/ui/uipack_fixed/PNG/blue_actor.png');
    this.load.image('green-actor', 'assets/ui/uipack_fixed/PNG/green_circle.png');
    this.load.image('blue-actorcards', 'assets/ui/uipack_fixed/PNG/blue_actor_cards.png');

    // Assets for CounterScene.js
    this.load.image('giant-pig-counter', 'assets/boardgame/M01.png');
    this.load.image('elfcycle', 'assets/boardgame/M02.png');
    this.load.image('magic-cloud', 'assets/boardgame/M03.png');
    this.load.image('unicorn', 'assets/boardgame/M04.png');
    this.load.image('troll-wagon', 'assets/boardgame/M05.png');
    this.load.image('dragon', 'assets/boardgame/M06.png');

    // Assests for ...
  }

  create() {
    // Starts MainScene.js
    this.scene.start('mainscene');
  }
}

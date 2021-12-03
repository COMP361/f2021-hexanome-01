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
    this.load.image('boot-green', 'assets/boardgame/boot-green.png');
    this.load.image('boot-blue', 'assets/boardgame/boot-blue.png');
    this.load.image('boot-purple', 'assets/boardgame/boot-purple.png');
    this.load.image('boot-red', 'assets/boardgame/boot-red.png');
    this.load.image('boot-yellow', 'assets/boardgame/boot-yellow.png');
    this.load.image('boot-black', 'assets/boardgame/boot-black.png');

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

    // Assests for ...
  }

  create() {
    // Starts MainScene.js
    this.scene.start('mainscene');
  }
}

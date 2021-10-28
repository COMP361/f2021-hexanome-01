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
    this.load.image('boot', 'assets/boardgame/green_boot.png');

    // Assets for UIScene.js/SettingsScene.js
    this.load.image('gear', 'assets/ui/iconpack/PNG/Black/1x/gear.png');
    this.load.image('grey-box', 'assets/ui/uipack_fixed/PNG/grey_box.png');
    this.load.image('grey-panel', 'assets/ui/uipack_fixed/PNG/grey_panel.png');
    this.load.image('music-on', 'assets/ui/iconpack/PNG/Black/1x/musicOn.png');
    this.load.image(
        'music-off', 'assets/ui/iconpack/PNG/Black/1x/musicOff.png');
    this.load.image('save', 'assets/ui/iconpack/PNG/Black/1x/save.png');
    this.load.image('door', 'assets/ui/iconpack/PNG/Black/1x/door.png');

    // Assets for UIScene.js/
    this.load.image('blue-actor', 'assets/ui/uipack_fixed/PNG/blue_actor.png');
    this.load.image(
        'blue-actorcards', 'assets/ui/uipack_fixed/PNG/blue_actor_cards.png');

    // Assests for ...
  }

  create() {
    this.scene.start('mainscene'); // Starts MainScene.js
  }
}

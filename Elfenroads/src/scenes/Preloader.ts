import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    // /////////////////////////////////////////////////////////
    // ///// THIS IS WHERE ALL ASSETS WILL BE PRELOADED IN ////////
    // /////////////////////////////////////////////////////////
    this.load.webfont(
      'MedievalSharp',
      'https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap'
    );

    // Assets for BoardScene.js
    this.load.image('brownBackground', 'assets/background/brown.jpg');
    this.load.image('map', 'assets/boardgame/mapNEW.png');

    // Assets for UIScene.js/UpperUIScene
    this.load.image('power', 'assets/ui/iconpack/PNG/White/1x/power.png');
    this.load.image('next', 'assets/ui/iconpack/PNG/White/1x/next.png');
    this.load.image(
      'checkmark',
      'assets/ui/iconpack/PNG/White/1x/checkmark.png'
    );
    this.load.image('gear', 'assets/ui/iconpack/PNG/White/1x/gear.png');
    this.load.image(
      'brown-box',
      'assets/ui/rpgpack/PNG/buttonSquare_brown_pressed.png'
    );
    this.load.image(
      'brown-panel',
      'assets/ui/rpgpack/PNG/buttonLong_brown_pressed.png'
    );
    this.load.image('music-on', 'assets/ui/iconpack/PNG/White/1x/musicOn.png');
    this.load.image(
      'music-off',
      'assets/ui/iconpack/PNG/White/1x/musicOff.png'
    );
    this.load.image('save', 'assets/ui/iconpack/PNG/White/1x/save.png');
    this.load.image('door', 'assets/ui/iconpack/PNG/White/1x/door.png');
    this.load.image(
      'information',
      'assets/ui/iconpack/PNG/White/1x/information.png'
    );
    this.load.image('question', 'assets/ui/iconpack/PNG/White/1x/question.png');
    this.load.image('grid', 'assets/boardgame/grid.png');

    // Assests for PlayerIconScene.ts
    this.load.image('blue-actor', 'assets/boardgame/actors/blue_actor.png');
    this.load.image('black-actor', 'assets/boardgame/actors/black_actor.png');
    this.load.image('green-actor', 'assets/boardgame/actors/green_actor.png');
    this.load.image('red-actor', 'assets/boardgame/actors/red_actor.png');
    this.load.image('yellow-actor', 'assets/boardgame/actors/yellow_actor.png');
    this.load.image('purple-actor', 'assets/boardgame/actors/purple_actor.png');
    this.load.image('blue-boot', 'assets/boardgame/boots/blue_boot.png');
    this.load.image('black-boot', 'assets/boardgame/boots/black_boot.png');
    this.load.image('green-boot', 'assets/boardgame/boots/green_boot.png');
    this.load.image('red-boot', 'assets/boardgame/boots/red_boot.png');
    this.load.image('yellow-boot', 'assets/boardgame/boots/yellow_boot.png');
    this.load.image('purple-boot', 'assets/boardgame/boots/purple_boot.png');
    this.load.image('blue-panel', 'assets/ui/uipack_fixed/PNG/blue_panel.png');
    this.load.image('red-panel', 'assets/ui/uipack_fixed/PNG/red_panel.png');
    this.load.image('black-panel', 'assets/ui/uipack_fixed/PNG/grey_panel.png');
    this.load.image(
      'green-panel',
      'assets/ui/uipack_fixed/PNG/green_panel.png'
    );
    this.load.image(
      'yellow-panel',
      'assets/ui/uipack_fixed/PNG/yellow_panel.png'
    );
    this.load.image(
      'purple-panel',
      'assets/ui/uipack_fixed/PNG/purple_panel.png'
    );
    this.load.image(
      'green-circle',
      'assets/ui/uipack_fixed/PNG/green_circle.png'
    );
    this.load.image(
      'blue-circle',
      'assets/ui/uipack_fixed/PNG/blue_circle.png'
    );
    this.load.image('red-circle', 'assets/ui/uipack_fixed/PNG/red_circle.png');
    this.load.image(
      'yellow-circle',
      'assets/ui/uipack_fixed/PNG/yellow_circle.png'
    );

    this.load.image(
      'black-circle',
      'assets/ui/uipack_fixed/PNG/grey_circle.png'
    );

    this.load.image(
      'purple-circle',
      'assets/ui/uipack_fixed/PNG/purple_circle.png'
    );

    // Assets for CounterScene.js
    this.load.image('unknown-counter', 'assets/boardgame/M00.png');
    this.load.image('pig', 'assets/boardgame/M01.png');
    this.load.image('elfcycle', 'assets/boardgame/M02.png');
    this.load.image('cloud', 'assets/boardgame/M03.png');
    this.load.image('unicorn', 'assets/boardgame/M04.png');
    this.load.image('troll-wagon', 'assets/boardgame/M05.png');
    this.load.image('dragon', 'assets/boardgame/M06.png');
    this.load.image('tree', 'assets/boardgame/M09.png');
    this.load.image('sea-monster', 'assets/boardgame/seamonster.png');
    this.load.image('bounce', 'assets/boardgame/bounce.png');
    this.load.image('double', 'assets/boardgame/double.png');
    this.load.image('gold-piece', 'assets/boardgame/treasure.png');

    // Assests for CardScene.js
    this.load.image('open-box', 'assets/ui/iconpack/PNG/White/1x/video.png');
    this.load.image('pig-card', 'assets/boardgame/T01.png');
    this.load.image('elfcycle-card', 'assets/boardgame/T02.png');
    this.load.image('cloud-card', 'assets/boardgame/T03.png');
    this.load.image('unicorn-card', 'assets/boardgame/T04.png');
    this.load.image('troll-wagon-card', 'assets/boardgame/T05.png');
    this.load.image('dragon-card', 'assets/boardgame/T06.png');
    this.load.image('raft-card', 'assets/boardgame/T07.png');
    this.load.image('witch-card', 'assets/boardgame/witch.png');
    this.load.image('gold-card', 'assets/boardgame/Gold.png');
  }

  create() {
    // Starts MainScene.js
    this.scene.start('mainscene');
  }
}

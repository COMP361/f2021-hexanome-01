import Phaser from 'phaser'
// import SettingsMenu from './SettingsMenu'

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('uiscene')
  }

  create() {
    this.scene.launch('movebootscene');  // Launch MoveBootScene.js
    // Create menu that will slide out after clicking settingsButton
    // const settingsMenu = new SettingsMenu(this);

    // Create settingsButton (gear icon)
    const {width} = this.scale;
    const settingsButton = this.add.sprite(width - 30, 30, 'grey-box');
    this.add.image(settingsButton.x, settingsButton.y, 'gear').setScale(0.7);

    // Add interactive pointer options for settingsButton
    settingsButton.setInteractive()
        .on('pointerdown',
            function() {
              this.setTint(0xd3d3d3);
            })
        .on('pointerout',
            function() {
              this.clearTint();
            })
        .on('pointerup', function() {
          this.clearTint()

          /*
          if (settingsMenu.isOpen){
              settingsMenu.hide();
          }else{
              settingsMenu.show();
          }
          */
        });

    const boot = this.add.sprite(
        this.cameras.main.width / 7, this.cameras.main.height / 5,
        'blue-actor');
    const boot_cards = this.add.sprite(
        this.cameras.main.width / 7 + boot.displayWidth * .47,
        this.cameras.main.height / 5, 'blue-actorcards');

    boot.setScale(0.3);
    boot_cards.setScale(0.3);

    boot_cards.setVisible(false);

    boot.setInteractive().on('pointerdown', function() {
      boot_cards.setVisible(true);
    });

    boot_cards.setInteractive().on('pointerdown', function() {
      boot_cards.setVisible(false);
    });
  }
}

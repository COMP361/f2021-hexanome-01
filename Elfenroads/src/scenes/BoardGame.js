import Phaser from 'phaser'

export default class BoardGame extends Phaser.Scene {
	
    preload() {

        // this is where all the images are imported

        this.load.image('brownBackground', 'assets/background/brown.jpg');
        this.load.image('map', 'assets/boardgame/map.png')
        this.load.image('boot', 'assets/boardgame/green_boot.png')
    }

    create() {

        // all the images are displayed here

        // setting the background
        var background = this.add.image(0, 0, 'brownBackground').setOrigin(0,0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        var map = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map');
        map.setDisplaySize(this.cameras.main.width * 0.6, this.cameras.main.height * 0.7);

        // move boot
        var elfenboot = this.add.sprite(this.cameras.main.width *0.65, this.cameras.main.height * 0.55, 'boot').setInteractive();
        elfenboot.setDisplaySize(this.cameras.main.width * 0.18, this.cameras.main.height * 0.18)
        elfenboot.on('pointerover', function () {

            this.setTint(0x00ff00);
    
        });
    
        elfenboot.on('pointerout', function () {
    
            this.clearTint();
    
        });

        this.input.setDraggable(elfenboot);

        this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setTint(0x808080);

        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('dragend', function (pointer, gameObject) {

            gameObject.clearTint();

        });
    }
}

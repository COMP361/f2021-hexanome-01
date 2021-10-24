import Phaser from 'phaser'

export default class BoardGame extends Phaser.Scene {
	
    preload() {

        // this is where all the images are imported

        this.load.image('brownBackground', 'assets/background/brown.jpg');
        this.load.image('map', 'assets/boardgame/map.png');
    }

    create() {

        // all the images are displayed here

        // setting the background
        let background = this.add.image(0, 0, 'brownBackground').setOrigin(0,0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        let map = this.add.image(1000, 500, 'map');
        map.setScale(0.2);

    }
}

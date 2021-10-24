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
        const background = this.add.image(0, 0, 'brownBackground').setOrigin(0,0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        const map = this.add.image(0, 0, 'map').setOrigin(-0.35, -0.1);
        map.setDisplaySize(0.6 * window.innerWidth, 0.75 * window.innerHeight);

    }
}

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
        const background = this.add.image(0, 0, 'brownBackground').setOrigin(0,0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

    
        const map = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map');
        map.setDisplaySize(this.cameras.main.width * 0.6, this.cameras.main.height * 0.7);

 
    }
}

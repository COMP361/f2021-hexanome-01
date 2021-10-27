import Phaser from 'phaser'

export default class BoardScene extends Phaser.Scene {
	
    constructor()
	{
		super('boardscene')
	}

    create(){
        
        // Send boardscene to back so that UI can sit on top.
        this.scene.sendToBack();

        // Create background
        const background = this.add.image(0, 0, 'brownBackground').setOrigin(0,0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        // Create map
        const map = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map');
        map.setDisplaySize(this.cameras.main.width * 0.6, this.cameras.main.height * 0.7);   
        
    }
}

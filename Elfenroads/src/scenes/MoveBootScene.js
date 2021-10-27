import Phaser from 'phaser'

export default class BoardGame extends Phaser.Scene {
    constructor(){
		super('movebootscene')
	}
    create() {
        /* move boot */
        // set initial position and relative size
        const elfenboot = this.add.sprite(this.cameras.main.width *0.65, this.cameras.main.height * 0.55, 'boot').setInteractive();
        elfenboot.setDisplaySize(this.cameras.main.width * 0.15, this.cameras.main.height * 0.15)

        // make elfenboot draggable to any position
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
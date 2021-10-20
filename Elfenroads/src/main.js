/** @type {import("../typings/phaser")} */

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('woodBkgrd', 'public/assets/wood.png');
}

function create () {
    this.add.image(313, 200, 'woodBkgrd').setOrigin(0, 0);
}

function update () {
    
}
import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene
{

    constructor()
    {
        super('mainscene')
    }

    create()
    {
        ////////////////////////////////////////////////////////////
        ///////// MAIN SCENE WILL LAUNCH ALL OTHER SCENES //////////
        ////////////////////////////////////////////////////////////

        this.scene.launch('boardscene'); // Launch BoardScene.js
        this.scene.launch('uiscene');    // Launch UIScene.js
    }
}

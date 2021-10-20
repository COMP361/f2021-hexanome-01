import Phaser from 'phaser'

import BoardGame from './scenes/BoardGame'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [BoardGame]
}

export default new Phaser.Game(config)

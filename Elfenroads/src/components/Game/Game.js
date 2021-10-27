import './Game.scss';
import Phaser from 'phaser';

// Plug in for better image scaling
import {Plugin as NineSlicePlugin} from 'phaser3-nineslice'

// All of our scenes in Phaser Game
import Preloader from '../../scenes/Preloader'
import MainScene from '../../scenes/MainScene'
import UIScene from '../../scenes/UIScene'
import BoardScene from '../../scenes/BoardScene'
import MoveBootScene from '../../scenes/MoveBootScene';

// React/ion-phaser stuff
import { IonPhaser } from '@ion-phaser/react';
import { useState, useRef } from 'react';

// Phaser Game config
const game = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    plugins: {
		global: [ NineSlicePlugin.DefaultCfg ]
	},
    scene: [Preloader, MainScene, UIScene, BoardScene, MoveBootScene]
}

export default function Game () {
    const gameRef = useRef(null)
    const [initialize, setInitialize] = useState(true)
    return (
        <IonPhaser className="game" ref={gameRef} game={game} initialize={initialize} />
    )
}
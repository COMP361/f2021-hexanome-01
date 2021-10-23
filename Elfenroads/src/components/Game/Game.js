import './Game.scss';
import Phaser from 'phaser';
import BoardGame from '../../scenes/BoardGame';
import { IonPhaser } from '@ion-phaser/react';
import { useState, useRef } from 'react';

const game = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    scene: [BoardGame]
}

export default function Game () {
    const gameRef = useRef(null)
    const [initialize, setInitialize] = useState(true)
    return (
        <IonPhaser className="game" ref={gameRef} game={game} initialize={initialize} />
    )
}
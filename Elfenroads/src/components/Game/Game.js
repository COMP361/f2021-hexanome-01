import './Game.scss';

// React/ion-phaser stuff
import {IonPhaser} from '@ion-phaser/react';
import Phaser from 'phaser';

// Plug in for better image scaling
import {Plugin as NineSlicePlugin} from 'phaser3-nineslice';
import {useRef, useState} from 'react';

import BoardScene from '../../scenes/BoardScene';
import MainScene from '../../scenes/MainScene';
import MoveBootScene from '../../scenes/MoveBootScene';

// All of our scenes in Phaser Game
import Preloader from '../../scenes/Preloader';
import SettingsScene from '../../scenes/SettingsScene';
import UIScene from '../../scenes/UIScene';

// Phaser Game config
const game = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  plugins: {global: [NineSlicePlugin.DefaultCfg]},
  scene:
      [Preloader, MainScene, BoardScene, UIScene, MoveBootScene, SettingsScene],
};

export default function
Game() {
    const gameRef = useRef(null);
    const [initialize] = useState(true);
    return (
        <IonPhaser className='game' ref={gameRef} game={game} initialize={initialize} />
    );
}

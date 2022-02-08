import './Game.scss';

// React/ion-phaser stuff
import {IonPhaser} from '@ion-phaser/react';
import Phaser from 'phaser';
import React from 'react';
// Plug in for better image scaling
import {Plugin as NineSlicePlugin} from 'phaser3-nineslice';
import {useRef, useState} from 'react';

// All of our scenes in Phaser Game
import BoardScene from '../../scenes/BoardScene';
import MainScene from '../../scenes/MainScene';
import MoveBootScene from '../../scenes/MoveBootScene';
import Preloader from '../../scenes/Preloader';
import UpperUIScene from '../../scenes/UpperUIScene';
import UIScene from '../../scenes/UIScene';
import TownPieceScene from '../../scenes/TownPieceScene';
import CardScene from '../../scenes/CardScene';
import PlayerTokenScene from '../../scenes/PlayerTokenScene';
import CounterScene from '../../scenes/CounterScene';

// Phaser Game config
const game = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  plugins: {global: [NineSlicePlugin.DefaultCfg]},
  scene: [
    Preloader,
    MainScene,
    BoardScene,
    UIScene,
    MoveBootScene,
    UpperUIScene,
    TownPieceScene,
    CardScene,
    PlayerTokenScene,
    CounterScene,
  ],
};

export default function Game() {
  const gameRef = useRef(null);
  const [initialize] = useState(true);
  return (
    <IonPhaser
      className="game"
      ref={gameRef}
      game={game}
      initialize={initialize}
    />
  );
}

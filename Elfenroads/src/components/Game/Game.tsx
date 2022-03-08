import './Game.scss';

// React/ion-phaser stuff
import {IonPhaser} from '@ion-phaser/react';
import Phaser from 'phaser';
import React from 'react';
// Plug in for better image scaling
import {Plugin as NineSlicePlugin} from 'phaser3-nineslice';
import {useRef, useState} from 'react';

// All of our scenes in Phaser Game
import BoardScene from '../../scenes/UIScenes/BoardScene';
import MainScene from '../../scenes/MainScene';
import MoveBootScene from '../../scenes/GameplayScenes/MoveBootScene';
import Preloader from '../../scenes/Preloader';
import UpperUIScene from '../../scenes/UIScenes/UpperUIScene';
import InventoryScene from '../../scenes/UIScenes/InventoryScene';
import PlayerIconScene from '../../scenes/UIScenes/PlayerIconScene';

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
    MoveBootScene,
    UpperUIScene,
    InventoryScene,
    PlayerIconScene,
  ],
};

export default function Game({socket}: any) {
  console.log(socket);
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

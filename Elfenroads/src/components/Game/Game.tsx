import './Game.scss';

// React/ion-phaser stuff
import {IonPhaser} from '@ion-phaser/react';
import Phaser from 'phaser';
import React from 'react';

// Plug in for using Web fonts
// eslint-disable-next-line node/no-unpublished-import
import {WebFontLoaderPlugin} from 'phaser3-webfont-loader';

// Plug in for better image scaling
import {Plugin as NineSlicePlugin} from 'phaser3-nineslice';
import {useRef, useState} from 'react';

// All of our scenes in Phaser Game
import UIScene from '../../scenes/UIScene';
import MainScene from '../../scenes/MainScene';
import Preloader from '../../scenes/Preloader';
import DrawCountersScene from '../../scenes/GameplayScenes/DrawCountersScene';
import PlanRouteScene from '../../scenes/GameplayScenes/PlanRouteScene';
import SelectionScene from '../../scenes/GameplayScenes/SelectCardnEdgeScene';
import WinnerScene from '../../scenes/GameplayScenes/WinnerScene';
import RoundCleanUpScene from '../../scenes/GameplayScenes/RoundCleanUpScene';
import AuctionScene from '../../scenes/GameplayScenes/AuctionScene';
import DrawCardsScene from '../../scenes/GameplayScenes/DrawCardsScene';

// Phaser Game config
const game = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  plugins: {
    global: [
      NineSlicePlugin.DefaultCfg,
      {
        key: 'WebFontLoader',
        plugin: WebFontLoaderPlugin,
        start: true,
      },
    ],
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 600},
    },
  },
  scene: [
    Preloader,
    MainScene,
    UIScene,
    DrawCountersScene,
    PlanRouteScene,
    SelectionScene,
    WinnerScene,
    RoundCleanUpScene,
    AuctionScene,
    DrawCardsScene,
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

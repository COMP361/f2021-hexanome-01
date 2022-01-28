import './MainMenu.scss';
import React from 'react';
import logo from '../../assets/img/elfenroads.png';

import Modal from './Modal';
import Scene from './Scene';

export default function MainMenu({setGame}: any) {
  return (
    <div className="main-menu">
      <Scene />
      <div className="main-menu__content">
        <img
          className="main-menu__logo"
          src={logo}
          alt="Elfenroads"
          height="80"
        />
        <Modal setGame={setGame} />
      </div>
    </div>
  );
}

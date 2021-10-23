import logo from './assets/img/elfenroads.png';
import './App.scss';
import Scene from './components/Scene';
import Modal from './components/Modal';
import Game from './components/Game/Game';
import { useState } from 'react';

function App() {
  const [game, setGame] = useState(false);

  return (
    <div className="main">
      {!game && <><Scene />
      <div className="main__content">
        <img className="main__logo" src={logo} alt="Elfenroads" height="80" />
        <Modal setGame={setGame} />
      </div></>}
      {game &&  <Game />}
    </div>
  );
}

export default App;

import './App.scss';
import MainMenu from './components/MainMenu';
import Game from './components/Game/Game';
import {useState} from 'react';

function App() {
  const [game, setGame] = useState(null);

  return (
    <div className="App">
      {game ? <Game /> : <MainMenu setGame={setGame} />}
    </div>
  );
}

export default App;

import './App.scss';
import MainMenu from './components/MainMenu';
import Game from './components/Game/Game';
import {useState} from 'react';

function App() {
  const [socket, setSocket] = useState(null);

  return (
    <div className="App">
      {socket ? <Game socket={socket} /> : <MainMenu setSocket={setSocket} />}
    </div>
  );
}

export default App;

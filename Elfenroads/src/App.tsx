import './App.scss';
import MainMenu from './components/MainMenu';
import Game from './components/Game/Game';
import {useState} from 'react';
import React from 'react';

export default function App() {
  const [socket, setSocket] = useState(null);

  return (
    <div className="App">
      <Game socket={socket} />
    </div>
  );
}

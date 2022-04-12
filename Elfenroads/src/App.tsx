import './App.scss';
import MainMenu from './components/MainMenu';
import Game from './components/Game/Game';
import {useEffect, useState} from 'react';
import React from 'react';
import {getUser, storeUser} from './utils/storageUtils';
import {verifyUser} from './utils/queryUtils';

export default function App() {
  const [socket, setSocket] = useState(null);
  let interval: any;
  useEffect(() => {
    localStorage.setItem('savestate', '{}');
  }, []);
  useEffect(() => {
    interval = setInterval(() => {
      const user = getUser() || null;
      if (user) {
        verifyUser(user.password, user.name)
          .then(res => res.data.data)
          .then(data => {
            if (data?.verifyLSUser) {
              console.log(
                `Storing user: ${data.verifyLSUser.lsUser.name} ${data.verifyLSUser.access_token} ${user.password}`
              );
              storeUser(data.verifyLSUser, user.password);
            }
          })
          .catch(console.log);
      }
    }, 1200000);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      {socket ? <Game socket={socket} /> : <MainMenu setSocket={setSocket} />}
    </div>
  );
}

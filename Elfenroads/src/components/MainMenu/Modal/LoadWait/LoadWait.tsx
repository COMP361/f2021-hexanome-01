import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {
  allSessions,
  createGameUser,
  launchSession,
  singleSession,
} from '../../../../utils/queryUtils';
import {
  getSessionId,
  getUser,
  storeSession,
  storeSessionId,
} from '../../../../utils/storageUtils';
import './LoadWait.scss';
import {io} from 'socket.io-client';
import SocketManager from '../../../../managers/SocketManager';

export default function LoadWait({setSocket}: any) {
  const [session, _] = useState(
    JSON.parse(localStorage.getItem('savestate') || '')
  );
  const [users, setUsers]: [any, any] = useState([]);
  const usersRef = useRef(users);
  const [s, setS]: [any, any] = useState(null);

  useEffect(() => {
    const {name} = getUser();
    setUsers([
      ...users,
      session.session.users.find((user: any) => user.name === name),
    ]);
    storeSession(session.session, () => {});
    storeSessionId(
      session.sessionId,
      session.session.gameSession.gameParameters.displayName,
      () => {}
    );
    const socket = io('http://elfenroads.westus3.cloudapp.azure.com:3455/');
    const headers = {
      game: session.session.gameSession.gameParameters.displayName,
      session_id: session.sessionId,
    };
    socket.emit('joinLobby', headers);
    const poller = setInterval(() => {
      const {name} = getUser();
      socket.emit('statusChange', {
        ...headers,
        data: {
          name: name,
        },
      });
    }, 1000);
    socket.on('statusChange', data => {
      if (data.msg.data.launch) {
        console.log('launching');
        clearInterval(poller);
        setSocket(true);
        return;
      }
      const _user = usersRef.current.find((user: any) => {
        return user.name === data.msg.data.name;
      });
      if (_user) return;
      const act = session.session.users.find(
        (user: any) => user.name === data.msg.data.name
      );
      setUsers([...usersRef.current, act]);
    });
    setS(socket);
  }, []);

  useEffect(() => (usersRef.current = users), [users]);

  const launch = () => {
    const headers = {
      game: session.session.gameSession.gameParameters.displayName,
      session_id: session.sessionId,
    };
    const {name} = getUser();
    s.emit('statusChange', {
      ...headers,
      data: {
        name: name,
        launch: true,
      },
    });
  };

  return (
    <section className="loadwait">
      {session && (
        <>
          <p className="loadwait__game">
            {
              session.session.gameSession.gameParameters.displayName.split(
                '-'
              )[1]
            }
          </p>
          <h1 className="loadwait__title">
            {
              session.session.gameSession.gameParameters.displayName.split(
                '-'
              )[0]
            }
          </h1>
          <h2 className="loadwait__subtitle">
            Players{' '}
            <span className="loadwait__player-count">
              {session.session.users.length +
                '/' +
                session.session.gameSession.gameParameters.maxSessionPlayers}
            </span>
          </h2>
          <ul className="loadwait__player-list">
            {users.length > 0 &&
              users.map((player: any, ind: any) => (
                <li key={player?.name} className="loadwait__player">
                  <div
                    className="color"
                    style={{background: `#${player?.preferredColour}`}}
                  ></div>
                  <p>{player?.name}</p>
                </li>
              ))}
          </ul>
          <div className="loadwait__footer">
            {getUser().name === session.session.gameSession.creator &&
              users.length === session.session.users.length && (
                <button className="loadwait__button" onClick={() => launch()}>
                  Start
                </button>
              )}
            {getUser().name !== session.session.gameSession.creator && (
              <p>
                Waiting for
                <b> {session.session.gameSession.creator} </b>
                to start the game.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

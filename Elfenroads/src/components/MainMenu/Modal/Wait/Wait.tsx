import {useEffect, useState} from 'react';
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
import './Wait.scss';

export default function Wait({socket, setSocket}: any) {
  const [session, setSession]: [any, any] = useState(null);
  const [sessionId, setSessionId]: [any, any] = useState(getSessionId());

  // Initially, we need to find the session by searching for the incorrect session
  // id, then we can update our sessionId to be the correct one and use getSession
  // moving forward.
  const findSession = () => {
    allSessions()
      .then(res => res.data.data)
      .then(data => {
        const sessions = data.AllSessions;
        sessions.forEach((session: any) => {
          if (session.sessionid === sessionId) {
            console.log(session.gameParameters.displayName);
            storeSessionId(
              session.sessionid,
              session.gameParameters.displayName,
              null
            );
            setSessionId(session.sessionid);
            socket.emit('joinLobby', {
              game: session.gameParameters.displayName,
              session_id: session.sessionid,
            });
          }
        });
      })
      .catch(console.log);
  };

  useEffect(() => findSession(), []);

  // With the correct session id we can now query the single session and save the
  // updated data in state.
  const getSession = () => {
    // socket.emit('chat', {
    //   msg: '',
    //   game: 'ElfenlandVer1',
    //   session_id: sessionId,
    // });
    singleSession(sessionId)
      .then(res => res.data.data)
      .then(data => {
        if (data.Session.gameSession.launched) {
          storeSession(data.Session, () => setSocket(socket));
        } else {
          setSession(data.Session);
        }
      })
      .catch(console.log);
  };

  // Once we have the correct session id in state, we emit the joinLobby message to
  // the socket, join the correct session, subscribe to joinLobby updates which will
  // refetch our session data, and finally fetch our initial session data.
  let interval: any;
  useEffect(() => {
    interval = setInterval(getSession, 2000);
    getSession();

    return () => clearInterval(interval);
  }, [sessionId]);

  const startGame = () => {
    const {accessToken} = getUser();
    launchSession(accessToken, sessionId);
  };

  return (
    <section className="wait">
      {session && (
        <>
          <p className="wait__game">
            {session.gameSession.gameParameters.displayName.split('-')[1]}
          </p>
          <h1 className="wait__title">
            {session.gameSession.gameParameters.displayName.split('-')[0]}
          </h1>
          <h2 className="wait__subtitle">
            Players{' '}
            <span className="wait__player-count">
              {session.users.length +
                '/' +
                session.gameSession.gameParameters.maxSessionPlayers}
            </span>
          </h2>
          <ul className="wait__player-list">
            {session.users.map((player: any, ind: any) => (
              <li key={player.name} className="wait__player">
                <div
                  className="color"
                  style={{background: `#${player.preferredColour}`}}
                ></div>
                <p>{player.name}</p>
              </li>
            ))}
          </ul>
          <div className="wait__footer">
            {getUser().name === session.gameSession.creator &&
              session.users.length >=
                session.gameSession.gameParameters.minSessionPlayers && (
                <button className="wait__button" onClick={startGame}>
                  Start
                </button>
              )}
            {getUser().name !== session.gameSession.creator && (
              <p>
                Waiting for
                <b> {session.gameSession.creator} </b>
                to start the game.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

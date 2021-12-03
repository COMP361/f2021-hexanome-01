import {useEffect, useState} from 'react';
import {allSessions, createGameUser, launchSession, singleSession} from '../../../../utils/queryUtils';
import {getSessionId, getUser, storeSessionId} from '../../../../utils/storageUtils';
import './Wait.scss';

//               green     blue      purple    red       yellow    black
const colors = ['238f1b', '2443bf', '511d96', 'ad211c', 'e0a10d', '000000'];

export default function Wait({socket, setSocket}) {
    const [session, setSession] = useState(null);
    const [sessionId, setSessionId] = useState(getSessionId());

    const {accessToken, name} = getUser();

    // Initially, we need to find the session by searching for the incorrect session
    // id, then we can update our sessionId to be the correct one and use getSession
    // moving forward.
    const findSession = () => {
        allSessions()
        .then((res) => res.data.data)
        .then((data) => {
            const sessions = JSON.parse(data.AllSessions);
            Object.keys(sessions).forEach((key) => {
                if (key.substr(0, 8) === sessionId.substr(0, 8)) {
                    storeSessionId(key);
                    // Once we have the correct session id, we create a game user for
                    // the the newly joined player. If successful, we update the
                    // session id in state
                    console.log(sessions[key]);
                    createGameUser(colors[sessions[key].players.length-1], key, name)
                    .then(() => setSessionId(key))
                    .catch(console.log);
                }
            });
        })
        .catch(console.log);
    };

    useEffect(() => findSession(), []);

    // With the correct session id we can now query the single session and save the
    // updated data in state.
    const getSession = () => {
        singleSession(sessionId)
        .then((res) => res.data.data)
        .then((data) => {
            if (data.Session.launched) {
                setSocket(socket);
            } else {
                setSession(data.Session);
            }
        })
        .catch(console.log);
    };

    // Once we have the correct session id in state, we emit the joinLobby message to
    // the socket, join the correct session, subscribe to joinLobby updates which will
    // refetch our session data, and finally fetch our initial session data.
    let interval;
    useEffect(() => {
        // socket.emit('joinLobby', {session_id: sessionId});
        // socket.on('joinLobby', getSession);
        interval = setInterval(getSession, 500);
        getSession();

        return () => clearInterval(interval);
    }, [sessionId]);

    const startGame = () => launchSession(`=${accessToken}`, sessionId);

    return (
        <section className='wait'>
            {session && <>
                <p className='wait__game'>Elfenland</p>
                <h1 className="wait__title">{session.gameParameters.displayName}</h1>
                <h2 className='wait__subtitle'>Players <span className='wait__player-count'>{
                    session.players.length + '/' + session.gameParameters.maxSessionPlayers
                }</span></h2>
                <ul className='wait__player-list'>
                    {session.players.map((player, ind) => (
                        <li key={player} className='wait__player'>
                            <div className="color" style={{background: `#${colors[ind]}`}}></div>
                            <p>{player}</p>
                        </li>
                    ))}
                </ul>
                <div className='wait__footer'>
                    {name === session.creator && session.players.length >= session.gameParameters.minSessionPlayers &&
                    <button className='wait__button' onClick={startGame}>Start</button>}
                    {name !== session.creator && <p>Waiting for <b>{session.creator}</b> to start the game.</p>}
                </div>
            </>}
        </section>
    );
}

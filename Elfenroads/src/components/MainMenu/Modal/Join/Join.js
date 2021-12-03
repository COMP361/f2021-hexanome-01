import {useEffect, useState} from 'react';
import {allSessions, joinSession} from '../../../../utils/queryUtils';
import {getUser, storeSessionId} from '../../../../utils/storageUtils';
import './Join.scss';

export default function Join({wait}) {
    const [games, setGames] = useState([]);
    const {accessToken, name} = getUser();

    useEffect(() => {
        allSessions()
        .then((res) => res.data.data)
        .then((data) => {
            const gamesObj = JSON.parse(data.AllSessions);
            setGames(Object.keys(gamesObj).map((game, ind) => {
                game = gamesObj[game];
                if (!game.launched) {
                    const gameObj = game;
                    gameObj['session_id'] = Object.keys(gamesObj)[ind];
                    return gameObj;
                }
            }));
        });
    }, []);


    const attemptJoin = (sessionId) => {
        storeSessionId(sessionId, () => joinSession(accessToken, name, sessionId).then(wait).catch(console.log));
    };

    return (
        <section className='join'>
            <h1 className='join__title'>Join Game</h1>
            <table className='join__table'>
                <tr>
                    <th className='join__header'>Game</th>
                    <th className='join__header'>Host</th>
                    <th className='join__header'>Players</th>
                    <th className='join__header'></th>
                </tr>
            </table>
            <div className='join__table-wrapper'>
                { games.length ? <table className='join__table'>
                    {games.map((game) => (
                        <tr className='join__row' key={game.session_id}>
                            <td className='join__td'>{game.gameParameters.displayName}</td>
                            <td className='join__td'>{game.creator}</td>
                            <td className='join__td'>{game.players.length + '/' + game.gameParameters.maxSessionPlayers}</td>
                            <td className='join__td'><button onClick={() => attemptJoin(game.session_id)} className='join__button'>Join Game</button></td>
                        </tr>
                    ))}
                </table> : <p>No games available.</p>}
            </div>
        </section>
    );
}

import {useEffect, useState} from 'react';
import {allSessions, joinSession} from '../../../../utils/queryUtils';
import {getUser, storeSessionId} from '../../../../utils/storageUtils';
import './Join.scss';
import React from 'react';

export default function Join({wait}: any) {
  const [games, setGames]: [any[], any] = useState([]);
  const {accessToken, name} = getUser();

  useEffect(() => {
    allSessions()
      .then((res: any) => res.data.data)
      .then((data: any) => {
        const gamesObj = JSON.parse(data.AllSessions);
        console.log(gamesObj);
        setGames(
          Object.keys(gamesObj).map((game: any, ind: any) => {
            game = gamesObj[game];
            console.log(game);
            if (!game.launched) {
              const gameObj = game;
              gameObj['session_id'] = Object.keys(gamesObj)[ind];
              return gameObj;
            }
          })
        );
      });
  }, []);

  const attemptJoin = (sessionId: any) => {
    storeSessionId(sessionId, () =>
      joinSession(accessToken, name, sessionId).then(wait).catch(console.log)
    );
  };

  return (
    <section className="join">
      <h1 className="join__title">Join Game</h1>
      <table className="join__table">
        <tr>
          <th className="join__header">Game</th>
          <th className="join__header">Host</th>
          <th className="join__header">Players</th>
          <th className="join__header"></th>
        </tr>
      </table>
      <div className="join__table-wrapper">
        {games.length ? (
          <table className="join__table">
            {games.map(
              game =>
                game &&
                game.players.length < game.gameParameters.maxSessionPlayers && (
                  <tr className="join__row" key={game.session_id}>
                    <td className="join__td">
                      {game.gameParameters.displayName}
                    </td>
                    <td className="join__td">{game.creator}</td>
                    <td className="join__td">
                      {game.players.length +
                        '/' +
                        game.gameParameters.maxSessionPlayers}
                    </td>
                    <td className="join__td">
                      <button
                        onClick={() => attemptJoin(game.session_id)}
                        className="join__button"
                      >
                        Join Game
                      </button>
                    </td>
                  </tr>
                )
            )}
          </table>
        ) : (
          <i>No games available.</i>
        )}
      </div>
    </section>
  );
}
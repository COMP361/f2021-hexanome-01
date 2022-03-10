import {useEffect, useState} from 'react';
import {allSessions} from '../../../../utils/queryUtils';
import {storeSessionId} from '../../../../utils/storageUtils';
import './Join.scss';
import React from 'react';

export default function Join({choose}: any) {
  const [games, setGames]: [any[], any] = useState([]);

  useEffect(() => {
    allSessions()
      .then((res: any) => res.data.data)
      .then((data: any) => setGames(data.AllSessions));
  }, []);

  const attemptJoin = (sessionId: any) => {
    storeSessionId(sessionId, 'ElfenlandVer1', choose);
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
                  <tr className="join__row" key={game.sessionid}>
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
                        onClick={() => attemptJoin(game.sessionid)}
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

import {useState} from 'react';
import {storeSessionId} from '../../../../utils/storageUtils';
import './Load.scss';
import React from 'react';
import {saves} from '../../../../utils/saveStates';

export default function Load({choose}: any) {
  const [games, setGames]: [any[], any] = useState(Object.values(saves));

  const attemptJoin = (game: any) => {
    localStorage.setItem('savestate', JSON.stringify(game));
    choose();
  };

  return (
    <section className="load">
      <h1 className="load__title">Load Save</h1>
      <table className="load__table">
        <tr>
          <th className="load__header">Game</th>
          <th className="load__header">Host</th>
          <th className="load__header"></th>
        </tr>
      </table>
      <div className="load__table-wrapper">
        {games.length ? (
          <table className="load__table">
            {games &&
              games.map(
                game =>
                  game &&
                  typeof console.log(game) && (
                    <tr className="load__row" key={game.sessionid}>
                      <td className="load__td">
                        {game.session.gameSession.gameParameters.displayName.replace(
                          '-',
                          ' '
                        )}
                      </td>
                      <td className="load__td">
                        {game.session.gameSession.creator}
                      </td>
                      <td className="load__td">
                        <button
                          onClick={() => attemptJoin(game)}
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

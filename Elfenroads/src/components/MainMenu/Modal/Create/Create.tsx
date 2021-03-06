import {changeColor, createSession} from '../../../../utils/queryUtils';
import {v4 as uuidv4} from 'uuid';
import './Create.scss';
import {getUser, storeSessionId} from '../../../../utils/storageUtils';
import React from 'react';

export default function Create({wait}: any) {
  // const id = uuidv4();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const game = e.target.game.value;
    const boot = e.target.boot.value;
    const {accessToken, name} = getUser();

    if (game) {
      changeColor(boot, accessToken, name)
        .then(() => {
          console.log(game);
          console.log(createSession);
          createSession(accessToken, name, game)
            .then(res => res.data)
            .then(data => {
              console.log(data);
              return storeSessionId(
                data.data.createSession.gameSession.sessionid,
                game,
                wait
              );
            })
            .catch(console.log);
        })
        .catch(console.log);
    }
  };

  return (
    <section className="create">
      <h1 className="create__title">Create Game</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form__group">
          <div className="form__input form__input--radio">
            <h3>Elfenland</h3>
            <input
              type="radio"
              id="elfenland-base"
              name="game"
              value="Elfenland-base"
            />
            <label htmlFor="Elfenland">Base Game</label>
            <br />
            <input
              type="radio"
              id="ElfenlandVer1"
              name="game"
              value="Elfenland-4rounds"
            />
            <label htmlFor="Elfenland">4 Rounds</label>
            <br />
            <input
              type="radio"
              id="ElfenlandVer2"
              name="game"
              value="Elfenland-destination"
            />
            <label htmlFor="Elfenland">Destination Towns</label>
          </div>
          <div className="form__input form__input--radio">
            <h3>Elfengold</h3>
            <input
              type="radio"
              id="Elfengold"
              name="game"
              value="Elfengold-base"
            />
            <label htmlFor="Elfengold">Base Game</label>
            <br />
            <input
              type="radio"
              id="Elfengold"
              name="game"
              value="Elfengold-random"
            />
            <label htmlFor="Elfengold">Random Gold Values</label>
            <br />
            <input
              type="radio"
              id="Elfengold"
              name="game"
              value="Elfengold-destination"
            />
            <label htmlFor="Elfengold">Destination Towns</label>
            <br />
            <input
              type="radio"
              id="Elfengold"
              name="game"
              value="Elfengold-witch"
            />
            <label htmlFor="Elfengold">Witch Card</label>
          </div>
        </div>
        <div
          className="form__group"
          style={{
            padding: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <h3 style={{paddingRight: '0.5rem'}}>Boot Color</h3>
          <select id="boot">
            <option value="008000">Green</option>
            <option value="0000FF">Blue</option>
            <option value="800080">Purple</option>
            <option value="FF0000">Red</option>
            <option value="FFFF00">Yellow</option>
            <option value="000000">Black</option>
          </select>
        </div>
        <button className="form__button form__button--create">Create</button>
      </form>
    </section>
  );
}

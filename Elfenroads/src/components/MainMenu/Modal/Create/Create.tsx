import {createSession} from '../../../../utils/queryUtils';
import {v4 as uuidv4} from 'uuid';
import './Create.scss';
import {getUser, storeSessionId} from '../../../../utils/storageUtils';
import React from 'react';

export default function Create({wait}: any) {
  // const id = uuidv4();
  const {accessToken, name} = getUser();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const game = e.target.game.value;

    if (game) {
      createSession(accessToken, name, game)
        .then(res => res.data.data)
        .then(data =>
          storeSessionId(data.createSession.gameSession.sessionid, game, wait)
        )
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
              id="ElfenlandVer1"
              name="game"
              value="ElfenlandVer1"
            />
            <label htmlFor="Elfenland">Version 1</label>
            <br />
            <input
              type="radio"
              id="ElfenlandVer2"
              name="game"
              value="ElfenlandVer2"
            />
            <label htmlFor="Elfenland">Version 2</label>
          </div>
          <div className="form__input form__input--radio">
            <h3>Elfengold</h3>
            <input type="radio" id="Elfengold" name="game" value="elfengold" />
            <label htmlFor="Elfengold">Elfengold</label>
          </div>
        </div>
        <button className="form__button form__button--create">Create</button>
      </form>
    </section>
  );
}

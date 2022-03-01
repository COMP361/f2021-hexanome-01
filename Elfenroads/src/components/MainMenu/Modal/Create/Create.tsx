import {registerGameService, createSession} from '../../../../utils/queryUtils';
import {v4 as uuidv4} from 'uuid';
import './Create.scss';
import {getUser, storeSessionId} from '../../../../utils/storageUtils';
import React from 'react';

export default function Create({wait}: any) {
  const id = uuidv4();
  const {accessToken, name} = getUser();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const displayname = e.target.roomname.value;
    const min = e.target.min.value;
    const max = e.target.max.value;

    if (displayname && min && max) {
      console.log(createSession);
      registerGameService(displayname, id, `${min}`, `${max}`)
        .then(() => createSession(id, name, accessToken))
        .then(res => {
          console.log(res);
          return res.data.data;
        })
        .then(data => storeSessionId(data.createSession, wait))
        .catch(console.log);
    }
  };

  return (
    <section className="create">
      <h1 className="create__title">Create Game</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__input form__input--create"
          name="roomname"
          id="roomname"
          placeholder="Room Name"
          autoComplete="off"
        />
        <div className="form__group">
          <div className="form__input form__input--radio">
            <input
              type="radio"
              id="Elfenland"
              name="game"
              value="elfenland"
              checked
            />
            <label htmlFor="Elfenland">Elfenland</label>
          </div>
          <div className="form__input form__input--radio">
            <input type="radio" id="Elfengold" name="game" value="elfengold" />
            <label htmlFor="Elfengold">Elfengold</label>
          </div>
          <div className="">
            <input
              className="form__input form__input--number"
              id="min"
              name="min"
              type="number"
              min="2"
              max="6"
            />
            -
            <input
              className="form__input form__input--number"
              id="max"
              name="max"
              type="number"
              min="2"
              max="6"
            />
            <label htmlFor="min">players</label>
          </div>
        </div>
        <button className="form__button form__button--create">Create</button>
      </form>
    </section>
  );
}

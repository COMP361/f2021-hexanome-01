import {getUser} from '../../../../utils/storageUtils';
import './Welcome.scss';
import React from 'react';

export default function Welcome({create, join, load}: any) {
  const {name} = getUser();
  return (
    <section className="welcome">
      <h1 className="welcome__title">
        Welcome, <span className="welcome__user">{name}</span>
      </h1>
      <button className="welcome__button" onClick={join}>
        Join Game
      </button>
      <button className="welcome__button" onClick={create}>
        Create Game
      </button>
      <button className="welcome__button" onClick={load}>
        Load Game
      </button>
    </section>
  );
}

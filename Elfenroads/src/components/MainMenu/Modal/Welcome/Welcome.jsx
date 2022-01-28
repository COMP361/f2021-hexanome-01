import './Welcome.scss';
import React from 'react';
export default function Welcome({user, create}) {
  return (
    <section className="welcome">
      <h1 className="welcome__title">
        Welcome, <span className="welcome__user">{user.lsUser.name}</span>
      </h1>
      <button className="welcome__button">Join Game</button>
      <button className="welcome__button" onClick={create}>
        Create Game
      </button>
      <button className="welcome__button">Load Game</button>
    </section>
  );
}

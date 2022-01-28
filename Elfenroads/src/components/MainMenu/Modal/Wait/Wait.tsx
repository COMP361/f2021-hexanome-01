import './Wait.scss';
import React from 'react';
export default function Wait({room, username, beginGame}: any) {
  return (
    <section className="wait">
      <p className="wait__game">{room.game.toUpperCase()}</p>
      <h1 className="wait__title">{room.roomname}</h1>
      <h2 className="wait__subtitle">
        Players <span className="wait__player-count">(1/6)</span>
      </h2>
      <ul className="wait__player-list">
        <li className="wait__player">{username}</li>
      </ul>
      <div className="wait__footer">
        <button className="wait__button" onClick={beginGame}>
          Start
        </button>
      </div>
    </section>
  );
}

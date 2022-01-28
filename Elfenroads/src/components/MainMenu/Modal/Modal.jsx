import './Modal.scss';
import React from 'react';
import {useEffect, useState} from 'react';

import Create from './Create';
import Login from './Login';
import Wait from './Wait';
import Welcome from './Welcome';

export default function Modal({setGame}) {
  const [frame, setFrame] = useState(null);
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => setFrame('welcome'), [user]);
  useEffect(() => setFrame('wait'), [room]);
  useEffect(() => setFrame('login'), []);

  const welcome = (_user) => setUser(_user);
  const create = () => setFrame('create');
  const wait = (room) => setRoom(room);
  const beginGame = () => setGame({room: room, username: user});

    return (
        <div className='modal'>
            {frame === 'login' && <Login next={welcome} />}
            {frame === 'welcome' && <Welcome user={user} create={create} />}
            {frame === 'create' && <Create wait={wait} />}
            {frame === 'wait' && <Wait room={room} user={user} beginGame={beginGame} />}
        </div>
    );
}

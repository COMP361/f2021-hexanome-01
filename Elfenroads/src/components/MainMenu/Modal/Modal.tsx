import './Modal.scss';

import {useState} from 'react';
import React from 'react';
import {io} from 'socket.io-client';

import Create from './Create';
import Login from './Login';
import Wait from './Wait';
import Welcome from './Welcome';
import Join from './Join/Join';

export default function Modal({setSocket}: any) {
  const [frame, setFrame] = useState('login');
  const [_socket, _setSocket]: [any, any] = useState(null);

  const welcome = () => setFrame('welcome');
  const create = () => setFrame('create');
  const join = () => setFrame('join');

  const wait = () =>
    _setSocket(io('http://elfenroads.westus3.cloudapp.azure.com:4243/'));

  return (
    <div className="modal">
      {frame === 'login' && <Login next={welcome} />}
      {frame === 'welcome' && <Welcome create={create} join={join} />}
      {!_socket && frame === 'create' && <Create wait={wait} />}
      {!_socket && frame === 'join' && <Join wait={wait} />}
      {_socket && <Wait socket={_socket} setSocket={setSocket} />}
    </div>
  );
}

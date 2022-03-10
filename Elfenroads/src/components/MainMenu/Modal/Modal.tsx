import './Modal.scss';

import {useState} from 'react';
import React from 'react';
import {io} from 'socket.io-client';

import Create from './Create';
import Login from './Login';
import Wait from './Wait';
import Welcome from './Welcome';
import Join from './Join/Join';
import ChooseBoot from './ChooseBoot';

export default function Modal({setSocket}: any) {
  const [frame, setFrame] = useState('login');
  const [pass, setPass] = useState(null);
  const [_socket, _setSocket]: [any, any] = useState(null);

  const welcome = () => setFrame('welcome');
  const create = () => setFrame('create');
  const join = () => setFrame('join');
  const choose = () => setFrame('choose');

  const wait = () =>
    _setSocket(io('http://elfenroads.westus3.cloudapp.azure.com:3455/'));

  return (
    <div className="modal">
      {frame === 'login' && <Login next={welcome} setPass={setPass} />}
      {frame === 'welcome' && <Welcome create={create} join={join} />}
      {!_socket && frame === 'create' && <Create wait={wait} pass={pass} />}
      {!_socket && frame === 'join' && <Join choose={choose} pass={pass} />}
      {!_socket && frame === 'choose' && <ChooseBoot wait={wait} pass={pass} />}
      {_socket && <Wait socket={_socket} setSocket={setSocket} />}
    </div>
  );
}

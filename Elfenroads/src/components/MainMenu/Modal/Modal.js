import {useState} from 'react';
import Create from './Create';
import Login from './Login';
import Wait from './Wait';
import Welcome from './Welcome';
import './Modal.scss';

export default function Modal({setGame}) {
    const [frame, setFrame] = useState('login');
    const [username, setUsername] = useState(null);
    const [room, setRoom] = useState(null);

    const welcome = (username) => {
        setFrame('welcome');
        setUsername(username);
    };

    const create = () => {
        setFrame('create');
    };

    const wait = (room) => {
        setFrame('wait');
        setRoom(room);
    };

    const beginGame = () => {
        setGame({
            room: room,
            username: username,
        });
    };

    return (
        <div className="modal">
            {frame === 'login' && <Login next={welcome} setGame={setGame} />}
            {frame === 'welcome' && <Welcome username={username} create={create} />}
            {frame === 'create' && <Create wait={wait} />}
            {frame === 'wait' && <Wait room={room} username={username} beginGame={beginGame} />}
        </div>
    );
}

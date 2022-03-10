import './ChooseBoot.scss';
import React, {useEffect, useState} from 'react';
import {
  changeColor,
  joinSession,
  singleSession,
} from '../../../../utils/queryUtils';
import {getSessionId, getUser} from '../../../../utils/storageUtils';
import green from '../../../../assets/img/boot-green.png';
import blue from '../../../../assets/img/boot-blue.png';
import purple from '../../../../assets/img/boot-purple.png';
import red from '../../../../assets/img/boot-red.png';
import yellow from '../../../../assets/img/boot-yellow.png';
import black from '../../../../assets/img/boot-black.png';

const colors = [
  {
    name: '008000',
    img: green,
  },
  {
    name: '0000FF',
    img: blue,
  },
  {
    name: '800080',
    img: purple,
  },
  {
    name: 'FF0000',
    img: red,
  },
  {
    name: 'FFFF00',
    img: yellow,
  },
  {
    name: '000000',
    img: black,
  },
];
export default function ChooseBoot({wait}: any) {
  const [session, setSession]: [any, any] = useState(null);
  const sessionId = getSessionId();

  const colorInUse = (color: any) => {
    for (let i = 0; i < session.users.length; i++) {
      if (session.users[i].preferredColour === color) {
        return true;
      }
    }
    return false;
  };
  const getSession = () => {
    singleSession(sessionId)
      .then(res => res.data.data)
      .then(data => setSession(data.Session));
  };

  let interval: any;
  useEffect(() => {
    if (sessionId) {
      getSession();
      interval = setInterval(getSession, 2000);
      return () => clearInterval(interval);
    } else {
      setSession({users: []});
      return;
    }
  }, []);

  const attemptJoin = (color: any) => {
    const {accessToken, name} = getUser();
    changeColor(color, accessToken, name)
      .then(() => joinSession(accessToken, name, sessionId))
      .then(wait)
      .catch(console.log);
  };

  return (
    <section className="choose-boot">
      <h1 className="choose-boot__title">Choose Boot</h1>
      <div className="choose-boot__boots">
        {session &&
          colors.map(color => {
            if (!colorInUse(color.name)) {
              return (
                <div
                  className="choose-boot__boot"
                  onClick={() => attemptJoin(color.name)}
                >
                  <img src={color.img} className="choose-boot__boot-img" />
                </div>
              );
            } else {
              return;
            }
          })}
      </div>
    </section>
  );
}

import './Login.scss';
import {useState} from 'react';
import React from 'react';
import {newLSUser, verifyUser} from '../../../../utils/queryUtils';
import {storeUser} from '../../../../utils/storageUtils';

export default function Login({next}: any) {
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');

  // Verify a user given some password and username
  const attemptVerify = (password: any, username: any) => {
    verifyUser(password, username)
      .then(res => res.data.data)
      .then(data => {
        if (data?.verifyLSUser) {
          storeUser(data.verifyLSUser);
          next(data.verifyLSUser);
        } else {
          setLoginError('Incorrect username and/or password.');
        }
      })
      .catch(console.log);
  };

  // Check input validity and request user verification
  const attemptLogin = (e: any) => {
    e.preventDefault();
    const username = e.target.loginUsername.value;
    const password = e.target.loginPassword.value;

    if (!username || !password) {
      setLoginError('Please fill in all fields.');
    } else {
      attemptVerify(password, username);
    }
  };

  // Check input validity and request user creation, then verify if successful
  const attemptSignup = (e: any) => {
    e.preventDefault();

    const username = e.target.signupUsername.value;
    const password = e.target.signupPassword.value;
    const confirm = e.target.signupConfirmPassword.value;

    if (!username || !password || !confirm) {
      setSignupError('Please fill in all fields.');
    } else if (password !== confirm) {
      setSignupError('Passwords do not match.');
    } else {
      newLSUser(password, username)
        .then(res => res.data.data)
        .then(data => {
          if (data.createLSUser === 'Player added.') {
            attemptVerify(password, username);
          } else {
            setSignupError(data.createLSUser);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <section className="login">
      <div className="login__panel">
        <h1 className="login__title">Login</h1>
        <form className="form" onSubmit={attemptLogin}>
          <input
            className="form__input"
            name="loginUsername"
            id="loginUsername"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            className="form__input"
            name="loginPassword"
            id="loginPassword"
            placeholder="Password"
            type="password"
          />
          {loginError && <p className="error">{loginError}</p>}
          <button className="form__button">Login</button>
        </form>
      </div>
      <div className="login__panel">
        <h1 className="login__title">SignUp</h1>
        <form className="form" onSubmit={attemptSignup}>
          <input
            className="form__input"
            name="signupUsername"
            id="signupUsername"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            className="form__input"
            name="signupPassword"
            id="signupPassword"
            placeholder="Password"
            type="password"
          />
          <input
            className="form__input"
            name="signupConfirmPassword"
            id="signupConfirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
          {signupError && <p className="error">{signupError}</p>}
          <button className="form__button">Sign Up</button>
        </form>
      </div>
    </section>
  );
}

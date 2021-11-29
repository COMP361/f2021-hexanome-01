import {useMutation, useLazyQuery} from '@apollo/client';
import {useState} from 'react';
import {POST_USER, VERIFY_USER} from '../../../../utils/queryUtils';
import './Login.scss';

export default function Login({next}) {
     const [signupError, setSignupError] = useState('');
     const [loginError, setLoginError] = useState('');

     // Handle response data from login
     const handleLogin = (data) => {
          if (data.verifyLSUser) {
               next(data.verifyLSUser);
          } else {
               setLoginError('Incorrect username and/or password.');
          }
     };

     const [getLoginResponse] = useLazyQuery(VERIFY_USER, {onCompleted: handleLogin, onError: handleLogin});

     // Check input validity and request user verification
     const attemptLogin = (e) => {
          e.preventDefault();
          const username = e.target.loginUsername.value;
          const password = e.target.loginPassword.value;

          if (!username || !password) {
               setLoginError('Please fill in all fields.');
          } else {
               getLoginResponse({variables: {password: password, username: username}});
          }
     };

     // Handle response data from signup, automatically validate if successful
     const handleSignup = (data) => {
          const username = document.querySelector('#signupUsername').value;
          const password = document.querySelector('#signupPassword').value;

          if (data.createLSUser === 'Player added.') {
               getLoginResponse({variables: {password: password, username: username}});
          } else {
               setSignupError(data.createLSUser);
          }
     };

     const [getSignupResponse] = useMutation(POST_USER, {onCompleted: handleSignup});

     // Check input validity and request user creation
     const attemptSignup = (e) => {
          e.preventDefault();

          const username = e.target.signupUsername.value;
          const password = e.target.signupPassword.value;
          const confirm = e.target.signupConfirmPassword.value;

          if (!username || !password || !confirm) {
               setSignupError('Please fill in all fields.');
          } else if (password !== confirm) {
               setSignupError('Passwords do not match.');
          } else {
               getSignupResponse({variables: {password: password, name: username}});
          }
     };

     return (
     <section className='login'>
          <div className='login__panel'>
               <h1 className='login__title'>Login</h1>
               <form className='form' onSubmit={attemptLogin}>
                    <input className='form__input' name='loginUsername' id='loginUsername' placeholder='Username' autoComplete='off' />
                    <input className='form__input' name='loginPassword' id='loginPassword' type='password' placeholder='Password' />
                    {loginError && <p className='error'>{loginError}</p>}
                    <button className='form__button'>Login</button>
               </form>
          </div>
          <div className='login__panel'>
               <h1 className='login__title'>Sign Up</h1>
               <form className='form' onSubmit={attemptSignup}>
                    <input className='form__input' name='signupUsername' id='signupUsername' placeholder='Username' autoComplete='off' />
                    <input className='form__input' name='signupPassword' id='signupPassword' type='password' placeholder='Password' />
                    <input className='form__input' name='signupConfirmPassword' id='signupConfirmPassword' type='password' placeholder='Confirm Password' />
                    {signupError && <p className='error'>{signupError}</p>}
                    <button className='form__button'>Sign Up</button>
               </form>
          </div>
     </section>);
}

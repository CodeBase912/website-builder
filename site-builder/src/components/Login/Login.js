import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import './Login.css';

function Login() {
  const defaultInputState = { user: '', password: '', emailInvalid: false };
  const [inputState, setInputState] = useState(defaultInputState);
  const AppState = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();

    // Set the data to be posted
    const params = {
      user: inputState.user,
      password: inputState.password,
    };

    // Check if the inputs are not empty
    if (inputState.user && inputState.password) {
      // Proceed with processing data

      // Check if the user entered an email
      const isInputEmail = inputState.user.split('').find((character) => {
        if (character == '@') {
          return true;
        }
      });
      if (isInputEmail) {
        // Input is email. Therefore check if email is valid
        function ValidateEmail(mail) {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
          }
          return false;
        }
        const isEmailValid = ValidateEmail(inputState.user);
        if (isEmailValid) {
          // Email is valid. Make AJAX call
          const xhr = new XMLHttpRequest();
          xhr.open(
            'POST',
            'http://localhost:80/site-builder-app/api/login/index.php',
            true
          );
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Sec-Fetch_Mode', 'cors');
          xhr.onload = function () {
            if (this.status === 200) {
              const data = JSON.parse(this.responseText);

              if (data.message == 'User logged in') {
                // Show the pop up with the message from server
                setInputState({ ...inputState, emailInvalid: true });
                AppState.setPopUpState({
                  ...AppState.popUpState,
                  showPopUp: true,
                  error: false,
                  msg: data.message,
                });
              } else {
                // ULogin failed. Show the pop up with the message from server
                setInputState({ ...inputState, emailInvalid: true });
                AppState.setPopUpState({
                  ...AppState.popUpState,
                  showPopUp: true,
                  error: true,
                  msg: data.message,
                });
              }
            }
          };
          xhr.send(JSON.stringify(params));
        } else {
          // Email is in valid. Notify the user
          setInputState({ ...inputState, emailInvalid: true });
          AppState.setPopUpState({
            ...AppState.popUpState,
            showPopUp: true,
            error: true,
            msg: 'Please enter a valid email address!',
          });
        }
      } else {
        // Input is username. Make AJAX call
        const xhr = new XMLHttpRequest();
        xhr.open(
          'POST',
          'http://localhost:80/site-builder-app/api/login/index.php',
          true
        );
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Sec-Fetch_Mode', 'cors');
        xhr.onload = function () {
          if (this.status === 200) {
            const data = JSON.parse(this.responseText);

            if (data.message == 'User logged in') {
              // Show the pop up with the message from server
              setInputState({ ...inputState, emailInvalid: true });
              AppState.setPopUpState({
                ...AppState.popUpState,
                showPopUp: true,
                error: false,
                msg: data.message,
              });
            } else {
              // ULogin failed. Show the pop up with the message from server
              setInputState({ ...inputState, emailInvalid: true });
              AppState.setPopUpState({
                ...AppState.popUpState,
                showPopUp: true,
                error: true,
                msg: data.message,
              });
            }
          }
        };
        xhr.send(JSON.stringify(params));
      }
    } else {
      // Notify the user to fill out all fields

      AppState.setPopUpState({
        ...AppState.popUpState,
        showPopUp: true,
        error: true,
        msg: 'Please enter all fields!',
      });
    }
  }
  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit} className='form'>
        <h3 className='form-title'>Login</h3>
        <input
          type='text'
          name='username'
          placeholder='Username/Email'
          value={inputState.user}
          onChange={(event) =>
            setInputState({ ...inputState, user: event.target.value })
          }
          className='form-input'
          // required
        />
        <input
          type='password'
          name='pwd'
          placeholder='Password'
          value={inputState.password}
          onChange={(event) =>
            setInputState({ ...inputState, password: event.target.value })
          }
          className='form-input'
          // required
        />
        <input type='submit' value='Submit' className='form-submit' />
      </form>
      <div className='form-links-wrapper'>
        <a href='' className='form-forgot-pwd-link'>
          Forgot passord?
        </a>
        <p className='form-signup-link-wrapper'>
          No account?{' '}
          <a href='' className='form-signup-link'>
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

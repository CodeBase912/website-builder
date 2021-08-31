import { useState, useContext } from 'react';
import { AppContext } from '../../App';

function Signup() {
  const defaultState = {
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
  };
  const [inputState, setInputState] = useState(defaultState);
  const AppState = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();

    const params = {
      username: inputState.username,
      email: inputState.email,
      password: inputState.password,
      confirmedPassword: inputState.confirmedPassword,
    };

    // http://localhost/site-builder-app/api/login

    fetch('http://localhost:80/site-builder-app/api/signup/index.php', {
      method: 'POST',
      body: JSON.stringify(params), // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        AppState.setPopUpState({
          ...AppState.popUpState,
          showPopUp: true,
          error: data.error,
          msg: data.message,
        });
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={inputState.username}
          onChange={(event) =>
            setInputState({ ...inputState, username: event.target.value })
          }
        />
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={inputState.email}
          onChange={(event) => {
            function ValidateEmail(mail) {
              if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return true;
              }
              // alert('You have entered an invalid email address!');
              return false;
            }
            console.log(ValidateEmail(event.target.value));
            setInputState({ ...inputState, email: event.target.value });
          }}
        />
        <input
          type='password'
          name='pwd'
          placeholder='Password'
          value={inputState.password}
          onChange={(event) =>
            setInputState({ ...inputState, password: event.target.value })
          }
        />
        <input
          type='password'
          name='confrim-pwd'
          placeholder='Confirm Password'
          value={inputState.confirmedPassword}
          onChange={(event) =>
            setInputState({
              ...inputState,
              confirmedPassword: event.target.value,
            })
          }
        />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Signup;

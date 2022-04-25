import { useState, useContext } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppStateProvider";
import Header from "../site/Header/Header";

function Signup() {
  const defaultState = {
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };
  const history = useHistory();
  const [inputState, setInputState] = useState(defaultState);
  const { appState, appStateUpdate } = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();

    const params = {
      username: inputState.username,
      email: inputState.email,
      password: inputState.password,
      confirmedPassword: inputState.confirmedPassword,
    };

    // http://localhost/site-builder-app/api/login

    // fetch('http://localhost:80/site-builder-app/api/signup/index.php', {
    //   method: 'POST',
    //   body: JSON.stringify(params), // body data type must match "Content-Type" header
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     const data = JSON.parse(this.responseText);
    // console.log(data);
    // appStateUpdate.popUpState({
    //   showPopUp: appState.popUpState.showPopUp + 1,
    //   error: data.error,
    //   msg: data.message,
    // });
    //   });

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `http://localhost/site-builder-app/api/users/signup`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      const data = JSON.parse(this.responseText);
      console.log(data);
      if (data?.error) {
        // There was an error creating the user account
        appStateUpdate.popUpState({
          showPopUp: appState.popUpState.showPopUp + 1,
          error: true,
          msg: data.error,
        });
      } else {
        // User account has been successfully created
        appStateUpdate.popUpState({
          showPopUp: appState.popUpState.showPopUp + 1,
          error: false,
          msg: data.success.message,
        });
        // Redirect user to login page
        history.push("/");
      }
    };
    xhr.send(JSON.stringify(params));
  }

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h3 className="form-title">Signup</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={inputState.username}
            onChange={(event) =>
              setInputState({ ...inputState, username: event.target.value })
            }
            className="form-input"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={inputState.email}
            onChange={(event) => {
              setInputState({ ...inputState, email: event.target.value });
            }}
            className="form-input"
          />
          <input
            type="password"
            name="pwd"
            placeholder="Password"
            value={inputState.password}
            onChange={(event) =>
              setInputState({ ...inputState, password: event.target.value })
            }
            className="form-input"
          />
          <input
            type="password"
            name="confrim-pwd"
            placeholder="Confirm Password"
            value={inputState.confirmedPassword}
            onChange={(event) =>
              setInputState({
                ...inputState,
                confirmedPassword: event.target.value,
              })
            }
            className="form-input"
          />
          <input type="submit" value="Signup" className="form-submit" />
          <p className="form-signup-link-wrapper">
            Already have an account?{" "}
            <a href="/" className="form-signup-link">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;

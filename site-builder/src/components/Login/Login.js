import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppStateProvider";
import Header from "../site/Header/Header";
import "./Login.css";

function Login() {
  const defaultInputState = { user: "", password: "", emailInvalid: false };
  const [inputState, setInputState] = useState(defaultInputState);
  const { appState, appStateUpdate } = useContext(AppContext);
  console.log("Form State: ", inputState);

  function handleSubmit(event) {
    console.log("Submit triggered");
    event.preventDefault();

    // Set the data to be posted
    const params = {
      identifier: inputState.user,
      password: inputState.password,
    };

    // Check if the inputs are not empty
    if (inputState.user && inputState.password) {
      // Proceed with processing data

      // Check if the user entered an email
      const isInputEmail = inputState.user.split("").find((character) => {
        if (character == "@") {
          return true;
        }
        return false;
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
            "POST",
            "http://localhost:80/site-builder-app/api/login/index.php",
            true
          );
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Sec-Fetch_Mode", "cors");
          xhr.onload = function () {
            if (this.status === 200) {
              const data = JSON.parse(this.responseText);
              console.log("API login response: ", data);
              if (data?.error) {
                // There was an error logging in the user
                setInputState({ ...inputState, emailInvalid: true });
                appStateUpdate.popUpState({
                  showPopUp: appState.popUpState.showPopUp + 1,
                  error: true,
                  msg: data.error,
                });
              } else {
                // User has been logged in successfully
                setInputState({ ...inputState, emailInvalid: true });
                appStateUpdate.popUpState({
                  showPopUp: appState.popUpState.showPopUp + 1,
                  error: false,
                  msg: data.success.message,
                });
                appStateUpdate.user({ ...data.success.data });
              }
            }
          };
          xhr.send(JSON.stringify(params));
        } else {
          // Email is invalid. Notify the user
          setInputState({ ...inputState, emailInvalid: true });
          appStateUpdate.popUpState({
            showPopUp: appState.popUpState.showPopUp + 1,
            error: true,
            msg: "Please enter a valid email address!",
          });
        }
      } else {
        // Input is username. Make AJAX call
        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          "http://localhost:80/site-builder-app/api/users/login",
          true
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
          if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            console.log("API login response: ", data);
            if (data?.error) {
              // There was an error logging in the user
              setInputState({ ...inputState, emailInvalid: true });
              appStateUpdate.popUpState({
                showPopUp: appState.popUpState.showPopUp + 1,
                error: true,
                msg: data.error,
              });
            } else {
              // User has been logged in successfully
              setInputState({ ...inputState, emailInvalid: true });
              appStateUpdate.popUpState({
                showPopUp: appState.popUpState.showPopUp + 1,
                error: false,
                msg: data.success.message,
              });
              appStateUpdate.user({ ...data.success.data });
            }
          }
        };
        xhr.send(JSON.stringify(params));
      }
    } else {
      // Notify the user to fill out all fields

      appStateUpdate.popUpState({
        showPopUp: appState.popUpState.showPopUp + 1,
        error: true,
        msg: "Please enter all fields!",
      });
    }
  }
  return (
    <>
      <Header />
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h3 className="form-title">Login</h3>
          <input
            type="text"
            name="username"
            placeholder="Username/Email"
            value={inputState.user}
            onChange={(event) =>
              setInputState({ ...inputState, user: event.target.value })
            }
            className="form-input"
            // required
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
            // required
          />
          <button type="submit" className="form-submit">
            Login
          </button>
        </form>
        <div className="form-links-wrapper">
          <a href="/forgot-password" className="form-forgot-pwd-link">
            Forgot passord?
          </a>
          <p className="form-signup-link-wrapper">
            No account?{" "}
            <a href="/signup" className="form-signup-link">
              Signup
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

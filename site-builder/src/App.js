import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Import State Context Variables
import { AppContext } from "./context/AppStateProvider";
// Import Custom React Components
import AppStateProvider from "./context/AppStateProvider";
import Login from "./components/Login/Login";
import Builder from "./components/Builder/Builder";
import Signup from "./components/Signup/Signup";
import PopUp from "./components/notificationPopUp/PopUp";
// import Header from "./components/site//Header/Header";
import DropDownProvider from "./components/DropDown/DropDownContext";
import "./App.css";
// import '../node_modules/tailwindcss/dist/tailwind.min.css';

function App() {
  const { appState, appStateUpdate } = useContext(AppContext);
  return (
    <AppStateProvider>
      <DropDownProvider>
        <div className="App">
          <PopUp
            popUpState={appState.popUpState}
            setPopUpState={appStateUpdate.popUpState}
          />
          <Router>
            <Routes>
              <Route exact path="/" component={Login} />
              <Route exact path="/app" component={Builder} />
              <Route exact path="/signup" component={Signup} />
            </Routes>
          </Router>
        </div>
      </DropDownProvider>
    </AppStateProvider>
  );
}

export default App;

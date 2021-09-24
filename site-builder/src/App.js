import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Builder from './components/Builder/Builder';
import Signup from './components/Signup/Signup';
import PopUp from './components/notificationPopUp/PopUp';
import Header from './components/Header/Header';
import './App.css';
// import '../node_modules/tailwindcss/dist/tailwind.min.css';

export const AppContext = React.createContext();

function App() {
  const popUpDefaultState = { showPopUp: false, error: false, msg: '' };
  const [popUpState, setPopUpState] = useState(popUpDefaultState);
  return (
    <AppContext.Provider value={{ popUpState, setPopUpState }}>
      <div className='App'>
        <Header />
        <PopUp popUpState={popUpState} setPopUpState={setPopUpState} />
        <Router>
          <Route exact path='/' component={Login} />
          <Route exact path='/app' component={Builder} />
          <Route exact path='/signup' component={Signup} />
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;

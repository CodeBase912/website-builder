import React, { useState, useEffect } from "react";

// Create the App Context
const popUpDefaultState = { showPopUp: 0, error: false, msg: "" };
const defaultAppState = {
  user: null,
  projects: null,
  popUpState: popUpDefaultState,
};
export const AppContext = React.createContext({
  appState: defaultAppState,
  appStateUpdate: {
    user: (data) => {},
    popUpState: (data) => {},
    setDefault: () => {},
  },
});

const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState(defaultAppState);

  // Define the appState update functions
  const appStateUpdate = {
    user: (data) => {
      if (data) {
        setAppState((appState) => {
          const newAppState = { ...appState, user: data };
          localStorage.setItem(
            "site-builder-demo",
            JSON.stringify(newAppState)
          );
          return newAppState;
        });
      }
    },
    popUpState: (data) => {
      if (data) {
        setAppState((appState) => {
          const newAppState = { ...appState, popUpState: data };
          localStorage.setItem(
            "site-builder-demo",
            JSON.stringify(newAppState)
          );
          return newAppState;
        });
      }
    },
    setDefault: () => {
      const appData = localStorage.getItem("site-builder-demo");
      if (appData) {
        console.log("Local Data: ", JSON.parse(appData));
        const data = JSON.parse(appData);
        const newAppState = {
          ...data,
          popUpState: { ...data.popUpState, showPopUp: 0 },
        };
        setAppState({ ...newAppState });
        localStorage.setItem("site-builder-demo", JSON.stringify(newAppState));
      }
    },
  };

  // Set appState from localStorage on first render
  useEffect(() => {
    appStateUpdate.setDefault();
  }, []);
  return (
    <AppContext.Provider value={{ appState, appStateUpdate }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppStateProvider;

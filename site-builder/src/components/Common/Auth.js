import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
// Import State Context Variable
import { AppContext } from "../../context/AppStateProvider";

const Auth = ({ children, path }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { appState, appStateUpdate } = useContext(AppContext);

  const authUser = (token, userID) => {
    if (!token || !userID) {
      // User is not logged in, redirect to login page
      appStateUpdate.popUpState({
        showPopUp: appState.popUpState.showPopUp + 1,
        error: true,
        msg: data.error,
      });
      history.push("/login");
    }
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `http://localhost/site-builder-app/api/auth${userID}`,
      true
    );
    xhr.onload = function () {
      const data = JSON.parse(this.responseText);
      console.log("API auth response: ", data);
      if (data?.error) {
        // Authentication failed redirect user to login page
        appStateUpdate.popUpState({
          showPopUp: appState.popUpState.showPopUp + 1,
          error: true,
          msg: data.error,
        });
        history.push("/login");
      }
    };
  };

  useEffect(() => {
    authUser(appState?.user?.token, appState?.user?.id);
  }, [appState.user]);

  return <>{children}</>;
};

export default Auth;

import { useEffect, useContext } from "react";
// Import State Context Variable
import { AppContext } from "../../context/AppStateProvider";
// Import Stylesheet
import "./PopUp.css";

function PopUp(props) {
  const { appState } = useContext(AppContext);
  function togglePopUp() {
    document.getElementById("popup").style.animation = "3s showPopUp ease";
  }

  useEffect(() => {
    if (appState.popUpState.showPopUp) {
      togglePopUp();
      setTimeout(() => {
        // appStateUpdate.popUpState({ ...appState.popUpState, showPopUp: false });
        document.getElementById("popup").style.animation = "";
      }, 3000);
    }
  }, [appState.popUpState.showPopUp]);

  let popUpClass;
  if (appState.popUpState.error === true) {
    popUpClass = "popup error";
  } else if (appState.popUpState.error === false) {
    popUpClass = "popup success";
  }

  return (
    <div className={popUpClass} id="popup">
      <p className="popup-msg">{appState.popUpState.msg}</p>
    </div>
  );
}

export default PopUp;

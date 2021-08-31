import { useEffect } from 'react';
import './PopUp.css';

function PopUp(props) {
  const { popUpState, setPopUpState } = props;
  function togglePopUp() {
    document.getElementById('popup').style.animation = '3s showPopUp ease';
  }

  useEffect(() => {
    if (popUpState.showPopUp) {
      togglePopUp();
      setTimeout(() => {
        setPopUpState({ ...popUpState, showPopUp: false });
        document.getElementById('popup').style.animation = '';
      }, 3000);
    }
  }, [popUpState, setPopUpState]);

  let popUpClass;
  if (popUpState.error === true) {
    popUpClass = 'popup error';
  } else if (popUpState.error === false) {
    popUpClass = 'popup success';
  }

  return (
    <div className={popUpClass} id='popup'>
      <p className='popup-msg'>{popUpState.msg}</p>
    </div>
  );
}

export default PopUp;

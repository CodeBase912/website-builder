import React from "react";
import userIcon from "../../images/icons/profile-user.png";
import "./Header.css";

function Header() {
  return (
    <div className='header'>
      <div className='logo-wrapper'>
        <p>
          <span>Web</span>
          <span id='logo'>X</span>
        </p>
      </div>
      <div className='nav-wrapper'>
        <div className='user-icon-wrapper'>
          <img src={userIcon} alt='User icon' className='user-icon' />
        </div>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
// Import Custom React Components
import Button from "../common/Button";
// Import Icons
import UserIcon from "../../assets/icons/user-icon_big.svg";
import NavBar from "./NavBar";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex justify-between bg-grey-darker text-white shadow-lg fixed w-full z-50">
      {/* Logo Container */}
      <Logo />

      {/* Nav Bar Container */}
      <NavBar>
        <a className="flex items-center px-9 bg-dark text-grey-lighter h-full cursor-pointer">
          <p>{"Home"}</p>
        </a>
        <a className="flex items-center px-9 hover:bg-dark text-grey-lighter h-full cursor-pointer">
          <p>{"Services"}</p>
        </a>
        <Button
          endIcon={
            <img src={UserIcon} className="w-[18px] text-grey-lighter" />
          }
          className="mx-2"
        >
          <p>Login</p>
        </Button>
      </NavBar>
    </header>
  );
};

export default Header;

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
      <div className="py-2 px-4">
        <Logo />
      </div>

      {/* Nav Bar Container */}
      <NavBar />
    </header>
  );
};

export default Header;

import React from "react";
import classNames from "classnames";
// Import Custom React Components
import Button from "../common/Button";
// Import Icons
import NavBar from "./NavBar";
import Logo from "./Logo";
import { Icons } from "../common/icons/icons";

const Header = ({ fixed = true, iconOnly = false, dropDown = false }) => {
  return (
    <header
      className={classNames(
        { "shadow-lg fixed": fixed === true },
        "flex justify-between bg-grey-darker text-white w-full z-50"
      )}
    >
      {/* Logo Container */}
      <div
        className={classNames("cursor-pointer py-2 px-4", {
          "flex items-center space-x-3 hover:bg-dark": dropDown === true,
        })}
      >
        <Logo iconOnly={iconOnly} />
        <div className="text-grey-lighter text-xs">
          {dropDown && Icons.chevron.down}
        </div>
      </div>

      {/* Nav Bar Container */}
      <NavBar absolute={fixed} />
    </header>
  );
};

export default Header;

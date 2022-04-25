import React, { useEffect } from "react";
// Import icons
import userIcon from "../../../images/icons/user-icon_big.svg";
import { ChevronDownIcon } from "@heroicons/react/solid";
// import "./Header.css";
import DropDown from "../../DropDown/DropDown";
import List from "../../Common/List";
import { profilePageLinks } from "../../profile/profilePageLinks";
import Button from "../../Common/Button";

function Header(props) {
  console.log(props?.props?.builder);

  return (
    <div className="shadow-lg px-[15px] fixed top-0 left-0 flex items-center justify-between text-white bg-grey-darker z-50 w-screenw">
      <div className="logo-wrapper">
        <p className="flex items-center text-[25px] py-[10px] cursor-pointer">
          <span className="flex items-center h-full">Web</span>
          <span className="flex items-center text-primary">X</span>
        </p>
      </div>
      <div id="nav-wrapper">
        <Button>
          <p className="text-[20px] font-bold">Login</p>
        </Button>
      </div>
    </div>
  );
}

export default Header;

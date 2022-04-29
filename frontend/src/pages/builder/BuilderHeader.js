import React from "react";
import classNames from "classnames";
// Import Custom React Components
import Button from "../../components/common/Button";
// Import Icons
import NavBar from "../../components/site/NavBar";
import Logo from "../../components/site/Logo";
import { Icons } from "../../components/common/icons/icons";

const BuilderHeader = ({
  fixed = true,
  iconOnly = false,
  dropDown = false,
}) => {
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
      {/* <NavBar absolute={fixed} /> */}
      <div className="flex justify-between w-full">
        {/* Toggle Borders Button Container */}
        <div className="panel__basic-actions relative">
          <div id="toggle-borders" className="max-w-[40px]">
            {Icons.customIcons.builder.header.borders}
          </div>
        </div>
        {/* Select Device Buttons Container */}
        <div className="panel__devices flex border-r border-l border-grey">
          {/* Desktop Device Container */}
          <div className="w-16 hover:bg-dark flex justify-center cursor-pointer">
            <div
              id="device-tablet"
              className="flex items-center justify-center w-10 h-full fill-grey-lighter stroke-grey-lighter"
            >
              {Icons.customIcons.builder.header.desktop}
            </div>
          </div>
          {/* Table Device Container */}
          <div className="w-16 hover:bg-dark flex justify-center cursor-pointer">
            <div
              id="device-tablet"
              className="flex items-center justify-center w-7 h-full fill-grey-lighter stroke-grey-lighter"
            >
              {Icons.customIcons.builder.header.tablet}
            </div>
          </div>
          {/* Mobile Device Container */}
          <div className="w-16 hover:bg-dark flex justify-center cursor-pointer">
            <div
              id="device-tablet"
              className="flex items-center justify-center w-4 h-full fill-grey-lighter stroke-grey-lighter"
            >
              {Icons.customIcons.builder.header.mobile}
            </div>
          </div>
        </div>
        <div className="relative">Right panel</div>
      </div>
    </header>
  );
};

export default BuilderHeader;

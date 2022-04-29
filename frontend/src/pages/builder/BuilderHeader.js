import React from "react";
import classNames from "classnames";
// Import Custom React Components
import Button from "../../components/common/Button";
// Import Icons
import NavBar from "../../components/site/NavBar";
import Logo from "../../components/site/Logo";
import { Icons } from "../../components/common/icons/icons";
import Input from "../../components/common/forms/Input";

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
      <div className="flex w-full">
        {/* Toggle Borders Button Container */}
        <div className="relative flex">
          <div id="toggle-borders" className="w-16 hover:bg-dark flex">
            <div
              id="border-toggle-btn"
              className="w-16 hover:bg-dark flex justify-center cursor-pointer"
            >
              <div className="flex items-center justify-center object-contain w-7 h-full">
                {Icons.customIcons.builder.header.borders}
              </div>
            </div>
          </div>
          {/* Select Device Buttons Container */}
          <div
            id="devices-panel-container"
            className="flex border-r border-l border-grey"
          >
            {/* Desktop Device Container */}
            <div
              id="device-desktop-container"
              className="w-16 hover:bg-dark flex justify-center cursor-pointer"
            >
              <div className="flex items-center justify-center object-contain w-10 h-full">
                {Icons.customIcons.builder.header.desktop}
              </div>
            </div>
            {/* Table Device Container */}
            <div
              id="device-tablet-container"
              className="w-16 hover:bg-dark flex justify-center cursor-pointer"
            >
              <div className="flex items-center justify-center object-contain w-7 h-full fill-grey-lighter stroke-grey-lighter">
                {Icons.customIcons.builder.header.tablet}
              </div>
            </div>
            {/* Mobile Device Container */}
            <div
              id="device-mobile-container"
              className="w-16 hover:bg-dark flex justify-center cursor-pointer"
            >
              <div className="flex items-center justify-center object-contain w-4 h-full fill-grey-lighter stroke-grey-lighter">
                {Icons.customIcons.builder.header.mobile}
              </div>
            </div>
            {/* Canvas Width Display/Input & Options Container  */}
            {/* <div className="flex">
              Canvas Width Display/Input Container
              <div className="flex items-center px-3 group hover:bg-dark">
                <div className="flex justify-between w-[92px] border border-grey pl-3 py-1 h-fit bg-transparent my-auto">
                  <input
                    name="canvas-width"
                    type={"text"}
                    placeholder={"300"}
                    className="w-full bg-transparent outline-none text-white"
                  />
                  <p className="px-3 text-grey-light bg-tranparent">{"px"}</p>
                </div>
              </div>
              Options Container
              <div className="">
                <div className="flex items-center justify-center w-16 hover:bg-dark h-full text-2xl text-grey-lighter cursor-pointer">
                  {Icons.ellipes}
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="relative">Right panel</div>
      </div>
    </header>
  );
};

export default BuilderHeader;

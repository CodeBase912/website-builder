import React, { useState, useEffect } from "react";
import classNames from "classnames";
// Import Custom React Components
import CanvasWidthInput from "./CanvasWidthInput";
// Import Icons
import Logo from "../../components/site/Logo";
import { Icons } from "../../components/common/icons/icons";

const BuilderHeader = ({
  fixed = true,
  iconOnly = false,
  dropDown = false,
  editor,
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

      {/* Builder Header Buttons Container */}
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

          {/* Toggle Canvas Width Handles Container  */}
          <div
            id="canvas-width-adjust-container"
            className="w-16 hover:bg-dark flex"
          >
            <div
              id="canvas-width-adjuster-toggler"
              className="w-16 hover:bg-dark flex justify-center cursor-pointer"
            >
              <div className="flex items-center justify-center object-contain w-10 h-full">
                {Icons.customIcons.builder.header.canvasWidth}
              </div>
            </div>
          </div>

          {/* Devices Panel Container */}
          <div className="flex border-x border-grey">
            {/* Select Device Buttons Container */}
            <div id="devices-panel-container" className="flex">
              {/* Desktop Device Container */}
              <div
                id="device-desktop-container"
                className="w-16 hover:bg-dark flex justify-center cursor-pointer"
              >
                <div className="flex items-center justify-center object-contain w-10 h-full">
                  {Icons.customIcons.builder.header.desktop}
                </div>
              </div>
              {/* Tablet Device Container */}
              <div
                id="device-tablet-container"
                className="w-16 hover:bg-dark flex justify-center cursor-pointer"
              >
                <div className="flex items-center justify-center object-contain w-7 h-full">
                  {Icons.customIcons.builder.header.tablet}
                </div>
              </div>
              {/* Mobile Device Container */}
              <div
                id="device-mobile-container"
                className="w-16 hover:bg-dark flex justify-center cursor-pointer"
              >
                <div className="flex items-center justify-center object-contain w-4 h-full">
                  {Icons.customIcons.builder.header.mobile}
                </div>
              </div>
            </div>

            {/* Canvas Width Display/Input & Options Container  */}
            <div className="flex">
              {/* Canvas Input */}
              <CanvasWidthInput editor={editor} />

              {/* Options Container */}
              <div className="">
                <div className="flex items-center justify-center w-16 hover:bg-dark h-full text-2xl text-grey-lighter cursor-pointer">
                  {Icons.ellipes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative"></div>
    </header>
  );
};

export default BuilderHeader;

import React, { useState, useEffect } from "react";
import classNames from "classnames";
// Import Custom React Components
import Button from "../../components/common/Button";
// Import Icons
import NavBar from "../../components/site/NavBar";
import Logo from "../../components/site/Logo";
import { Icons } from "../../components/common/icons/icons";
import Input from "../../components/common/forms/Input";
import { findActiveDevice } from "../../util/canvas-util";

const BuilderHeader = ({
  fixed = true,
  iconOnly = false,
  dropDown = false,
  editor,
}) => {
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [activeDevice, setActiveDevice] = useState("Desktop");
  useEffect(() => {
    if (editor) {
      //  Get canvas wrapper to which we will obverse
      const canvasWrapper = editor.Canvas.getFrame().view.wrapper.$el[0];
      //  Get canvas width input element
      const canvasWidthInput = document.querySelector("#canvas-width-input");

      //  Get available device from the editor instance
      const availableDevices = editor.Devices.getAll().models.map(
        (device, deviceIndex) => {
          return [device.attributes.priority, device.id];
        }
      );

      // Define the variable that will hold numeric ID that will bw
      // used by the clearTimeOut function to reset the setTimeOut timer
      let timeOutFunctionId;
      //  Use the resize observer to handle canvas width change
      const resize_ob = new ResizeObserver(function (entries) {
        // since we are observing only a single element, so we access the first element in entries array
        let rect = entries[0].contentRect;

        // current width & height
        let width = rect.width;
        let height = rect.height;

        // clearTimeOut() resets the setTimeOut() timer
        // due to this the function in setTimeout() is
        // fired after we are done resizing the canvas
        clearTimeout(timeOutFunctionId);
        // Variable that will hold the active device after canvas resize
        let device;

        // setTimeout returns the numeric ID which is used by
        // clearTimeOut to reset the timer
        timeOutFunctionId = setTimeout((testVar) => {
          // Set the active device after canvas resize
          device = findActiveDevice(width, availableDevices);

          // Check if the active devie has change
          if (activeDevice != device) {
            // Active device changed, update styles
            const previousDeviceBtn = document.querySelector(
              `#device-${activeDevice.toLowerCase()}-container`
            );
            previousDeviceBtn.style = "";

            const selectedDeviceBtn = document.querySelector(
              `#device-${device.toLowerCase()}-container`
            );
            selectedDeviceBtn.style.backgroundColor = "rgba(15, 15, 15, 0.7)";
            selectedDeviceBtn.style.color = "#00edff";
            selectedDeviceBtn.style.fill = "#00edff";
            selectedDeviceBtn.style.stroke = "#00edff";

            // Update active device state variable
            setActiveDevice(device);
          }
        }, 100);

        // Update #canvas-width-input value
        canvasWidthInput.value = Math.floor(width);
      });

      // start observing for resize
      resize_ob.observe(canvasWrapper);

      return () => {
        // stop observing for resize
        resize_ob.unobserve(canvasWrapper);
      };
    }

    return () => {
      //
    };
  }, [editor, canvasWidth, activeDevice]);

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

          {/* Canvas Width Adjust Toggler */}
          <div id="canvas-width-adjust-container">
            <div
              id="canvas-width-adjuster-toggler"
              className="w-16 hover:bg-dark flex justify-center cursor-pointer"
            >
              <div className="flex items-center justify-center object-contain w-10 h-full">
                {Icons.customIcons.builder.header.canvasWidth}
              </div>
            </div>
          </div>

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
              {/* Canvas Width Display/Input Container */}
              <div className="flex items-center px-3 group hover:bg-dark">
                <div className="flex justify-between w-[92px] border border-grey pl-3 py-1 h-fit bg-transparent my-auto">
                  <input
                    id="canvas-width-input"
                    onSubmit={(e) => {
                      console.log("Width: ", e.target.value);
                    }}
                    onKeyDown={(e) => {
                      //   e.preventDefault();
                      console.log("KeyDown event: ", e);
                      console.log("Value: ", e.target.value);
                      console.log("Key: ", e.key);
                      console.log("State: ", e.getModifierState());
                      console.log("Parse key: ", parseInt(e.key));
                      console.log(
                        "Parse key condition: ",
                        parseInt(e.key) / 1 === parseInt(e.key)
                      );
                      if (parseInt(e.key) / 1 !== parseInt(e.key)) {
                        // check if key is Enter or backspace
                        if (
                          e.key === "Enter" ||
                          e.key === "Backspace" ||
                          e.key.includes("Arrow")
                        ) {
                        } else {
                          // Key is not ENTER or BACKSPACE, prevent default
                          e.preventDefault();
                        }
                      }
                    }}
                    onKeyUp={(e) => {
                      console.log("onKeyUp event: ", e);

                      if (e.key === "Enter") {
                        const canvasWrapper =
                          document.querySelector(".gjs-frame-wrapper");
                        // Set the width of the canvas to the current value
                        const frame_wrapper =
                          document.querySelector(".gjs-frame-wrapper");
                        frame_wrapper.style.transition = "0.5 ease-in-out";
                        const canvasContainer = document.querySelector(
                          ".gjs-cv-canvas__frames"
                        );
                        let newCanvasWidth = e.target.value;
                        if (newCanvasWidth < 100) {
                          newCanvasWidth = 100;
                          e.target.value = Math.floor(
                            canvasWrapper.getBoundingClientRect().width
                          );
                          return;
                        } else if (
                          newCanvasWidth >
                          canvasContainer.getBoundingClientRect().width - 100
                        ) {
                          newCanvasWidth = Math.floor(
                            canvasContainer.getBoundingClientRect().width
                          );
                          e.target.value = newCanvasWidth;
                          canvasWrapper.style.width = `${newCanvasWidth}px`;
                          return;
                        }

                        e.target.value = newCanvasWidth;
                        canvasWrapper.style.width = `${newCanvasWidth}px`;
                        // setCanvasWidth(newCanvasWidth);
                      }
                    }}
                    name="canvas-width"
                    type={"text"}
                    placeholder={"300"}
                    defaultValue={canvasWidth}
                    // value={canvasWidth}
                    className="w-full bg-transparent outline-none text-white"
                  />
                  <p className="px-3 text-grey-light bg-tranparent cursor-pointer">
                    {"px"}
                  </p>
                </div>
              </div>
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
      <div className="relative">Right panel</div>
    </header>
  );
};

export default BuilderHeader;

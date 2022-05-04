import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
// import gjsPresetWebpage from "gjs-preset-webpage";
// Import Utility Functions & Variables
import {
  addRightHandleEvent,
  addLeftHandleEvent,
  findActiveDevice,
  addCanvasWidthAdjusters,
  hideCanvasWidthAdjusters,
  addScrollEventToHandles,
  removeScrollEventToHandles,
} from "../../util/canvas-util";
// Import Editor Stylesheet
import "./editor-styles.css";
// Import Custom React Components
import BuilderHeader from "./BuilderHeader";
import { Icons } from "../../components/common/icons/icons";

const Builder = () => {
  const defaultDeviceWidth = "1200";
  const [editor, setEditor] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(defaultDeviceWidth);
  useEffect(() => {
    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: "#gjs",
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: false,
      // Size of the editor
      height: "calc(100vh - 47.03px)",
      width: "calc(100% - 64px)",
      // Disable the storage manager for the moment
      storageManager: false,

      deviceManager: {
        devices: [
          {
            name: "Desktop",
            width: "1200px",
          },
          {
            name: "Tablet",
            width: "768px",
            // widthMedia: "992px",
          },
          // {
          //   name: "Mobile landscape",
          //   width: "575px",
          //   // widthMedia: "575px",
          // },
          {
            name: "Mobile",
            width: "320px",
            // widthMedia: "575px",
          },
        ],
      },
      panels: {
        defaults: [
          {
            id: "toogle-actions",
            el: "#toggle-borders",
            className: "w-16",
            activeClassName: "bg-red",
            buttons: [
              {
                id: "borders-toggle",
                el: "#border-toggle-btn",
                className: "w-8 ",
                command: "sw-visibility", // Built-In command
                active: true,
                togglable: true,
              },
            ],
          },
          {
            id: "device-actions",
            el: "#devices-panel-container",
            buttons: [
              {
                id: "Desktop",
                el: "#device-desktop-container",
                className: "w-16",
                command: "set-device-desktop",
                active: true,
                togglable: false,
                attributes: {
                  title: "Desktop (1200px and below)",
                },
              },
              {
                id: "Tablet",
                el: "#device-tablet-container",
                className: "w-16",
                command: "set-device-tablet", // Built-in command
                togglable: false,
                attributes: {
                  title: "Tablet (768px and below)",
                },
              },
              {
                id: "Mobile",
                el: "#device-mobile-container",
                className: "w-16",
                command: "set-device-mobile", // Built-in command
                togglable: false,
                attributes: {
                  title: "Mobile (320px and below)",
                },
              },
            ],
          },
          // {
          //   id: "device-actions-panel",
          //   el: "#user-actions-container",
          //   command: "make-canvas-width-adjustable", // Built-in command
          //   buttons: [
          //     {
          //       id: "Preview",
          //       el: "#open-preview-mode-btn",
          //       className: "w-16",
          //       command: "preview", // Built-In command
          //       togglable: true,
          //       attributes: {
          //         title: "Manually adjust canvas width",
          //       },
          //     },
          //   ],
          // },
          {
            id: "canvas-width-adjust-panel",
            el: "#canvas-width-adjust-container",
            className: "text-xs whitespace-nowrap",
            command: "make-canvas-width-adjustable", // Built-in command
            // togglable: true,
            buttons: [
              {
                id: "canvas-width-adjust-btn",
                el: "#canvas-width-adjuster-toggler",
                className: "w-8",
                command: "make-canvas-width-adjustable", // Built-In command
                active: true,
                togglable: true,
                attributes: {
                  title: "Manually adjust canvas width",
                },
              },
            ],
          },
        ],
      },
      canvas: {
        // em: { dragMode: true },
      },
      frame: {
        component: {
          id: "right-drag",
          el: ".gjs-frame-wrapper__right",
          attributes: {
            title: "Drag to Resize",
            "data-tooltip-pos": "bottom",
          },
        },
      },
      // plugins: [gjsPresetWebpage],
      // pluginsOpts: []
    });

    // editor.on("load", () => {
    //   // Remove duplicate panel buttons container
    //   Array.from(document.querySelectorAll(".gjs-pn-buttons")).map((list) => {
    //     if (list.innerHTML == "") {
    //       console.log(list);
    //       list.remove();
    //     }
    //   });
    // });

    // DEFAULT COMMANDS
    // var crc = "create-comp";
    // var mvc = "move-comp";
    // var swv = "sw-visibility";
    // var expt = "export-template";
    // var osm = "open-sm";
    // var otm = "open-tm";
    // var ola = "open-layers";
    // var obl = "open-blocks";
    // var ful = "fullscreen";
    // var prv = "preview";

    editor.on("load", () => {
      // editor.getDevice()();
    });

    editor.on("device:select", (selectedDevice, previousDevice) => {
      // console.log("DEVICE CHANGED >>>>>>>>>>>>>>>>>");
      // console.log("selectedDevice: ", selectedDevice);
      // console.log("previousDevice: ", previousDevice);
      // console.log("Editor: ", editor.Devices.get(selectedDevice.id));
      // const selectedDeviceBtn = document.querySelector(
      //   `#device-${selectedDevice.id.toLowerCase()}-container`
      // );
      // console.log("selectedDeviceBtn: ", selectedDeviceBtn);
      // selectedDeviceBtn.classList.add("gjs-pn-active");
      // selectedDeviceBtn.classList.add("gjs-four-color");
      // console.log("Classes: ", selectedDeviceBtn.classList);
      // const previousDeviceBtn = document.querySelector(
      //   `#device-${previousDevice.id.toLowerCase()}-container`
      // );
      // previousDeviceBtn.classList.remove("gjs-pn-active");
      // previousDeviceBtn.classList.remove("gjs-four-color");
      // console.log("Active Device: ", activeDevice);
      // const device = test(width, availableDevices);
      // console.log("device: ", device);
      // console.log("device toLowerCase: ", device.toLowerCase());
      // if (previousDevice.id != selectedDevice.id) {
      //   const selectedDeviceBtn = document.querySelector(
      //     `#device-${selectedDevice.id.toLowerCase()}-container`
      //   );
      //   selectedDeviceBtn.classList.add("gjs-pn-active");
      //   selectedDeviceBtn.classList.add("gjs-four-color");
      //   const previousDeviceBtn = document.querySelector(
      //     `#device-${previousDevice.id.toLowerCase()}-container`
      //   );
      //   previousDeviceBtn.classList.remove("gjs-pn-active");
      //   previousDeviceBtn.classList.remove("gjs-four-color");
      //   // setActiveDevice(device);
      // }
    });

    // ----------------------------------------------------------
    // ADD COMMANDS
    // ----------------------------------------------------------

    editor.Commands.add("canvas-set-device", {
      run: (editor, ...inputVars) => {
        // Get the canvas wrapper element and its width
        const canvasWrapper = document.querySelector(".gjs-frame-wrapper");
        const canvasWidth = canvasWrapper.getBoundingClientRect().width;

        // Get all available devices
        const availableDevices = editor.Devices.getAll().models.map(
          (device, deviceIndex) => {
            return [device.attributes.priority, device.id];
          }
        );

        // Determine the active device
        const activeDevice = findActiveDevice(canvasWidth, availableDevices);

        // Find width of selected device from editor intance
        const selectedDevice = inputVars[1].device;
        const selectedDeviceWidth =
          editor.Devices.get(selectedDevice).attributes.priority;

        // Remove active btn styles to previousDeviceBtn
        const previousDeviceBtn = document.querySelector(
          `#device-${activeDevice.toLowerCase()}-container`
        );
        previousDeviceBtn.style = "";

        // Add active btn styles to selectedDeviceBtn
        const selectedDeviceBtn = document.querySelector(
          `#device-${selectedDevice.toLowerCase()}-container`
        );
        selectedDeviceBtn.style.backgroundColor = "rgba(15, 15, 15, 0.7)";
        selectedDeviceBtn.style.color = "#00edff";
        selectedDeviceBtn.style.fill = "#00edff";
        selectedDeviceBtn.style.stroke = "#00edff";

        // Update canvas width
        canvasWrapper.style.transition = "all 0.5s ease-in-out";
        canvasWrapper.style.width = `${selectedDeviceWidth}px`;
      },
    });

    editor.Commands.add("set-device-desktop", {
      run: (e) => e.runCommand("canvas-set-device", { device: "Desktop" }),
      // stop() {},
    });

    editor.Commands.add("set-device-tablet", {
      run: (e) => e.runCommand("canvas-set-device", { device: "Tablet" }),
      // stop() {},
    });

    editor.Commands.add("set-device-mobile", {
      run: (e) => {
        e.runCommand("canvas-set-device", { device: "Mobile" });
      },
      // stop() {},
    });

    editor.Commands.add("make-canvas-width-adjustable", {
      run: addScrollEventToHandles,
      stop: removeScrollEventToHandles,
    });

    console.log("Editor canvas: ", editor.Canvas);

    setEditor(editor);
  }, []);

  return (
    <div className="overflow-hidden flex flex-col h-screen w-screenw max-w-full">
      <BuilderHeader fixed={false} iconOnly dropDown editor={editor} />
      <main className="flex flex-row relative h-full flex-1 w-full bg-gray-100">
        {/* Side Bar Container/BG */}
        <div className="w-16 h-full bg-white">
          {/* Side Bar Panel */}
          <div id="sidebar-panel flex flex-col h-full">
            {/* Pages Button Container */}
            <div
              id="sidebar-pn-pages"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-7 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.pages}</div>
              </div>
            </div>
            {/* Blocks Button Container */}
            <div
              id="sidebar-pn-pages"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.blocks}</div>
              </div>
            </div>
            {/* Layers Button Container */}
            <div
              id="sidebar-pn-pages"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-10 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.layers}</div>
              </div>
            </div>
            {/* Style Button Container */}
            <div
              id="sidebar-pn-pages"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.styles}</div>
              </div>
            </div>
            {/* Component Settings Button Container */}
            <div
              id="sidebar-pn-pages"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.traits}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div id="gjs" className="w-full h-screenh relative">
          <h1>Hello World Component!</h1>
        </div>
      </main>
    </div>
  );
};

export default Builder;

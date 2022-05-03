import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
// import gjsPresetWebpage from "gjs-preset-webpage";
// Import Utility Functions & Variables
import {
  addRightHandleEvent,
  addLeftHandleEvent,
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
          {
            name: "Mobile landscape",
            width: "575px",
            // widthMedia: "575px",
          },
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
                  title: "Desktop",
                },
              },
              {
                id: "Tablet",
                el: "#device-tablet-container",
                className: "w-16",
                command: "set-device-tablet", // Built-in command
                togglable: false,
                attributes: {
                  title: "Tablet",
                },
              },
              {
                id: "Mobile",
                el: "#device-mobile-container",
                className: "w-16",
                command: "set-device-mobile", // Built-in command
                togglable: false,
                attributes: {
                  title: "Mobile",
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
            togglable: true,
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

    // ----------------------------------------------------------
    // ADD COMMANDS
    // ----------------------------------------------------------
    editor.Commands.add("canvas-set-device", {
      run: (editor, ...inputVars) => {
        // const editor = inputVars[0].editor;
        const device = inputVars[1].device;
        editor.setDevice(device);
        // Update canvas-width-input value
        // document.querySelector("#canvas-width-input").value =
        // editor.Devices.get(device).attributes.priority;
      },
    });
    editor.Commands.add("set-device-desktop", {
      run: (e) => e.runCommand("canvas-set-device", { device: "Desktop" }),
      stop() {},
    });
    editor.Commands.add("set-device-tablet", {
      run: (e) => e.runCommand("canvas-set-device", { device: "Tablet" }),
      stop() {},
    });
    editor.Commands.add("set-device-mobile", {
      run: (e) => e.runCommand("canvas-set-device", { device: "Mobile" }),
      stop() {},
    });
    editor.Commands.add("make-canvas-width-adjustable", {
      addCanvasWidthAdjusters: function () {
        const rightScrollController = document.querySelector(
          ".gjs-frame-wrapper__right"
        );
        rightScrollController.classList.remove("hidden");
        rightScrollController.classList.add("group");
        rightScrollController.classList.add("cursor-grab");
        rightScrollController.classList.add("active:cursor-grabbing");
        rightScrollController.innerHTML =
          '<div data-right-scroll class="bg-grey-light group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
        rightScrollController.style.width = "50px";
        rightScrollController.style.padding = "0 15px";
        rightScrollController.style.height = "100px";
        rightScrollController.setAttribute(
          "data-tooltip",
          "Adjust canvas width"
        );

        const leftScrollController = document.querySelector(
          ".gjs-frame-wrapper__left"
        );
        leftScrollController.classList.remove("hidden");
        leftScrollController.classList.add("group");
        leftScrollController.classList.add("cursor-grab");
        leftScrollController.classList.add("active:cursor-grabbing");
        leftScrollController.innerHTML =
          '<div data-left-scroll class="bg-grey-light group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
        leftScrollController.style.width = "50px";
        leftScrollController.style.padding = "0 15px";
        leftScrollController.style.height = "100px";
        leftScrollController.setAttribute(
          "data-tooltip",
          "Adjust canvas width"
        );
      },
      hideCanvasWidthAdjusters: () => {
        const rightScrollController = document.querySelector(
          ".gjs-frame-wrapper__right"
        );
        rightScrollController.classList.add("hidden");
        rightScrollController.innerHTML = "";

        const leftScrollController = document.querySelector(
          ".gjs-frame-wrapper__left"
        );
        leftScrollController.classList.add("hidden");
        leftScrollController.innerHTML = "";
      },
      addScrollEventToHandles: function () {
        this.addCanvasWidthAdjusters();
        const right_drag = document.querySelector(".gjs-frame-wrapper__right");
        const left_drag = document.querySelector(".gjs-frame-wrapper__left");
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        // Add event listeners
        right_drag.addEventListener("mousedown", addRightHandleEvent);
        left_drag.addEventListener("mousedown", addLeftHandleEvent);
      },
      removeScrollEventToHandles: function (editor) {
        console.log("Removeing events >>>>>>>>>>>>");
        console.log(editor.Canvas.getCanvasView());
        this.hideCanvasWidthAdjusters();
        const right_drag = document.querySelector(".gjs-frame-wrapper__right");
        const left_drag = document.querySelector(".gjs-frame-wrapper__left");
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        // Add event listeners
        right_drag.removeEventListener("mousedown", addRightHandleEvent);
        left_drag.removeEventListener("mousedown", addLeftHandleEvent);
      },
      run: function () {
        this.addScrollEventToHandles();
      },
      stop: function (e) {
        this.removeScrollEventToHandles(e);
      },
    });

    console.log("Editor canvas: ", editor.Canvas);

    setEditor(editor);
  }, []);
  return (
    <div className="overflow-hidden flex flex-col min-h-screen w-screenw max-w-full">
      <BuilderHeader
        fixed={false}
        iconOnly
        dropDown
        editor={editor}
        // canvasWidth={canvasWidth}
      />
      <main className="flex flex-row relative h-screenh flex-1 w-full bg-gray-100">
        {/* Side Bar Container/BG */}
        <div className="w-16 h-[calc(100vh - 47.03px)] bg-white">
          {/* Side Bar Panel */}
          <div id="sidebar-panel flex flex-col">
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

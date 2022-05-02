import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
// import gjsPresetWebpage from "gjs-preset-webpage";
// Import Editor Stylesheet
import "./editor-styles.css";
import BuilderHeader from "./BuilderHeader";
// Import Custom React Components

const Builder = () => {
  const defaultDeviceWidth = "1200px";
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
    editor.Commands.add("set-device-desktop", {
      run(e) {
        e.setDevice("Desktop");
      },
      stop() {},
    });
    editor.Commands.add("set-device-tablet", {
      run(e) {
        removeScrollEventToHandles();
        e.setDevice("Tablet");
      },
      stop() {},
    });
    editor.Commands.add("set-device-mobile", {
      run(e) {
        e.setDevice("Mobile");
      },
      stop() {},
    });
    editor.Commands.add("make-canvas-width-adjustable", {
      onRightDragHandler: function (e) {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.remove("pointer-events-auto");
        frame_wrapper.classList.remove("pointer-events-none");
        frame_wrapper.classList.add("pointer-events-none");
        const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
        const to = e.clientX;
        const newWidth = to - frame_wrapper.getBoundingClientRect().left;
        if (newWidth < canvasFrames.getBoundingClientRect().width) {
          frame_wrapper.style.width = newWidth + "px";
        }
      },
      onLeftDragHandler: function (e) {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.remove("pointer-events-auto");
        frame_wrapper.classList.remove("pointer-events-none");
        frame_wrapper.classList.add("pointer-events-none");
        const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
        const to = e.clientX;
        const newWidth = frame_wrapper.getBoundingClientRect().right - to;
        if (newWidth < canvasFrames.getBoundingClientRect().width) {
          frame_wrapper.style.width = newWidth + "px";
        }
      },
      onDragStopHandler: function () {
        // Remove drag event listeners
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.add("pointer-events-auto");
        frame_wrapper.classList.remove("pointer-events-none");
        document.removeEventListener("mousemove", onRightDragHandler);
        document.removeEventListener("mousemove", onLeftDragHandler);
        document.removeEventListener("mouseup", onDragStopHandler);
      },
      AddRightHandleEvent: function () {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.add("pointer-events-none");
        frame_wrapper.classList.remove("pointer-events-auto");
        document.addEventListener("mousemove", onRightDragHandler);
        document.addEventListener("mouseup", onDragStopHandler);
      },
      AddLeftHandleEvent: function () {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.add("pointer-events-none");
        frame_wrapper.classList.remove("pointer-events-auto");
        document.addEventListener("mousemove", onLeftDragHandler);
        document.addEventListener("mouseup", onDragStopHandler);
      },
      // right_drag: document.querySelector(".gjs-frame-wrapper__right"),
      // left_drag: document.querySelector(".gjs-frame-wrapper__left"),
      addScrollEventToHandles: function () {
        const right_drag = document.querySelector(".gjs-frame-wrapper__right");
        const left_drag = document.querySelector(".gjs-frame-wrapper__left");
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        // Add event listeners
        right_drag.addEventListener("mousedown", this.AddRightHandleEvent);
        left_drag.addEventListener("mousedown", this.AddLeftHandleEvent);
      },
      removeScrollEventToHandles: function () {
        console.log("Removeing events >>>>>>>>>>>>");
        const right_drag = document.querySelector(".gjs-frame-wrapper__right");
        const left_drag = document.querySelector(".gjs-frame-wrapper__left");
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        // Add event listeners
        right_drag.removeEventListener("mousedown", this.AddRightHandleEvent);
        left_drag.removeEventListener("mousedown", this.AddLeftHandleEvent);
      },
      run: function () {
        this.addScrollEventToHandles();
      },
      stop: function () {
        this.removeScrollEventToHandles();
      },
    });

    const addCanvasWidthAdjusters = () => {
      const rightScrollController = document.querySelector(
        ".gjs-frame-wrapper__right"
      );
      const leftScrollController = document.querySelector(
        ".gjs-frame-wrapper__left"
      );
      rightScrollController.classList.add("group");
      rightScrollController.classList.add("cursor-grab");
      rightScrollController.classList.add("active:cursor-grabbing");
      rightScrollController.innerHTML =
        '<div data-right-scroll class="bg-grey-light group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
      rightScrollController.style.width = "50px";
      rightScrollController.style.padding = "0 15px";
      rightScrollController.style.height = "100px";
      rightScrollController.setAttribute("data-tooltip", "Adjust canvas width");

      leftScrollController.classList.add("group");
      leftScrollController.classList.add("cursor-grab");
      leftScrollController.classList.add("active:cursor-grabbing");
      leftScrollController.innerHTML =
        '<div data-left-scroll class="bg-grey-light group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
      leftScrollController.style.width = "50px";
      leftScrollController.style.padding = "0 15px";
      leftScrollController.style.height = "100px";
      leftScrollController.setAttribute("data-tooltip", "Adjust canvas width");
    };
    addCanvasWidthAdjusters();

    const onRightDragHandler = (e) => {
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      frame_wrapper.classList.remove("pointer-events-auto");
      frame_wrapper.classList.remove("pointer-events-none");
      frame_wrapper.classList.add("pointer-events-none");
      const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
      const to = e.clientX;
      const newWidth = to - frame_wrapper.getBoundingClientRect().left;
      if (newWidth < canvasFrames.getBoundingClientRect().width) {
        frame_wrapper.style.width = newWidth + "px";
      }
    };

    const onLeftDragHandler = (e) => {
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      frame_wrapper.classList.remove("pointer-events-auto");
      frame_wrapper.classList.remove("pointer-events-none");
      frame_wrapper.classList.add("pointer-events-none");
      const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
      const to = e.clientX;
      const newWidth = frame_wrapper.getBoundingClientRect().right - to;
      if (newWidth < canvasFrames.getBoundingClientRect().width) {
        frame_wrapper.style.width = newWidth + "px";
      }
    };

    const onDragStopHandler = () => {
      // Remove drag event listeners
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      frame_wrapper.classList.add("pointer-events-auto");
      frame_wrapper.classList.remove("pointer-events-none");
      document.removeEventListener("mousemove", onRightDragHandler);
      document.removeEventListener("mousemove", onLeftDragHandler);
      document.removeEventListener("mouseup", onDragStopHandler);
    };

    const AddRightHandleEvent = function () {
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      frame_wrapper.classList.add("pointer-events-none");
      frame_wrapper.classList.remove("pointer-events-auto");
      document.addEventListener("mousemove", onRightDragHandler);
      document.addEventListener("mouseup", onDragStopHandler);
    };
    const AddLeftHandleEvent = function () {
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      frame_wrapper.classList.add("pointer-events-none");
      frame_wrapper.classList.remove("pointer-events-auto");
      document.addEventListener("mousemove", onLeftDragHandler);
      document.addEventListener("mouseup", onDragStopHandler);
    };

    const addScrollEventToHandles = function () {
      const right_drag = document.querySelector(".gjs-frame-wrapper__right");
      const left_drag = document.querySelector(".gjs-frame-wrapper__left");
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      // Add event listeners
      right_drag.addEventListener("mousedown", AddRightHandleEvent);
      left_drag.addEventListener("mousedown", AddLeftHandleEvent);
    };
    // addScrollEventToHandles();

    function removeScrollEventToHandles() {
      console.log("Removeing events >>>>>>>>>>>>");
      const right_drag = document.querySelector(".gjs-frame-wrapper__right");
      const left_drag = document.querySelector(".gjs-frame-wrapper__left");
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      // Add event listeners
      right_drag.removeEventListener("mousedown", AddRightHandleEvent);
      left_drag.removeEventListener("mousedown", AddLeftHandleEvent);
    }
    // removeScrollEventToHandles();

    const test = {
      onRightDragHandler: function (e) {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.remove("pointer-events-auto");
        frame_wrapper.classList.remove("pointer-events-none");
        frame_wrapper.classList.add("pointer-events-none");
        const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
        const to = e.clientX;
        const newWidth = to - frame_wrapper.getBoundingClientRect().left;
        if (newWidth < canvasFrames.getBoundingClientRect().width) {
          frame_wrapper.style.width = newWidth + "px";
        }
      },
      onLeftDragHandler: function (e) {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.remove("pointer-events-auto");
        frame_wrapper.classList.remove("pointer-events-none");
        frame_wrapper.classList.add("pointer-events-none");
        const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
        const to = e.clientX;
        const newWidth = frame_wrapper.getBoundingClientRect().right - to;
        if (newWidth < canvasFrames.getBoundingClientRect().width) {
          frame_wrapper.style.width = newWidth + "px";
        }
      },
      onDragStopHandler: function () {
        // Remove drag event listeners
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.add("pointer-events-auto");
        frame_wrapper.classList.remove("pointer-events-none");
        document.removeEventListener("mousemove", onRightDragHandler);
        document.removeEventListener("mousemove", onLeftDragHandler);
        document.removeEventListener("mouseup", onDragStopHandler);
      },
      AddRightHandleEvent: function () {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.add("pointer-events-none");
        frame_wrapper.classList.remove("pointer-events-auto");
        document.addEventListener("mousemove", onRightDragHandler);
        document.addEventListener("mouseup", onDragStopHandler);
      },
      AddLeftHandleEvent: function () {
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        frame_wrapper.classList.add("pointer-events-none");
        frame_wrapper.classList.remove("pointer-events-auto");
        document.addEventListener("mousemove", onLeftDragHandler);
        document.addEventListener("mouseup", onDragStopHandler);
      },
      // right_drag: document.querySelector(".gjs-frame-wrapper__right"),
      // left_drag: document.querySelector(".gjs-frame-wrapper__left"),
      addScrollEventToHandles: function () {
        const right_drag = document.querySelector(".gjs-frame-wrapper__right");
        const left_drag = document.querySelector(".gjs-frame-wrapper__left");
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        // Add event listeners
        right_drag.addEventListener("mousedown", this.AddRightHandleEvent);
        left_drag.addEventListener("mousedown", this.AddLeftHandleEvent);
      },
      removeScrollEventToHandles: function () {
        console.log("Removeing events >>>>>>>>>>>>");
        const right_drag = document.querySelector(".gjs-frame-wrapper__right");
        const left_drag = document.querySelector(".gjs-frame-wrapper__left");
        const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
        // Add event listeners
        right_drag.removeEventListener("mousedown", this.AddRightHandleEvent);
        left_drag.removeEventListener("mousedown", this.AddLeftHandleEvent);
      },
      run: function () {
        this.addScrollEventToHandles();
      },
      stop: function () {
        this.removeScrollEventToHandles();
      },
    };
    // test.addScrollEventToHandles();
    // test.removeScrollEventToHandles();

    // editor.on("component:selected", (component) =>
    //   console.log("Selected Component: ", component)
    // );

    // editor.Commands.add("adjustCanvasWidth", {
    //   run(editor, sender) {
    //     console.log("Adjusting Canvas Width...");
    //     // const canvas = editor.Canvas.getFrameEl();
    //     const canvas =
    //       editor.Canvas.getElement().querySelector(".gjs-frame-wrapper");
    //     const rightScrollController = editor.Canvas.getElement().querySelector(
    //       ".gjs-frame-wrapper__right"
    //     );
    //     const leftScrollController = editor.Canvas.getElement().querySelector(
    //       ".gjs-frame-wrapper__left"
    //     );

    //     const handleScroll = (e, element, canvas, startPt, edgeDist) => {
    //       const to = e.x - edgeDist;
    //       canvas.style.width =
    //         canvas.getBoundingClientRect().width + (to - startPt);
    //     };
    //     // Add Event Listener
    //     rightScrollController.addEventListener("mousedown", (event) => {
    //       const startPt = event.clientX;
    //       const fromX = rightScrollController.getBoundingClientRect().left;
    //       // Determine distance between mouse position and element edge
    //       const edgeDist = event.x - fromX;
    //       document.addEventListener("mousemove", (e) => {
    //         handleScroll(e, rightScrollController, canvas, startPt, edgeDist);
    //       });
    //     });
    //     rightScrollController.addEventListener("mouseup", (event) => {
    //       document.removeEventListener("mousemove", (e) => {
    //         const startPt = event.clientX;
    //         const fromX = rightScrollController.getBoundingClientRect().left;
    //         // Determine distance between mouse position and element edge
    //         const edgeDist = event.x - fromX;
    //         handleScroll(e, rightScrollController, canvas, startPt, edgeDist);
    //       });
    //     });
    //     leftScrollController.addEventListener("mousedown", (event) => {
    //       const startPt = event.clientX;
    //       const fromX = leftScrollController.getBoundingClientRect().left;
    //       // Determine distance between mouse position and element edge
    //       const edgeDist = event.x - fromX;
    //       document.addEventListener("mousemove", (e) => {
    //         handleScroll(e, leftScrollController, canvas, startPt, edgeDist);
    //       });
    //     });
    //     leftScrollController.addEventListener("mouseup", (event) => {
    //       const startPt = event.clientX;
    //       const fromX = leftScrollController.getBoundingClientRect().left;
    //       // Determine distance between mouse position and element edge
    //       const edgeDist = event.x - fromX;
    //       document.removeEventListener("mousemove", (e) => {
    //         handleScroll(e, leftScrollController, canvas, startPt, edgeDist);
    //       });
    //     });
    //   },
    //   stop(editor, sender) {
    //     // const canvas = editor.Canvas.getFrameEl();
    //     const canvas =
    //       editor.Canvas.getElement().querySelector(".gjs-frame-wrapper");
    //     const rightScrollController = editor.Canvas.getElement().querySelector(
    //       ".gjs-frame-wrapper__right"
    //     );
    //     const leftScrollController = editor.Canvas.getElement().querySelector(
    //       ".gjs-frame-wrapper__left"
    //     );

    //     const handleScroll = (e, element, canvas, startPt, edgeDist) => {
    //       const to = e.x - edgeDist;
    //       canvas.style.width =
    //         canvas.getBoundingClientRect().width + (to - startPt);
    //     };
    //     // Remove Event Listener
    //     rightScrollController.removeEventListener("mousedown", (event) => {
    //       const startPt = event.clientX;
    //       const fromX = rightScrollController.getBoundingClientRect().left;
    //       // Determine distance between mouse position and element edge
    //       const edgeDist = event.x - fromX;
    //       document.removeEventListener("mousemove", (e) => {
    //         handleScroll(e, rightScrollController, canvas, startPt, edgeDist);
    //       });
    //     });

    //     leftScrollController.removeEventListener("mousedown", (event) => {
    //       const startPt = event.clientX;
    //       const fromX = leftScrollController.getBoundingClientRect().left;
    //       // Determine distance between mouse position and element edge
    //       const edgeDist = event.x - fromX;
    //       document.removeEventListener("mousemove", (e) => {
    //         handleScroll(e, leftScrollController, canvas, startPt, edgeDist);
    //       });
    //     });
    //   },
    // });

    console.log("Editor canvas: ", editor.Canvas.getFrames());

    setEditor(editor);
  }, []);
  return (
    <div className="overflow-hidden flex flex-col min-h-screen w-screenw max-w-full">
      <BuilderHeader fixed={false} iconOnly dropDown editor={editor} />
      <main className="flex flex-row relative h-screenh flex-1 w-full bg-gray-100">
        <div className="w-16 h-[calc(100vh - 47.03px)] bg-white"></div>
        <div id="gjs" className="w-full h-screenh relative">
          <h1>Hello World Component!</h1>
        </div>
      </main>
    </div>
  );
};

export default Builder;

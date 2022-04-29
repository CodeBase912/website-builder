import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
// Import Editor Stylesheet
import "./editor-styles.css";
import BuilderHeader from "./BuilderHeader";
import { Icons } from "../../components/common/icons/icons";
import CustomIcon from "../../components/common/icons/CustomIcon";
import { iconPaths } from "../../components/common/icons/paths";
// Import Custom React Components

const Builder = () => {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: "#gjs",
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: "calc(100vh - 47.03px)",
      width: "auto",
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel

      panels: {
        defaults: [
          {
            id: "basic-actions",
            el: ".panel__basic-actions",
            buttons: [
              {
                id: "visibility",
                el: "#toggle-borders",
                active: true, // active by default
                className: "w-8",
                command: "sw-visibility", // Built-in command
              },
            ],
          },
          {
            id: "panel-devices",
            el: "#panel__devices",
            buttons: [
              {
                id: "device-desktop",
                // el: "#device-desktop-container",
                className: "w-10",
                command: "set-device-desktop", // Built-in command
                active: true,
                toggleable: false,
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
            title: "About",
            "data-tooltip-pos": "bottom",
          },
        },
      },
    });

    // console.log(editor.Canvas.getElement());
    // console.log(editor.Canvas.getFrameEl());
    // // Set width of canvas
    // // editor.Canvas.getFrameEl().style.width = "200px";
    const rightScrollController = document.querySelector(
      ".gjs-frame-wrapper__right"
    );
    const leftScrollController = document.querySelector(
      ".gjs-frame-wrapper__left"
    );
    // leftScrollController.innerHtml = '<div class="bg-primary">hello</div>';
    // document.querySelector(".gjs-frame-wrapper__right").innerHTML =
    //   '<div class="bg-primary">Hello</div>';
    // console.log({ rightScrollController, leftScrollController });
    // leftScrollController.style.background = "gray";
    // leftScrollController.style.width = "50px";
    // leftScrollController.style.height = "100px";
    // rightScrollController.innerHtml = '<div class="bg-primary">hello</div>';
    rightScrollController.classList.add("group");
    rightScrollController.classList.add("cursor-grab");
    rightScrollController.classList.add("active:cursor-grabbing");
    rightScrollController.innerHTML =
      '<div data-right-scroll class="bg-grey-light group-hover:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
    rightScrollController.style.width = "50px";
    rightScrollController.style.padding = "0 15px";
    rightScrollController.style.height = "100px";
    rightScrollController.setAttribute("data-tooltip", "Adjust canvas width");

    leftScrollController.classList.add("group");
    leftScrollController.classList.add("cursor-grab");
    leftScrollController.classList.add("active:cursor-grabbing");
    leftScrollController.classList.add("active:bg-primary");
    leftScrollController.innerHTML =
      '<div class="bg-grey-light group-hover:bg-primary group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
    leftScrollController.style.width = "50px";
    leftScrollController.style.padding = "0 15px";
    leftScrollController.style.height = "100px";
    // // rightScrollController.style.left =
    // //   editor.Canvas.getFrameEl().getBoundingClientRect().right;
    // console.log("Canvas config: ", editor.Canvas.getConfig());
    // console.log("Canvas model: ", editor.Canvas.getModel());
    // // console.log(editor.Canvas.getResizerEl());
    // console.log(editor.Canvas.getRect());

    const onDragHandler = (e) => {
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

    const onDragStopHandler = () => {
      // Remove drag event listeners
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      const right_scroll = document.querySelector("*[data-right-scroll]");
      frame_wrapper.classList.add("pointer-events-auto");
      frame_wrapper.classList.remove("pointer-events-none");
      right_scroll.classList.remove("bg-primary");
      document.removeEventListener("mousemove", onDragHandler);
      document.removeEventListener("mouseup", onDragStopHandler);
    };

    const addScroll = function () {
      const right_drag = document.querySelector(".gjs-frame-wrapper__right");
      const right_scroll = document.querySelector("*[data-right-scroll]");
      const left_drag = document.querySelector(".gjs-frame-wrapper__left");
      const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
      // right_drag.style.width = "50px";
      // left_drag.style.width = "50px";
      // frame_wrapper.style.margin = "20px";
      // frame_wrapper.style.left = "50%";
      // frame_wrapper.style.transform = "translateX(-50%)";
      right_drag.addEventListener("mousedown", (event) => {
        frame_wrapper.classList.add("pointer-events-none");
        frame_wrapper.classList.remove("pointer-events-auto");
        right_scroll.classList.add("bg-primary");
        // Determine distance between mouse position and element edge
        // const fromX = right_drag.getBoundingClientRect().left;
        // const edgeDist = event.x - fromX;
        document.addEventListener("mousemove", onDragHandler);
        document.addEventListener("mouseup", onDragStopHandler);
      });
    };
    addScroll();

    editor.on("component:selected", (component) =>
      console.log("Selected Component: ", component)
    );

    editor.Commands.add("adjustCanvasWidth", {
      run(editor, sender) {
        console.log("Adjusting Canvas Width...");
        // const canvas = editor.Canvas.getFrameEl();
        const canvas =
          editor.Canvas.getElement().querySelector(".gjs-frame-wrapper");
        const rightScrollController = editor.Canvas.getElement().querySelector(
          ".gjs-frame-wrapper__right"
        );
        const leftScrollController = editor.Canvas.getElement().querySelector(
          ".gjs-frame-wrapper__left"
        );

        const handleScroll = (e, element, canvas, startPt, edgeDist) => {
          const to = e.x - edgeDist;
          canvas.style.width =
            canvas.getBoundingClientRect().width + (to - startPt);
        };
        // Add Event Listener
        rightScrollController.addEventListener("mousedown", (event) => {
          const startPt = event.clientX;
          const fromX = rightScrollController.getBoundingClientRect().left;
          // Determine distance between mouse position and element edge
          const edgeDist = event.x - fromX;
          document.addEventListener("mousemove", (e) => {
            handleScroll(e, rightScrollController, canvas, startPt, edgeDist);
          });
        });
        rightScrollController.addEventListener("mouseup", (event) => {
          document.removeEventListener("mousemove", (e) => {
            const startPt = event.clientX;
            const fromX = rightScrollController.getBoundingClientRect().left;
            // Determine distance between mouse position and element edge
            const edgeDist = event.x - fromX;
            handleScroll(e, rightScrollController, canvas, startPt, edgeDist);
          });
        });
        leftScrollController.addEventListener("mousedown", (event) => {
          const startPt = event.clientX;
          const fromX = leftScrollController.getBoundingClientRect().left;
          // Determine distance between mouse position and element edge
          const edgeDist = event.x - fromX;
          document.addEventListener("mousemove", (e) => {
            handleScroll(e, leftScrollController, canvas, startPt, edgeDist);
          });
        });
        leftScrollController.addEventListener("mouseup", (event) => {
          const startPt = event.clientX;
          const fromX = leftScrollController.getBoundingClientRect().left;
          // Determine distance between mouse position and element edge
          const edgeDist = event.x - fromX;
          document.removeEventListener("mousemove", (e) => {
            handleScroll(e, leftScrollController, canvas, startPt, edgeDist);
          });
        });
      },
      stop(editor, sender) {
        // const canvas = editor.Canvas.getFrameEl();
        const canvas =
          editor.Canvas.getElement().querySelector(".gjs-frame-wrapper");
        const rightScrollController = editor.Canvas.getElement().querySelector(
          ".gjs-frame-wrapper__right"
        );
        const leftScrollController = editor.Canvas.getElement().querySelector(
          ".gjs-frame-wrapper__left"
        );

        const handleScroll = (e, element, canvas, startPt, edgeDist) => {
          const to = e.x - edgeDist;
          canvas.style.width =
            canvas.getBoundingClientRect().width + (to - startPt);
        };
        // Remove Event Listener
        rightScrollController.removeEventListener("mousedown", (event) => {
          const startPt = event.clientX;
          const fromX = rightScrollController.getBoundingClientRect().left;
          // Determine distance between mouse position and element edge
          const edgeDist = event.x - fromX;
          document.removeEventListener("mousemove", (e) => {
            handleScroll(e, rightScrollController, canvas, startPt, edgeDist);
          });
        });

        leftScrollController.removeEventListener("mousedown", (event) => {
          const startPt = event.clientX;
          const fromX = leftScrollController.getBoundingClientRect().left;
          // Determine distance between mouse position and element edge
          const edgeDist = event.x - fromX;
          document.removeEventListener("mousemove", (e) => {
            handleScroll(e, leftScrollController, canvas, startPt, edgeDist);
          });
        });
      },
    });

    console.log("Editor canvas: ", editor.Canvas);
  }, []);
  return (
    <div className="overflow-hidden flex flex-col min-h-screen w-screenw max-w-full">
      <BuilderHeader fixed={false} iconOnly dropDown />
      <main className="flex flex-col relative h-screenh flex-1 w-full bg-primary">
        <div id="gjs">
          <h1>Hello World Component!</h1>
        </div>

        {/* <div id="blocks"></div> */}
      </main>
    </div>
  );
};

export default Builder;

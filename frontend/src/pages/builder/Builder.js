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
    // CUSTOM COMMANDS
    const CANVAS_SET_DEVICE = "canvas-set-device";
    const SET_DEVICE_DESKTOP = "set-device-desktop";
    const SET_DEVICE_TABLET = "set-device-tablet";
    const SET_DEVICE_MOBILE = "set-device-mobile";
    const MAKE_CANVAS_WIDTH_ADJUSTABLE = "make-canvas-width-adjustable";
    const RENDER_BLOCK_CATEGORY = "render-block-category";

    // Define block categories
    const blockCategories = [
      "Quick Add",
      "Header",
      "Footer",
      "Hero",
      "Call to Action",
      "Content",
      "Blog",
      "Gallery",
      "Contact",
      "Features",
      "Pricing",
      "Commerce",
      "Statistics",
      "Steps",
      "Team",
      "Testimonials",
    ];

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
                command: SET_DEVICE_DESKTOP,
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
                command: SET_DEVICE_TABLET,
                togglable: false,
                attributes: {
                  title: "Tablet (768px and below)",
                },
              },
              {
                id: "Mobile",
                el: "#device-mobile-container",
                className: "w-16",
                command: SET_DEVICE_MOBILE,
                togglable: false,
                attributes: {
                  title: "Mobile (320px and below)",
                },
              },
            ],
          },
          {
            id: "canvas-width-adjust-panel",
            el: "#canvas-width-adjust-container",
            buttons: [
              {
                id: "canvas-width-adjust-btn",
                el: "#canvas-width-adjuster-toggler",
                className: "w-8",
                command: MAKE_CANVAS_WIDTH_ADJUSTABLE,
                active: true,
                togglable: true,
                attributes: {
                  title: "Manually adjust canvas width",
                },
              },
            ],
          },
          {
            id: "block-category-selectors",
            el: "#blocks-categories-panel",
            // buttons:
            // [
            //   {
            //     id: "Quick Add",
            //     className: "w-full",
            //     label: "Quick Add",
            //     command: RENDER_BLOCK_CATEGORY,
            //     active: true,
            //     togglable: true,
            //     // attributes: {
            //     //   title: "Manually adjust canvas width",
            //     // },
            //   },
            // ],

            buttons: blockCategories.map((category, categoryIndex) => ({
              id: category,
              label: category,
              className:
                "w-full no-text-selection py-3 px-4 font-semibold text-blue-darker",
              command: RENDER_BLOCK_CATEGORY,
              active: true,
              togglable: false,
              // attributes: {
              //   title: "Manually adjust canvas width",
              // },
            })),
          },
        ],
      },
      blockManager: {
        // Specify the element to use as a container, string (query) or HTMLElement
        // With the empty value, nothing will be rendered
        appendTo: "#blocks-category-panel",

        // Append blocks to canvas on click.
        // With the `true` value, it will try to append the block to the selected component.
        // If there is no selected component, the block will be appened to the wrapper.
        // You can also pass a function to this option, use it as a catch-all for all block
        // clicks and implement a custom logic for each block.
        // appendOnClick: (block, editor) => {
        //   if (block.get('id') === 'some-id')
        //    editor.getSelected().append(block.get('content'))
        //   else
        //    editor.getWrapper().append(block.get('content'))
        // }
        appendOnClick: false,

        // Default blocks
        blocks: [
          {
            id: "text",
            label: "Text",
            category: {
              id: "Quick Add",
              label: "Quick Add",
              order: 0,
              open: true,
            },
            media: `<svg style="width:100%;height:100%" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
              </svg>`,
            activate: true,
            content: {
              type: "text",
              content: "Insert your text here",
              style: { padding: "10px" },
            },
          },
          {
            id: "link",
            label: "Link",
            category: {
              id: "Quick Add",
              label: "Quick Add",
              order: 0,
              open: true,
            },
            media: `<svg style="width:100%;height:100%" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
              </svg>`,
            activate: true,
            content: {
              type: "link",
              content: "Insert your link here",
              style: { color: "#d983a6" },
            },
          },
          {
            id: "image",
            label: "Image",
            category: {
              id: "Quick Add",
              label: "Quick Add",
              order: 0,
              open: true,
            },
            media: `<svg style="width:100%;height:100%" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
              </svg>`,
            activate: true,
            content: { type: "image" },
          },
          {
            label: "Map",
            category: {
              id: "Quick Add",
              label: "Quick Add",
              order: 0,
              open: true,
            },
            media: `<svg style="width:100%;height:90%" viewBox="0 0 576 512">
              <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path d="M384 476.1L192 421.2V35.93L384 90.79V476.1zM416 88.37L543.1 37.53C558.9 31.23 576 42.84 576 59.82V394.6C576 404.4 570 413.2 560.9 416.9L416 474.8V88.37zM15.09 95.13L160 37.17V423.6L32.91 474.5C17.15 480.8 0 469.2 0 452.2V117.4C0 107.6 5.975 98.78 15.09 95.13V95.13z"/>
              </svg>`,
            content: {
              type: "map",
              style: { height: "350px" },
            },
          },
        ],

        // Avoid rendering the default block manager.
        custom: false,
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

    // ----------------------------------------------------------
    // ADD COMMANDS
    // ----------------------------------------------------------

    editor.Commands.add(CANVAS_SET_DEVICE, {
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

    editor.Commands.add(SET_DEVICE_DESKTOP, {
      run: (editor) =>
        editor.runCommand(CANVAS_SET_DEVICE, { device: "Desktop" }),
    });

    editor.Commands.add(SET_DEVICE_TABLET, {
      run: (editor) =>
        editor.runCommand(CANVAS_SET_DEVICE, { device: "Tablet" }),
    });

    editor.Commands.add(SET_DEVICE_MOBILE, {
      run: (editor) => {
        editor.runCommand(CANVAS_SET_DEVICE, { device: "Mobile" });
      },
    });

    editor.Commands.add(MAKE_CANVAS_WIDTH_ADJUSTABLE, {
      run: addScrollEventToHandles,
      stop: removeScrollEventToHandles,
    });

    editor.Commands.add(RENDER_BLOCK_CATEGORY, {
      run: (editor, sender) => {
        // console.log("Sender: ", sender);
        const blocksToRender = editor.Blocks.getAll().models.filter(
          (model) => model.attributes.category.id == sender.id
        );

        // Change category blocks container title
        const categoryBlocksTitleEl = document.querySelector(
          "#blocks-category-panel-title"
        );
        categoryBlocksTitleEl.innerHTML = sender.attributes.label.includes(
          "Add"
        )
          ? sender.attributes.label
          : `Add ${sender.attributes.label}`;

        // Hide the active category blocks container
        const categories = document
          .querySelector("#blocks-category-panel")
          .querySelector(".gjs-block-categories").children;
        for (let i = 0; i < categories.length; i++) {
          if (categories[i] && categories[i].style.display === "block") {
            categories[i].style.display = "none";
          }
        }

        // Display the blocks container of the selected category
        const categoryContainers = document
          .querySelector("#blocks-category-panel")
          .querySelector(".gjs-block-categories").children[
          blocksToRender[0]?.attributes.category.attributes.order
        ];
        if (categoryContainers) categoryContainers.style.display = "block";
      },
      stop: () => {},
    });

    // ----------------------------------------------------------
    // ADD BLOCKS
    // ----------------------------------------------------------

    console.log("Editor canvas: ", editor.Canvas);

    setEditor(editor);
  }, []);

  return (
    <div className="overflow-hidden flex flex-col h-screen w-screenw max-w-full">
      <BuilderHeader fixed={false} iconOnly dropDown editor={editor} />
      <main className="flex flex-row relative h-full flex-1 w-full bg-gray-100">
        {/* Side Bar Container/BG */}
        <div className="w-16 h-full bg-white z-30">
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
              id="sidebar-pn-blocks"
              className="group bg-gray-100  hover:bg-gray-200 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-blue-dark">
                <div>{Icons.customIcons.builder.sideBar.blocks}</div>
              </div>
            </div>
            {/* Layers Button Container */}
            <div
              id="sidebar-pn-layers"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-10 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.layers}</div>
              </div>
            </div>
            {/* Style Button Container */}
            <div
              id="sidebar-pn-styles"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.styles}</div>
              </div>
            </div>
            {/* Component Settings Button Container */}
            <div
              id="sidebar-pn-traits"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.traits}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Side Bar Content Container */}
        <div className="flex flex-col shadow-2xl shadow-grey rounded-sm bg-white absolute left-20 top-[50%] translate-y-[-50%] z-10 h-[95%] max-h-[95%]">
          {/* Panel Heading Container */}
          <div className="flex justify-between border-b border-gray-400">
            {/* Panel Heading */}
            <h3 className="p-4 text-2xl text-grey no-text-selection font-extrabold pointer-events-none">
              {"Add Elements"}
            </h3>
            {/* Panel Actions Container */}
            <div className="flex items-center">
              <div
                title="Help Center > Add Elements"
                className="flex justify-center items-center text-lg w-16 h-full hover:bg-gray-200 cursor-pointer"
              >
                {Icons.question}
              </div>
              <div
                title="Close"
                className="flex justify-center items-center text-lg w-16 h-full hover:bg-gray-200 cursor-pointer"
              >
                {Icons.closeIcon}
              </div>
            </div>
          </div>
          {/* Panel Content */}
          <div className="flex w-full flex-auto h-0">
            {/* Blocks Categories Container */}
            <div
              id="blocks-categories-panel"
              className="flex flex-col min-w-fit h-full border-r border-gray-400"
            >
              {/* Category */}
              {/* <div className="py-3 px-4 font-semibold no-text-selection">
                {"QUICK ADD"}
              </div> */}
              {/* Category */}
              {/* <div className="py-3 px-4 font-semibold bg-blue-light text-blue-darker no-text-selection">
                {"TESTIMONIALS"}
              </div> */}
            </div>
            {/* Block Elements Here */}
            <div className=" w-[300px]">
              {/* Blocks Elements Header */}
              <h2
                id="blocks-category-panel-title"
                className="px-3 py-3 font-bold text-xl no-text-selection"
              >
                {"Add Testimonials"}
              </h2>
              {/* Block Elements Container */}
              <div
                id="blocks-category-panel"
                className="px-3 pb-3 no-text-selection"
              >
                {/* {"Blocks Elements Here"} */}
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

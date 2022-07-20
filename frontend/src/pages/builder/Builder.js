import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsDragCanvasWidth from "../../editor/plugins/drag-canvas-width";
import { blocks } from "../../editor/plugins/drag-canvas-width/blocks";
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
      blockManager: {
        /**
         * specify the element to use as a container, string (query) or
         * HTMLElement. With the empty value, nothing will be rendered
         */
        appendTo: "#blocks-category-panel",

        /**
         * append blocks to canvas on click.
         * With the `true` value, it will try to append the block to the
         * selected component. If there is no selected component, the block
         * will be appened to the wrapper. You can also pass a function to
         * this option, use it as a catch-all for all block clicks and
         * implement a custom logic for each block.
         * @example
         * appendOnClick: (block, editor) => {
         *   if (block.get('id') === 'some-id') {
         *     editor.getSelected().append(block.get('content'))
         *   } else {
         *     editor.getWrapper().append(block.get('content'))
         *   }
         * }
         */
        appendOnClick: false,

        // Avoid rendering the default block manager.
        custom: true,

        blocks: blocks,
      },
      panels: { defaults: [] },
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
      plugins: [gjsDragCanvasWidth],
      // pluginsOpts: [],
    });

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
            <div className="h-full flex-auto overflow-y-scroll custom-scrollbar scrollbar-rounded w-[300px]">
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

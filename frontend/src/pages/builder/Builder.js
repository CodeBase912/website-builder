import React, { useState, useEffect, useContext } from "react";
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
import SideBarContent from "./SideBarContent";

const Builder = () => {
  const defaultDeviceWidth = "1200";
  const [editor, setEditor] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(defaultDeviceWidth);
  const [sideBarExpanded, setSideBarExpanded] = useState(false);
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

  const handleSideBarClick = (elmentId) => {
    const activeElm = document.querySelector(".icon--active");
    const selectedElm = document.querySelector(`#${elmentId}`);

    if (selectedElm.id !== activeElm?.id) {
      activeElm?.classList.toggle("icon--active");
      selectedElm.querySelector(".icon").classList.toggle("icon--active");
    } else {
      selectedElm.querySelector(".icon").classList.toggle("icon--active");
    }
    setSideBarExpanded((state) => !state);
  };

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
              className="group sidebar-btn"
              onClick={() => handleSideBarClick("sidebar-pn-pages")}
            >
              <div className="icon">
                <div>{Icons.customIcons.builder.sideBar.pages}</div>
              </div>
            </div>
            {/* Blocks Button Container */}
            <div
              id="sidebar-pn-blocks"
              className="group sidebar-btn"
              onClick={() => handleSideBarClick("sidebar-pn-blocks")}
            >
              <div className="icon">
                <div>{Icons.customIcons.builder.sideBar.blocks}</div>
              </div>
            </div>
            {/* Layers Button Container */}
            <div
              id="sidebar-pn-layers"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
              onClick={() => handleSideBarClick("sidebar-pn-layers")}
            >
              <div className="flex items-center justify-center object-contain w-10 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.layers}</div>
              </div>
            </div>
            {/* Style Button Container */}
            <div
              id="sidebar-pn-styles"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
              onClick={() => handleSideBarClick("sidebar-pn-styles")}
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.styles}</div>
              </div>
            </div>
            {/* Component Settings Button Container */}
            <div
              id="sidebar-pn-traits"
              className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
              onClick={() => handleSideBarClick("sidebar-pn-traits")}
            >
              <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
                <div>{Icons.customIcons.builder.sideBar.traits}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar content */}
        <SideBarContent
          editor={editor}
          sideBarExpanded={sideBarExpanded}
          setSideBarExpanded={setSideBarExpanded}
        />

        {/* Canvas Container */}
        <div id="gjs" className="w-full h-screenh relative">
          <h1>Hello World Component!</h1>
        </div>
      </main>
    </div>
  );
};

export default Builder;

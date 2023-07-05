import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsDragCanvasWidth from "../../editor/plugins/drag-canvas-width";
import { blocks } from "../../editor/plugins/drag-canvas-width/blocks";
import { DISABLE_CANVAS_TEXT_HIGHLIGHTING } from "../../editor/plugins/drag-canvas-width/commands";
// Import Editor Stylesheet
import "./editor-styles.css";
// Import Custom React Components
import BuilderHeader from "./BuilderHeader";
import SideBar from "./sidebar";

const Builder = () => {
  const [editor, setEditor] = useState(null);
  const [sideBarExpanded, setSideBarExpanded] = useState(false);

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

    // Running some initial commands
    editor.Commands.run(DISABLE_CANVAS_TEXT_HIGHLIGHTING);

    setEditor(editor);
  }, []);

  return (
    <div className="overflow-hidden flex flex-col h-screen w-screenw max-w-full">
      <BuilderHeader fixed={false} iconOnly dropDown editor={editor} />
      <main className="flex flex-row relative h-full flex-1 w-full bg-gray-100">
        <SideBar
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

import {
  SET_DEVICE_DESKTOP,
  SET_DEVICE_TABLET,
  SET_DEVICE_MOBILE,
  MAKE_CANVAS_WIDTH_ADJUSTABLE,
  RENDER_BLOCK_CATEGORY,
} from "./commands";
import { blockCategories } from "./blocks";

export default (editor, opts) => {
  const pm = editor.Panels;

  console.log("Panels: ", pm.getPanels());

  console.log("editor block categories: ", editor.Blocks.getCategories());

  // pm.removePanel("devices-c");

  // Add toggle-actions panel
  pm.addPanel({
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
  });

  // Add device-actions panel
  pm.addPanel({
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
  });

  // Add canvas-width-adjust-panel
  pm.addPanel({
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
  });

  // Category blocks panel
  pm.addPanel([
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
  ]);

  editor.on("load", () => {
    console.log("Plugin connected");
  });
};

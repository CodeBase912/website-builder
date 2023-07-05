import {
  addScrollEventToHandles,
  findActiveDevice,
  removeScrollEventToHandles,
} from "./utils";

// CUSTOM COMMANDS
export const CANVAS_SET_DEVICE = "canvas-set-device";
export const SET_DEVICE_DESKTOP = "set-device-desktop";
export const SET_DEVICE_TABLET = "set-device-tablet";
export const SET_DEVICE_MOBILE = "set-device-mobile";
export const MAKE_CANVAS_WIDTH_ADJUSTABLE = "make-canvas-width-adjustable";
export const RENDER_BLOCK_CATEGORY = "render-block-category";
export const DISABLE_CANVAS_TEXT_HIGHLIGHTING =
  "disable-canvas-text-highlighting";

const loadCommands = (editor, opts) => {
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

  editor.Commands.add(DISABLE_CANVAS_TEXT_HIGHLIGHTING, {
    run: (editor) => {
      // Disable text highlighting on "gjs-cv-canvas__frames" element
      document.querySelector(".gjs-cv-canvas__frames").style.userSelect =
        "none";
    },
    stop: (editor) => {
      // Disable text highlighting on "gjs-cv-canvas__frames" element
      document.querySelector(".gjs-cv-canvas__frames").style.userSelect =
        "auto";
    },
  });

  editor.Commands.add(SET_DEVICE_TABLET, {
    run: (editor) => editor.runCommand(CANVAS_SET_DEVICE, { device: "Tablet" }),
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
        (model) => model.attributes.category.id === sender.id
      );

      // Change category blocks container title
      const categoryBlocksTitleEl = document.querySelector(
        "#blocks-category-panel-title"
      );
      categoryBlocksTitleEl.innerHTML = sender.attributes.label.includes("Add")
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
};

export default loadCommands;

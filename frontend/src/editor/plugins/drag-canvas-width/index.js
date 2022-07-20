import grapesjs from "grapesjs";
import loadDevices from "./devices";
import loadCommands from "./commands";
import loadBlocks from "./blocks";
import loadComponents from "./components";
import loadPanels from "./panels";

export default grapesjs.plugins.add(
  "gjs-drag-canvas-width",
  (editor, opts = {}) => {
    loadDevices(editor, opts);
    loadPanels(editor, opts);
    loadBlocks(editor, opts);
    loadComponents(editor, opts);
    loadCommands(editor, opts);
  }
);

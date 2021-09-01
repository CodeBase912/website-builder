import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
// import pluginProductList from "./plugins/ProductList";
// import pluginSlider from "./plugins/Slider";
// import pluginRepeater from "./plugins/Repeater";
// import pluginAuthor from "./plugins/Author";
// import pluginForm from "./plugins/Form";
// import pluginStickyBar from "./plugins/StickyBar";
// import pluginCProductList from "./plugins/CProductList";
// import pluginCollectionList from "./plugins/CollectionList";
// import pluginGrid from "./plugins/Grid";
// import pluginDropdown from "./plugins/Dropdown";
// import loadEditorEvents from "./events";
// import loadCommands from "./commands";
// import loadPanels from "./panels";
// import loadEventsManager from "./plugins/EventsManager";

import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";

function Builder() {
  const id = "editor";
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editor) {
      let e = grapesjs.init({
        container: `#${id}`,
        avoidInlineStyle: 1,
        fromElement: true,
        showOffsets: 1,
        styleManager: { clearProperties: 1 },
        modal: {
          backdrop: false,
        },
        storageManager: {
          autoSave: 0,
        },
        // plugins: [
        //   "gjs-preset-webpage",
        //   // gjsPresetWebpage,
        //   // pluginProductList,
        //   // pluginSlider,
        //   // pluginRepeater,
        //   // pluginAuthor,
        //   // pluginForm,
        //   // pluginStickyBar,
        //   // pluginCProductList,
        //   // pluginGrid,
        //   // pluginCollectionList,
        //   // pluginDropdown,
        //   // loadEventsManager,
        // ],
        // pluginsOpts: {
        //   "gjs-preset-webpage": {
        //     textLayout: "Hello world",
        //   },
        // },
        canvas: {
          // styles: [
          //   "https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css",
          //   "https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/css/bootstrap.min.css",
          //   "https://fonts.googleapis.com/css?family=Roboto&display=swap",
          //   "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
          // ],
          scripts: [
            "//code.jquery.com/jquery-1.11.0.min.js",
            "//code.jquery.com/jquery-migrate-1.2.1.min.js",
            "//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
          ],
        },
        deviceManager: {
          devices: [
            {
              id: "desktop",
              name: "Desktop",
              width: "",
            },
            {
              id: "tablet",
              name: "Tablet",
              width: "768px",
              widthMedia: "992px",
            },
            {
              id: "mobileLandscape",
              name: "Mobile landscape",
              width: "568px",
              widthMedia: "768px",
            },
            {
              id: "mobilePortrait",
              name: "Mobile portrait",
              width: "375px",
              widthMedia: "480px",
            },
          ],
        },
      });
      // loadEditorEvents(e);
      // loadPanels(e);
      // loadCommands(e);
      // setEditor(e);
      // e.setDevice("Desktop");
    } else {
      if (document) {
        document.getElementById(id).append(editor.render());
      }
    }

    return function cleanup() {
      if (editor) {
        editor.destroy();
        grapesjs.editors = grapesjs.editors.filter((e) => e !== editor);
      }
    };
  }, []);

  return (
    <div id={id}>
      <h1>Hey there</h1>
    </div>
  );
}

export default Builder;

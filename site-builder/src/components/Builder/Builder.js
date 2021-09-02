import React, { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
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

import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';

const id = 'editor';
function Builder() {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editor) {
      let e = grapesjs.init({
        container: `#${id}`,
        avoidInlineStyle: 1,
        fromElement: true,
        // Size of the editor
        height: 'calc(100vh - 57px)',
        width: '100vw',
        marginTop: '57px',
        showOffsets: 1,
        styleManager: {
          clearProperties: 1,
          sectors: [
            // {
            //   name: 'Dimension',
            //   buildProps: ['width', 'min-height'],
            // },
            {
              name: 'Background',
              buildProps: [
                'background-color',
                'box-shadow',
                'background-image',
                'background-repeat',
                'background-position',
                'background-attachment',
                'background-size',
              ],
            },
            {
              name: 'Flexbox',
              buildProps: [
                'display',
                'flex-direction',
                'flex-wrap',
                'justify-content',
                'align-items',
                'align-content',
                'order',
                'flex-basis',
                'flex-grow',
                'flex-shrink',
                'align-self',
                'overflow',
                'overflow-x',
                'overflow-y',
              ],
            },
          ],
        },
        modal: {
          backdrop: false,
        },
        storageManager: {
          autoSave: 0,
        },
        plugins: [
          'gjs-preset-webpage',
          // gjsPresetWebpage,
          // pluginProductList,
          // pluginSlider,
          // pluginRepeater,
          // pluginAuthor,
          // pluginForm,
          // pluginStickyBar,
          // pluginCProductList,
          // pluginGrid,
          // pluginCollectionList,
          // pluginDropdown,
          // loadEventsManager,
        ],
        canvas: {
          // styles: [
          //   "https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css",
          //   "https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/css/bootstrap.min.css",
          //   "https://fonts.googleapis.com/css?family=Roboto&display=swap",
          //   "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
          // ],
          scripts: [
            '//code.jquery.com/jquery-1.11.0.min.js',
            '//code.jquery.com/jquery-migrate-1.2.1.min.js',
            '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
          ],
        },
        deviceManager: {
          devices: [
            {
              id: 'desktop',
              name: 'Desktop',
              width: '',
            },
            {
              id: 'tablet',
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              id: 'mobileLandscape',
              name: 'Mobile landscape',
              width: '568px',
              widthMedia: '768px',
            },
            {
              id: 'mobilePortrait',
              name: 'Mobile portrait',
              width: '375px',
              widthMedia: '480px',
            },
          ],
        },
      });
      // loadEditorEvents(e);
      // loadPanels(e);
      // loadCommands(e);
      // setEditor(e);
      // e.setDevice("Desktop");
      e.addStyle('.gjs-one-bg{background-color: rgb(49, 46, 43)}');

      document.getElementById('editor').style =
        'width: 100vw; height: calc(100vh - 57px); margin-top: 57px;';

      // // Set background color of the top panel
      for (let i = 0; i <= 4; i++) {
        document.getElementsByClassName('gjs-one-bg')[i].style =
          'background-color: rgb(247, 247, 247); border: none;';
      }

      console.log(e.storeData());
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

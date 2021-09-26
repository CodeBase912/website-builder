import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-blocks-basic';
// Import Heroicons
import {
  DesktopComputerIcon,
  DeviceTabletIcon,
  DeviceMobileIcon,
} from '@heroicons/react/outline';

function Editor() {
  useEffect(() => {
    let e = grapesjs.init({
      container: `#editor`,
      fromElement: true,
      // Size of the editor
      height: '100%',
      width: 'auto',
      storageManager: false,
      plugins: ['gjs-blocks-basic'],
      pluginsOpts: {
        'gjs-blocks-basic': {},
      },
      blockManager: {
        appendTo: '#block',
      },
      layerManager: {
        appendTo: '#layers',
      },
      styleManager: {
        appendTo: '#style',
        sectors: [
          {
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: 'integer',
                name: 'The width', // Label for the property
                property: 'width', // CSS property (if buildProps contains it will be extended)
                units: ['px', '%'], // Units, available only for 'integer' types
                defaults: 'auto', // Default value
                min: 0, // Min value, available only for 'integer' types
              },
            ],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: [
              {
                id: 'custom-prop',
                name: 'Custom Label',
                property: 'font-size',
                type: 'select',
                defaults: '32px',
                // List of options, available only for 'select' and 'radio'  types
                options: [
                  { value: '12px', name: 'Tiny' },
                  { value: '18px', name: 'Medium' },
                  { value: '32px', name: 'Big' },
                ],
              },
            ],
          },
        ],
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '',
          },
          {
            name: 'Tablet',
            width: '768px',
          },
          {
            name: 'Mobile',
            width: '320px',
          },
        ],
      },
      panels: {
        defaults: [
          {
            id: 'basic-actions',
            el: '.header__panel-visibility',
            buttons: [
              {
                id: 'visibility',
                active: true, //active by default
                className: 'bg-transparent ml-[5px]',
                label: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                </svg>`, // This is where you include the icon
                command: 'sw-visibility',
                togglable: true,
              },
            ],
          },
          {
            id: 'panel-device',
            el: '.header__panel-devices',
            buttons: [
              {
                id: 'device-desktop',
                className: 'device-icons text-gray-400 ml-[5px]',
                label: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
                </svg>`, // This is where the icon goes
                command: 'set-device-desktop',
                active: true,
                togglable: true,
              },
              {
                id: 'device-tablet',
                className: 'device-icons text-gray-400',
                label: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>`, // This is where the icon goes
                command: 'set-device-tablet',
                // active: false,
                togglable: true,
              },
              {
                id: 'device-mobile',
                className: 'device-icons text-gray-400',
                label: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>`, // This is where the icon goes
                command: 'set-device-mobile',
                // active: false,
                togglable: true,
              },
            ],
          },
        ],
      },
    });
    e.runCommand('sw-visibility');
    const panelManager = e.Panels;
    e.Commands.add('set-device-desktop', {
      run: function (editor, sender) {
        editor.setDevice('Desktop');
      },
    });
    e.Commands.add('set-device-tablet', {
      run: function (editor, sender) {
        editor.setDevice('Tablet');
      },
    });
    e.Commands.add('set-device-mobile', {
      run: function (editor, sender) {
        editor.setDevice('Mobile');
      },
    });

    e.Modal.open({
      title:
        '<div className="flex justify-start items-center"><h2>Add Page</h2></div>',
      content: `
        <div class="w-full">
            <input type="text" placeholder="Enter Page Name" id="addPageInput" class="w-full outline-none bg-gray-300 border-2 border-gray-700 rounded-md px-2 py-1 text-black placeholder-gray-500" />
            <button onClick="handleClick()" class="bg-[#312E2B] active:bg-[#252423] text-white px-6 py-1 rounded-md mt-2 float-right">Add</button>
        </div>
      `,
      attributes: { class: 'my-class' },
    });

    const deviceIcons = document.querySelectorAll('.device-icons');

    Array.from(deviceIcons).map((icon) => {
      icon.addEventListener('click', (event) => {
        Array.from(deviceIcons).map((activeIcon) => {
          if (Array.from(activeIcon.classList).includes('text-[#00ffff]')) {
            activeIcon.classList.remove('text-[#00ffff]');
          }
        });

        icon.classList.add('text-[#00ffff]');
        console.log(icon);
      });
    });
    return () => {
      Array.from(deviceIcons).map((icon) => {
        icon.removeEventListener('click', (event) => {
          Array.from(deviceIcons).map((activeIcon) => {
            if (Array.from(activeIcon.classList).includes('text-[#00ffff]')) {
              activeIcon.classList.remove('text-[#00ffff]');
            }
          });

          icon.classList.add('text-[#00ffff]');
          console.log(icon);
        });
      });
    };
  }, []);
  return <div id='editor'></div>;
}

export default Editor;

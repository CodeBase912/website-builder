import React, { useState, useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-blocks-basic';
import {
  ChevronDownIcon,
  PencilIcon,
  XIcon,
  ViewGridIcon,
  DuplicateIcon,
  CogIcon,
  SparklesIcon,
} from '@heroicons/react/solid';
import { DocumentAddIcon } from '@heroicons/react/outline';
import Header from '../Header/Header';

function Builder() {
  const [editor, setEditor] = useState(null);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [activePanel, setActivePanel] = useState('block');

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
      // pageManager: {
      //   appendTo: '#pages',
      //   current: 1,
      //   pages: [
      //     { components: [], style: [] },
      //     { components: [], style: [] },
      //   ],
      // },
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
            <input type="text" placeholder="Enter Page Name" id="add-page-input" class="w-full outline-none bg-gray-300 border-2 border-gray-700 rounded-md px-2 py-1 text-black placeholder-gray-500" />
            <button id="add-page-btn" class="bg-[#312E2B] active:bg-[#252423] text-white px-6 py-1 rounded-md mt-2 float-right">Add</button>
        </div>
      `,
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

    const addPageInput = document.querySelector('#add-page-input');
    const addPageBtn = document.querySelector('#add-page-btn');
    const openAddPageModalBtn = document.querySelector('#open-add-page-modal');

    e.Pages.getMain().id = 'Home';
    addPageBtn.addEventListener('click', () => {
      e.Pages.remove(e.Pages.getMain());
      e.Pages.add({
        id: addPageInput.value, // without an explicit ID, a random one will be created
        styles: `.my-class { font-size: 40px; font-weight: bold; padding: 10px 10px }`,
        component: `<div class="my-class">${addPageInput.value} page</div>`, // or a JSON of components
      });
      e.Pages.select(addPageInput.value);
      e.Modal.close();
      setNumberOfPages(e.Pages.getAll().length);
      console.log(e.Pages.getAll().length);
    });

    openAddPageModalBtn.addEventListener('click', () => {
      e.Modal.open({
        title:
          '<div className="flex justify-start items-center"><h2>Add Page</h2></div>',
        content: `
        <div class="w-full">
            <input type="text" placeholder="Enter Page Name" id="add-page-input" class="w-full outline-none bg-gray-300 border-2 border-gray-700 rounded-md px-2 py-1 text-black placeholder-gray-500" />
            <button id="add-page-btn" class="bg-[#312E2B] active:bg-[#252423] text-white px-6 py-1 rounded-md mt-2 float-right">Add</button>
        </div>
      `,
      });
      const addPageInput = document.querySelector('#add-page-input');
      const addPageBtn = document.querySelector('#add-page-btn');

      addPageBtn.addEventListener('click', () => {
        e.Pages.add({
          id: addPageInput.value, // without an explicit ID, a random one will be created
          styles: `.my-class { font-size: 40px; font-weight: bold; padding: 10px 10px }`,
          component: `<div class="my-class">${addPageInput.value} page</div>`, // or a JSON of components
        });
        e.Pages.select(addPageInput.value);
        e.Modal.close();
        setNumberOfPages(e.Pages.getAll().length);
        console.log(e.Pages.getAll().length);
      });
    });

    setEditor(e);
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

      addPageBtn.removeEventListener('click', () => {
        e.Pages.add({
          id: addPageInput.value, // without an explicit ID, a random one will be created
          styles: `.my-class { font-size: 40px; font-weight: bold; padding: 10px 10px }`,
          component: `<div class="my-class">${addPageInput.value} page</div>`, // or a JSON of components
        });
        e.Pages.select(addPageInput.value);
        e.Modal.close();
        console.log(e.Pages.getAll);
      });
    };
  }, []);

  useEffect(() => {
    const pages = document.querySelectorAll('.page');
    const listItems = document.querySelectorAll('.web-x-list-items');

    Array.from(listItems).forEach((item, index) => {
      item.addEventListener('click', () => {
        const panelId = Array.from(listItems)
          [index].children[0].getAttribute('id')
          .split('-')[0];
        setActivePanel(panelId);
      });
    });

    pages.forEach((page) => {
      page.addEventListener('mouseenter', () => {
        page.querySelector('.close-icon').classList.remove('hidden');
      });
      page.addEventListener('mouseleave', () => {
        page.querySelector('.close-icon').classList.add('hidden');
      });
    });

    return () => {
      pages.forEach((page) => {
        page.removeEventListener('mouseenter', () => {
          page.querySelector('.close-icon').classList.remove('hidden');
        });
        page.removeEventListener('mouseleave', () => {
          page.querySelector('.close-icon').classList.add('hidden');
        });
      });

      Array.from(listItems).forEach((item, index) => {
        item.removeEventListener('click', () => {
          const panelId = Array.from(listItems)
            [index].children[0].getAttribute('id')
            .split('-')[0];
          setActivePanel(panelId);
        });
      });
    };
  }, []);

  useEffect(() => {
    const addPageInput = document.querySelector('#add-page-input');
    const addPageBtn = document.querySelector('#add-page-btn');

    addPageBtn.addEventListener('click', () => {
      console.log(addPageInput.value);
      // console.log(editor.Pages);
      // console.log(editor.Commands.getAll());
      // editor.Pages.getAll();
      // console.log(
      //   editor.Pages.add({
      //     id: 'new-page-id', // without an explicit ID, a random one will be created
      //     styles: `.my-class { color: red }`, // or a JSON of styles
      //     component: '<div class="my-class">My element</div>', // or a JSON of components
      //   })
      // );
    });
    return () => {
      // cleanup
    };
  }, [editor]);

  // console.log(editor.Pages);

  function togglePageContainer() {
    const pagesContainer = document.querySelector('.pages-container');
    const pagesContainerToggler = document.querySelector(
      '.pages-container-toggler'
    );
    const pagesChevronIcon = document.querySelector('.pages-chevron-icon');

    if (pagesOpen) {
      pagesContainer.classList.add('h-[50px]');
      pagesContainer.classList.remove('h-[fit-content]');
      pagesChevronIcon.classList.add('-rotate-90');
      setPagesOpen(false);
    } else {
      pagesContainer.classList.remove('h-[50px]');
      pagesContainer.classList.add('h-[fit-content]');
      pagesChevronIcon.classList.remove('-rotate-90');
      setPagesOpen(true);
    }
  }

  return (
    <div>
      <Header props={{ builder: true }} />
      <div className='flex h-screen pt-16'>
        {/* Side bar */}
        <div className='bg-gray-200 h-full w-60 min-w-60 border-gray-400 overflow-y-scroll no-scrollbar'>
          <div className='pages-container border-b border-gray-400 items-center px-4 py-2  overflow-hidden h-[50px] transition-h duration-1000 ease-in-out'>
            <div
              className='pages-container-toggler flex justify-between  cursor-pointer'
              onClick={() => {
                togglePageContainer();
              }}
            >
              <p className='flex items-center font-semibold'>Pages</p>
              <ChevronDownIcon className='pages-chevron-icon w-8 -rotate-90' />
            </div>
            <button
              id='open-add-page-modal'
              className='flex justify-center items-center w-full  mt-3 border-2 outline:none border-gray-500 hover:border-gray-800 text-gray-500 hover:text-gray-800 font-semibold p-1 rounded-md cursor-pointer'
            >
              <DocumentAddIcon className='w-6 h-6 mr-2' />
              Add Page
            </button>
            <div id='pages'>
              <Pages
                editor={editor}
                setEditor={setEditor}
                setNumberOfPages={setNumberOfPages}
              />
            </div>
          </div>
          <div>
            <ul
              className='flex px-3 py-2 text-gray-500 justify-between'
              role='tablist'
            >
              <li
                className={
                  activePanel === 'block'
                    ? 'web-x-list-items flex items-center text-black'
                    : 'web-x-list-items flex items-center'
                }
                role='presentation'
              >
                <button
                  id='block-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#block'
                  aria-selected='true'
                  aria-controls='block'
                >
                  <ViewGridIcon
                    className={
                      activePanel === 'block'
                        ? 'w-8'
                        : 'w-8 hover:text-[#009e9e]'
                    }
                  />
                </button>
              </li>
              <li
                className={
                  activePanel === 'layers'
                    ? 'web-x-list-items flex items-center text-black'
                    : 'web-x-list-items flex items-center'
                }
                role='presentation'
              >
                <button
                  id='layers-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#layers'
                  aria-selected='true'
                  aria-controls='layers'
                >
                  <DuplicateIcon
                    className={
                      activePanel === 'layers'
                        ? 'w-8'
                        : 'w-8 hover:text-[#009e9e]'
                    }
                  />
                </button>
              </li>
              <li
                className={
                  activePanel === 'style'
                    ? 'web-x-list-items flex items-center text-black'
                    : 'web-x-list-items flex items-center'
                }
                role='presentation'
              >
                <button
                  id='style-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#style'
                  aria-selected='true'
                  aria-controls='style'
                >
                  <SparklesIcon
                    className={
                      activePanel === 'style'
                        ? 'w-8'
                        : 'w-8 hover:text-[#009e9e]'
                    }
                  />
                </button>
              </li>
              <li
                className={
                  activePanel === 'trait'
                    ? 'web-x-list-items flex items-center text-black'
                    : 'web-x-list-items flex items-center'
                }
                role='presentation'
              >
                <button
                  id='trait-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#trait'
                  aria-selected='true'
                  aria-controls='trait'
                >
                  <CogIcon
                    className={
                      activePanel === 'trait'
                        ? 'w-8'
                        : 'w-8 hover:text-[#009e9e]'
                    }
                  />
                </button>
              </li>
            </ul>
            <div className='tab-content'>
              <div
                className={activePanel === 'block' ? '' : 'hidden'}
                id='block'
                role='tabpanel'
                aria-labelledby='block-tab'
              >
                Blocks
              </div>
              <div
                className={activePanel === 'layers' ? '' : 'hidden'}
                id='layers'
                role='tabpanel'
                aria-labelledby='layers-tab'
              >
                Layers
              </div>
              <div
                className={activePanel === 'style' ? '' : 'hidden'}
                id='style'
                role='tabpanel'
                aria-labelledby='style-tab'
              >
                Style
              </div>
              <div
                className={activePanel === 'trait' ? '' : 'hidden'}
                id='trait'
                role='tabpanel'
                aria-labelledby='trait-tab'
              >
                Trait
              </div>
            </div>
          </div>
        </div>
        <main className='bg-red-200 flex-1'>
          {/* Top Panel */}
          {/* <div className='h-[50px] flex items-center w-full bg-gray-200 px-4'>
          top panel
        </div> */}

          {/* Main page content */}
          <div id='editor'></div>
        </main>
      </div>
    </div>
  );
}

function Pages(props) {
  const setEditor = props.setEditor;
  const setNumberOfPages = props.setNumberOfPages;
  const [pagesEditor, setPagesEditor] = useState(props.editor);

  useEffect(() => {
    setPagesEditor(props.editor);
    const pages = document.querySelectorAll('.page');

    // Add a hover effect on the delete page icons
    pages.forEach((page) => {
      page.addEventListener('mouseenter', () => {
        page.querySelector('.close-icon').classList.remove('hidden');
      });
      page.addEventListener('mouseleave', () => {
        page.querySelector('.close-icon').classList.add('hidden');
      });
    });

    return () => {
      pages.forEach((page) => {
        page.removeEventListener('mouseenter', () => {
          page.querySelector('.close-icon').classList.remove('hidden');
        });
        page.removeEventListener('mouseleave', () => {
          page.querySelector('.close-icon').classList.add('hidden');
        });
      });
    };
  });

  useEffect(() => {
    if (pagesEditor) {
      // Add a click event on the delete page icons
      Array.from(pagesEditor.Pages.getAll()).map((page) => {
        const pageSelector = document.querySelector(`#page-${page.cid}`);
        const icon = document.querySelector(`#${page.cid}`);

        pageSelector.addEventListener('click', (event) => {
          if (event.target.classList[0] != 'close-icon') {
            pagesEditor.Pages.select(page.id);
            console.log('SELECTED DEVICE');
            console.log(pagesEditor.Devices.getSelected());
          }
        });

        icon.addEventListener('click', () => {
          pagesEditor.Pages.remove(page.id);
          pagesEditor.Pages.select(pagesEditor.Pages.getMain());
          setNumberOfPages(pagesEditor.Pages.getAll().length);
        });
      });
      return () => {
        // cleanup
      };
    }
  });

  if (pagesEditor) {
    const output = Array.from(pagesEditor.Pages.getAll()).map((page) => {
      return (
        <div
          id={'page-' + page.cid}
          key={page.cid}
          className='page flex justify-between mt-3 font-semibold text-gray-700 hover:text-black cursor-pointer'
        >
          {page.id}
          <div className='items-wrapper flex justify-between items-center'>
            {/* <PencilIcon className='w-5' /> */}
            <XIcon id={page.cid} className='close-icon hidden w-6' />
          </div>
        </div>
      );
    });

    return output;
  } else {
    return '';
  }
}

export default Builder;

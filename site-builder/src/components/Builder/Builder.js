import React, { useState, useEffect } from 'react';
import Editor from '../Editor/Editor';
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

function Builder() {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('block');
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
    <div className='flex h-screen pt-16'>
      {/* Side bar */}
      <div className='bg-gray-200 h-screen w-60 min-w-60  border-gray-400'>
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
          <button className='flex justify-center items-center w-full  mt-3 border-2 outline:none border-gray-500 hover:border-gray-800 text-gray-500 hover:text-gray-800 font-semibold p-1 rounded-md cursor-pointer'>
            <DocumentAddIcon className='w-6 h-6 mr-2' />
            Add Page
          </button>
          <div id='pages'>
            <div className='page flex justify-between mt-3 font-semibold text-gray-700 hover:text-black cursor-pointer'>
              Home
              <div className='items-wrapper flex justify-between items-center'>
                {/* <PencilIcon className='w-5' /> */}
                <XIcon className='close-icon hidden w-6' />
              </div>
            </div>
            <div className='page flex justify-between mt-3 font-semibold text-gray-700 hover:text-black cursor-pointer'>
              About Us
              <div className='items-wrapper flex justify-between items-center'>
                {/* <PencilIcon className='w-5' /> */}
                <XIcon className='close-icon hidden w-6' />
              </div>
            </div>
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
                    activePanel === 'block' ? 'w-8' : 'w-8 hover:text-[#009e9e]'
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
                    activePanel === 'style' ? 'w-8' : 'w-8 hover:text-[#009e9e]'
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
                    activePanel === 'trait' ? 'w-8' : 'w-8 hover:text-[#009e9e]'
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
        <Editor />
      </main>
    </div>
  );
}

export default Builder;

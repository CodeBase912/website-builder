import React from 'react';
// Import icons
import userIcon from '../../images/icons/profile-user.png';
import { ChevronDownIcon } from '@heroicons/react/solid';
import './Header.css';

function Header(props) {
  const { builder } = props.props;

  console.log(builder);

  if (builder) {
    return (
      <div className='header'>
        <div className='logo-wrapper flex'>
          <p className='flex items-center py-[10px] pl-[15px] hover:bg-[#252423] cursor-pointer'>
            <span className='mr-1' id='logo'>
              X
            </span>
            <ChevronDownIcon className='w-6 text-gray-400 mr-2' />
          </p>

          <div className='header__panel flex items-center'>
            <div className='header__panel-visibility h-full flex items-center hover:bg-[#252423] border-r border-gray-600 bg-transparent px-[6px]'></div>
            <div className='header__panel-devices h-full flex items-center border-r hover:bg-[#252423] border-gray-600 bg-transparent p-[0px]'></div>
          </div>
        </div>
        <div className='nav-wrapper flex items-center pr-[15px]'>
          <div className='user-icon-wrapper'>
            <img src={userIcon} alt='User icon' className='user-icon' />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='header'>
        <div className='logo-wrapper'>
          <p>
            <span>Web</span>
            <span id='logo'>X</span>
          </p>
        </div>
        <div className='nav-wrapper'>
          <div className='user-icon-wrapper'>
            <img src={userIcon} alt='User icon' className='user-icon' />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

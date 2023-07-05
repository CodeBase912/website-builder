import React from "react";
import { Icons } from "../../../components/common/icons/icons";

const IconSidebar = ({ setSideBarExpanded }) => {
  const handleSideBarClick = (elmentId) => {
    const activeElm = document.querySelector(".icon--active");
    const selectedElm = document.querySelector(`#${elmentId}`);

    if (selectedElm.id !== activeElm?.id) {
      activeElm?.classList.toggle("icon--active");
      selectedElm.querySelector(".icon").classList.toggle("icon--active");
    } else {
      selectedElm.querySelector(".icon").classList.toggle("icon--active");
    }
    setSideBarExpanded((state) => !state);
  };

  return (
    <div className="w-16 h-full bg-white z-30">
      {/* Side Bar Panel */}
      <div id="sidebar-panel flex flex-col h-full">
        {/* Pages Button Container */}
        <div
          id="sidebar-pn-pages"
          className="group sidebar-btn"
          onClick={() => handleSideBarClick("sidebar-pn-pages")}
        >
          <div className="icon">
            <div>{Icons.customIcons.builder.sideBar.pages}</div>
          </div>
        </div>
        {/* Blocks Button Container */}
        <div
          id="sidebar-pn-blocks"
          className="group sidebar-btn"
          onClick={() => handleSideBarClick("sidebar-pn-blocks")}
        >
          <div className="icon">
            <div>{Icons.customIcons.builder.sideBar.blocks}</div>
          </div>
        </div>
        {/* Layers Button Container */}
        <div
          id="sidebar-pn-layers"
          className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
          onClick={() => handleSideBarClick("sidebar-pn-layers")}
        >
          <div className="flex items-center justify-center object-contain w-10 h-full fill-grey">
            <div>{Icons.customIcons.builder.sideBar.layers}</div>
          </div>
        </div>
        {/* Style Button Container */}
        <div
          id="sidebar-pn-styles"
          className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
          onClick={() => handleSideBarClick("sidebar-pn-styles")}
        >
          <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
            <div>{Icons.customIcons.builder.sideBar.styles}</div>
          </div>
        </div>
        {/* Component Settings Button Container */}
        <div
          id="sidebar-pn-traits"
          className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
          onClick={() => handleSideBarClick("sidebar-pn-traits")}
        >
          <div className="flex items-center justify-center object-contain w-8 h-full fill-grey">
            <div>{Icons.customIcons.builder.sideBar.traits}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSidebar;

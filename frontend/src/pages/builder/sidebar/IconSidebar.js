import React from "react";
import { Icons } from "../../../components/common/icons/icons";
import IconButton from "../../../components/common/IconButton";

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
        <IconButton
          icon={Icons.customIcons.builder.sideBar.pages}
          id="sidebar-pn-pages"
          className="group sidebar-btn"
          iconClassName="icon"
          onClick={() => handleSideBarClick("sidebar-pn-pages")}
          title="Pages"
        />

        {/* Blocks Button Container */}
        <IconButton
          icon={Icons.customIcons.builder.sideBar.blocks}
          id="sidebar-pn-blocks"
          className="group sidebar-btn"
          iconClassName="icon"
          onClick={() => handleSideBarClick("sidebar-pn-blocks")}
          title="Blocks"
        />

        {/* Layers Button Container */}
        <IconButton
          icon={Icons.customIcons.builder.sideBar.layers}
          id="sidebar-pn-layers"
          className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
          iconClassName="flex items-center justify-center object-contain w-10 h-full fill-grey"
          onClick={() => handleSideBarClick("sidebar-pn-layers")}
          title="Layers"
        />

        {/* Style Button Container */}
        <IconButton
          icon={Icons.customIcons.builder.sideBar.styles}
          id="sidebar-pn-styles"
          className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
          iconClassName="flex items-center justify-center object-contain w-8 h-full fill-grey"
          onClick={() => handleSideBarClick("sidebar-pn-styles")}
          title="Styles"
        />

        {/* Component Settings Button Container */}
        <IconButton
          icon={Icons.customIcons.builder.sideBar.traits}
          id="sidebar-pn-traits"
          className="group hover:bg-gray-100 hover:cursor-pointer w-full object-contain h-16 flex items-center justify-center"
          iconClassName="flex items-center justify-center object-contain w-8 h-full fill-grey"
          onClick={() => handleSideBarClick("sidebar-pn-traits")}
          title="Traits"
        />
      </div>
    </div>
  );
};

export default IconSidebar;

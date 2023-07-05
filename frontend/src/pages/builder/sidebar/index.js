import React from "react";
import IconSidebar from "./IconSidebar";
import SideBarContent from "./SideBarContent";

const SideBar = ({ editor, sideBarExpanded, setSideBarExpanded }) => {
  return (
    <>
      {/* Side Bar with Icon buttons */}
      <IconSidebar setSideBarExpanded={setSideBarExpanded} />

      {/* Sidebar content */}
      <SideBarContent
        editor={editor}
        sideBarExpanded={sideBarExpanded}
        setSideBarExpanded={setSideBarExpanded}
      />
    </>
  );
};

export default SideBar;

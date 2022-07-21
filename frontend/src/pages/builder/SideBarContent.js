import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Icons } from "../../components/common/icons/icons";

const SideBarContent = ({ sideBarExpanded, setSideBarExpanded }) => {
  const [isOpen, setIsOpen] = useState(sideBarExpanded);

  useEffect(() => {
    console.log("From child component: ", sideBarExpanded);

    console.log("isOpen: ", isOpen);

    return () => {
      // second;
    };
  }, [sideBarExpanded]);

  // const { state, updateSideBarExpanded } = useContext(WebXBuilderContext);
  // console.log(`\n ${state}  \n `);

  const handleClose = () => {
    console.log("Handle close worked");
    setSideBarExpanded(false);
  };
  return (
    /* Side Bar Content Container */
    <div
      className={classNames(
        { hidden: sideBarExpanded === false },
        "flex flex-col shadow-2xl shadow-grey rounded-sm bg-white absolute left-20 top-[50%] translate-y-[-50%] z-10 h-[95%] max-h-[95%]"
      )}
    >
      {/* Panel Heading Container */}
      <div className="flex justify-between border-b border-gray-400">
        {/* Panel Heading */}
        <h3 className="p-4 text-2xl text-grey no-text-selection font-extrabold pointer-events-none">
          {"Add Elements"}
        </h3>
        {/* Panel Actions Container */}
        <div className="flex items-center">
          <div
            title="Help Center > Add Elements"
            className="flex justify-center items-center text-lg w-16 h-full hover:bg-gray-200 cursor-pointer"
          >
            {Icons.question}
          </div>
          <div
            title="Close"
            className="flex justify-center items-center text-lg w-16 h-full hover:bg-gray-200 cursor-pointer"
            onClick={handleClose}
          >
            {Icons.closeIcon}
          </div>
        </div>
      </div>
      {/* Panel Content */}
      <div className="flex w-full flex-auto h-0">
        {/* Blocks Categories Container */}
        <div
          id="blocks-categories-panel"
          className="flex flex-col min-w-fit h-full border-r border-gray-400"
        >
          {/* Category */}
          {/* <div className="py-3 px-4 font-semibold no-text-selection">
                {"QUICK ADD"}
              </div> */}
          {/* Category */}
          {/* <div className="py-3 px-4 font-semibold bg-blue-light text-blue-darker no-text-selection">
                {"TESTIMONIALS"}
              </div> */}
        </div>
        {/* Block Elements Here */}
        <div className="h-full flex-auto overflow-y-scroll custom-scrollbar scrollbar-rounded w-[300px]">
          {/* Blocks Elements Header */}
          <h2
            id="blocks-category-panel-title"
            className="px-3 py-3 font-bold text-xl no-text-selection"
          >
            {/* Panel categories here */}
          </h2>
          {/* Block Elements Container */}
          <div
            id="blocks-category-panel"
            className="px-3 pb-3 no-text-selection"
          >
            {/* {"Blocks Elements Here"} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;

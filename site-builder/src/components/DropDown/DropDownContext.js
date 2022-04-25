/**
 * @fileoverview This file contains a React Functional component that
 *               provides the functionality for the DropDown component. It
 *               exports a wrapper component that should wrap your
 *               application in the root component of you application in
 *               the same manner a context provider component is added to
 *               an application.
 *
 * @see {@link ./DropDown.tsx}
 */

import React, { useEffect } from "react";

const DropDownProvider = ({ children }) => {
  /**
   * Handles the click event that triggers the drop down
   * component's open and close animations
   * @param {any} e  click event object
   */
  const handleClick = (e) => {
    // If the drop down content is clicked return i.e. do nothing
    if (
      e.target?.matches("[data-drop-down]") ||
      e.target?.closest("[data-drop-down]") !== null
    ) {
      return;
    }
    // Determine if a dropdown button was clicked
    const isDropDownBtn = e.target.closest("[data-drop-down-btn]");
    // If the dropdown button was clicked show/hide drop down content
    let currentDropDown;
    if (isDropDownBtn) {
      currentDropDown = e.target
        .closest("[data-drop-down-btn]")
        .parentNode.querySelector("[data-drop-down]");
      // Determine whether to show/hide the dropdown content
      if (currentDropDown?.classList.contains("opacity-0")) {
        // Close all other open dropdowns
        Array.from(
          document.querySelectorAll("[data-drop-down].opacity-1")
        )?.map((dropDown) => {
          // Hide drop down content
          dropDown?.classList.add("opacity-0");
          dropDown?.classList.add("-translate-y-5");
          dropDown?.classList.add("pointer-events-none");
          dropDown?.classList.remove("translate-y-0");
          dropDown?.classList.remove("opacity-1");
          dropDown?.classList.remove("pointer-events-auto");
          isDropDownBtn?.classList.remove("bg-[#252423]");
        });
        // Make selected drop down content visible
        currentDropDown.classList.remove("opacity-0");
        currentDropDown.classList.remove("-translate-y-5");
        currentDropDown.classList.remove("pointer-events-none");
        currentDropDown.classList.add("translate-y-0");
        currentDropDown.classList.add("opacity-1");
        currentDropDown.classList.add("pointer-events-auto");
        isDropDownBtn?.classList.add("bg-[#252423]");
      } else {
        // Hide selected drop down content
        currentDropDown?.classList.add("opacity-0");
        currentDropDown?.classList.add("-translate-y-5");
        currentDropDown?.classList.add("pointer-events-none");
        currentDropDown?.classList.remove("translate-y-0");
        currentDropDown?.classList.remove("opacity-1");
        currentDropDown?.classList.remove("pointer-events-auto");
        isDropDownBtn?.classList.remove("bg-[#252423]");
      }
    } else {
      // If a dropdown button/content was not clicked hide any open dropdown content
      currentDropDown = document.querySelector("[data-drop-down].opacity-1");
      currentDropDown?.classList.add("opacity-0");
      currentDropDown?.classList.add("-translate-y-5");
      currentDropDown?.classList.add("pointer-events-none");
      currentDropDown?.classList.remove("translate-y-0");
      currentDropDown?.classList.remove("opacity-1");
      currentDropDown?.classList.remove("pointer-events-auto");
      currentDropDown?.parentElement
        ?.querySelector("[data-drop-down-btn]")
        ?.classList.remove("bg-[#252423]");
    }
  };

  // Add the clicke event listener to trigger the dropdown event
  useEffect(() => {
    document?.addEventListener("click", handleClick);
    return () => {
      // cleanup
      document?.removeEventListener("click", handleClick);
    };
  }, []);

  // Render the child components
  return <>{children}</>;
};

export default DropDownProvider;

import React, { useState, useEffect } from "react";
import classNames from "classnames";

/**
 * (React Component)
 * DropDown component that displays additional content when
 * clicked
 *
 * @param {string} drop_down_class  tailwind CSS class name(s) for the
 *                                  drop down wrapper container (optional)
 *
 * @param {string | JSX.Element} title  title that will appear at the top of
 *                                      the drop down. When clicked it will
 *                                      trigger the opening/closing of the
 *                                      drop down container (optional)
 *
 * @param {string} title_class  tailwind CSS class name(s) for the
 *                              drop down title container (optional)
 *
 * @param {string | JSX.Element} drop_down_content  drop down content. The
 *                                                  content that will appear
 *                                                  within the drop down
 *                                                  container (optional)
 *
 * @param {string} drop_down_content_class  tailwind CSS class name(s) for
 *                                          the drop down content container
 *                                          (optional)
 *
 * @returns {React.FC}  the drop down component
 *
 * @requires DropDownContext component for the drop down to work. This
 *                           component contains all the event listerners
 *                           that allow the drop down to work
 */
const DropDown = ({
  drop_down_class = "",
  title = "",
  title_icon,
  title_icon_class = "",
  title_class = "",
  drop_down_content = "",
  drop_down_content_class = "",
  align = "left",
}) => {
  return (
    <div className={classNames("relative min-h-full flex", drop_down_class)}>
      {/* Title */}
      <div
        className={classNames(
          "min-h-full flex items-center cursor-pointer",
          title_class
        )}
        data-drop-down-btn
      >
        {title_icon && (
          <div
            className={classNames(
              "flex justify-center items-center ",
              "rounded-full mr-1 w-5",
              title_icon_class
            )}
          >
            {title_icon}
          </div>
        )}
        <p>{title}</p>
      </div>
      <div
        id={`drop-down-content`}
        className={classNames(
          { "left-0": align === "left" },
          { "right-0": align === "right" },
          "absolute top-full transition transform pointer-events-none -translate-y-5 opacity-0 ease-in-out duration-150",
          drop_down_content_class
        )}
        data-drop-down
      >
        {drop_down_content}
      </div>
    </div>
  );
};

export default DropDown;

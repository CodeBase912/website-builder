import React from "react";
import classNames from "classnames";
// Import Custom React Components
import Button from "../common/Button";
// Import NavLinks
import { navLinks, navActions } from "./nav-links";

const NavBar = ({ children, links, actions }) => {
  return (
    <nav className="flex items-center relative">
      <div className="sm:hidden px-2">{"Menu"}</div>
      <ul
        className={classNames(
          "flex flex-col h-screenh absolute right-0 top-0 bg-grey-darker",
          "w-[200px] sm:w-fit",
          "sm:flex-row sm:relative sm:h-full"
        )}
      >
        <div className="sm:hidden px-2 text-right p-3">{"Close Menu"}</div>
        {/* NavBar Links */}
        {navLinks.map((link, linkIndex) => {
          return (
            <li className="flex items-center justify-center">
              <a
                key={`nav-link-home-${linkIndex}`}
                className={classNames(
                  "flex items-center justify-center cursor-pointer",
                  "px-9 bg-dark text-grey-lighter h-full",
                  "w-full py-2", // Mobile Screens
                  "sm:w-fit" // Larger Screens
                )}
              >
                <p className="whitespace-nowrap">{link.title}</p>
              </a>
            </li>
          );
        })}

        {/* NavBar Actions */}
        {navActions.map((action, actionLink) => {
          return (
            <li
              className={classNames(
                "flex items-center",
                "py-2", // Mobile Screens
                "sm:py-0" // Larger Screens
              )}
            >
              <Button
                key={`nav-home-action-${actionLink}`}
                endIcon={action.endIcon}
                className="mx-2"
              >
                <p>Login</p>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;

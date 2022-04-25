import React, { useState } from "react";
import classNames from "classnames";
// Import Custom React Components
import Button from "../common/Button";
// Import NavLinks
import { navLinks, navActions } from "./nav-links";

const NavBar = ({ children, links, actions }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex items-center relative">
      {/* Open Menu Button (Visibility: Mobile Screens "sm:...") */}
      <div
        onClick={() => {
          setMenuOpen(true);
        }}
        className="sm:hidden px-2 cursor-pointer"
      >
        {"Menu"}
      </div>
      <ul
        className={classNames(
          "flex flex-col h-screenh transition duration-500 absolute top-0 sm:right-0 bg-grey-darker",
          "w-[200px] sm:w-fit",
          "sm:flex-row sm:relative sm:h-full",
          { "right-0": menuOpen === true },
          { "-right-[200px]": menuOpen === false }
        )}
      >
        <div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="sm:hidden px-2 text-right p-2 cursor-pointer"
        >
          {"Close Menu"}
        </div>

        {/* NavBar Actions (Mobile Screens) */}
        {navActions.map((action, actionLink) => {
          return (
            <li
              className={classNames(
                "flex items-center justify-center",
                "py-2", // Mobile Screens
                "sm:py-0 sm:hidden" // Larger Screens
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

        {/* NavBar Actions (Mobile Screens) */}
        {navActions.map((action, actionLink) => {
          return (
            <li
              className={classNames(
                "",
                "py-2 hidden", // Mobile Screens
                "sm:py-0 sm:flex items-center justify-center" // Larger Screens
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

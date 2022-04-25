import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import classNames from "classnames";
// Import Custom React Components
import Button from "../common/Button";
// Import NavLinks
import { navLinks, navActions } from "./nav-links";
import { Icons } from "../common/icons";

const NavBgModal = ({ menuOpen, setMenuOpen }) => {
  const modalRoot = document.getElementById("root");
  const modalContent = (
    <div
      onClick={() => {
        setMenuOpen(false);
      }}
      className={classNames(
        "absolute top-0 left-0 h-screenh w-screenw transition-opacity duration-500 ease-in-out bg-black z-40",
        { "bg-opacity-40 pointer-events-auto": menuOpen === true },
        { "bg-opacity-0 pointer-events-none": menuOpen === false }
      )}
    />
  );
  return ReactDom.createPortal(
    modalContent,
    //@ts-ignore
    modalRoot
  );
};

const NavBar = ({ children, links, actions }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const width = e.target.innerWidth;
      const height = e.target.innerHeight;
      // console.log({ width, height });

      if (width < 640) {
        setMenuOpen(false);
      }
    });

    return window.removeEventListener("resize", (e) => {
      const width = e.target.innerWidth;
      const height = e.target.innerHeight;
      // console.log({ width, height });

      if (width < 640) {
        setMenuOpen(false);
      }
    });
  }, []);

  return (
    <nav className="flex items-center relative">
      <NavBgModal menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Open Menu Button (Visibility: Mobile Screens "sm:...") */}
      <div
        onClick={() => {
          setMenuOpen(true);
        }}
        className="text-xl sm:hidden px-4 cursor-pointer text-grey-lighter"
      >
        {Icons.bars}
      </div>
      <ul
        className={classNames(
          "flex flex-col h-screenh z-50 transition transform sm:duration-300 ease-in-out absolute top-0 -right-[200px] sm:right-0 bg-grey-darker",
          "w-[200px] sm:w-fit",
          "sm:flex-row sm:relative sm:h-full",
          { "-translate-x-[200px]": menuOpen === true },
          {
            "translate-x-[0px]": menuOpen === false,
          }
        )}
      >
        <div className="flex justify-end sm:hidden w-full">
          <div
            onClick={() => {
              setMenuOpen(false);
            }}
            className="text-xl sm:hidden px-4 py-3 cursor-pointer w-fit text-grey-lighter"
          >
            {Icons.closeIcon}
          </div>
        </div>

        {/* NavBar Actions (Mobile Screens) */}
        {navActions.map((action, actionLink) => {
          return (
            <li
              key={`nav-home-action-${actionLink}`}
              className={classNames(
                "flex items-center justify-center",
                "py-2", // Mobile Screens
                "sm:py-0 sm:hidden" // Larger Screens
              )}
            >
              <Button endIcon={action.endIcon} className="mx-2">
                <p>Login</p>
              </Button>
            </li>
          );
        })}

        {/* NavBar Links */}
        {navLinks.map((link, linkIndex) => {
          return (
            <li
              key={`nav-link-home-${linkIndex}`}
              className="flex items-center justify-center"
            >
              <a
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
              key={`nav-home-action-${actionLink}`}
              className={classNames(
                "",
                "py-2 hidden", // Mobile Screens
                "sm:py-0 sm:flex items-center justify-center" // Larger Screens
              )}
            >
              <Button endIcon={action.endIcon} className="mx-4">
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

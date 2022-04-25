import React from "react";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import Input from "../../common/forms/Input";
import { Icons } from "../../common/icons/icons";
import Logo from "../Logo";
// Import Footer Links
import { footerLinks } from "./footer-links";
import NewsletterSubscriber from "./NewsletterSubscriber";

const Footer = () => {
  return (
    <footer className="bg-grey-darker text-white py-4 px-4 w-full">
      {/* Footer Content Container */}
      <div className="max-w-largest m-auto">
        {/* Linkx & Newsletter Container */}
        <div className="w-full 2md:flex">
          {/* Links Container */}
          <div className="grid grid-template-cols gap-3 flex-1">
            {footerLinks.map((group, groupIndex) => {
              return (
                <div
                  key={`footer-group-${groupIndex}`}
                  className="flex flex-col"
                >
                  <h4>{group.groupTitle}</h4>
                  {group.groupLinks.map((link, linkIndex) => {
                    return (
                      <Link
                        key={`footer-group-${groupIndex}-link-${linkIndex}`}
                        to={link.to}
                        className="text-sm w-fit whitespace-nowrap text-grey-lighter hover:text-white"
                      >
                        {link.title}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Newsletter Container */}
          <div className="py-3 space-y-1">
            <p>Subscribe to our Newsletter</p>
            <NewsletterSubscriber />
          </div>
        </div>

        {/* Bottom container */}
        <div className="sm:flex items-center justify-between pt-8">
          {/* Logo Container */}
          <div>
            <Logo />
            <p className="text-[12px] text-grey-lighter p-2">
              {"Build your Future. Change the World"}
            </p>
          </div>

          {/* Terms & Privacy Policy Container */}
          <div className="pt-8 sm:pt-0">
            {/* Social Media Links Container */}
            <div>
              <ul className="flex sm:justify-end">
                <li className="object-contain">
                  <Button icon className={"text-xl w-10"}>
                    {Icons.social.instagram}
                  </Button>
                </li>
                <li className="object-contain">
                  <Button icon className={"text-xl w-10"}>
                    {Icons.social.twitter}
                  </Button>
                </li>
                <li className="object-contain">
                  <Button icon className={"text-xl w-10"}>
                    {Icons.social.youtube}
                  </Button>
                </li>
                <li className="object-contain">
                  <Button icon className={"text-xl w-10"}>
                    {Icons.social.facebook}
                  </Button>
                </li>
              </ul>
            </div>

            {/* Terms & Privacy Policy Container */}
            <div className="flex">
              <Link to="/">
                <p className="text-grey-lighter text-sm">
                  {"Terms of Service"}
                </p>
              </Link>
              <div className="h-full text-transparent border-l-[1px] border-grey-light ml-3 w-3 pointer-events-none">
                bar
              </div>
              <Link to="/">
                <p className="text-grey-lighter text-sm">{"Privacy Policy"}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

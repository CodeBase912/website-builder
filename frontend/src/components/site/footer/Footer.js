import React from "react";
import { Link } from "react-router-dom";
import Input from "../../common/forms/Input";
// Import Footer Links
import { footerLinks } from "./footer-links";
import NewsletterSubscriber from "./NewsletterSubscriber";

const Footer = () => {
  return (
    <footer className="bg-grey-darker text-white py-2 px-4">
      {/* Links Container */}
      <div className="grid grid-template-cols gap-3">
        {footerLinks.map((group, groupIndex) => {
          return (
            <div key={`footer-group-${groupIndex}`} className="flex flex-col">
              <h4>{group.groupTitle}</h4>
              {group.groupLinks.map((link, linkIndex) => {
                return (
                  <Link
                    key={`footer-group-${groupIndex}-link-${linkIndex}`}
                    to={link.to}
                    className="text-sm whitespace-nowrap"
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
    </footer>
  );
};

export default Footer;

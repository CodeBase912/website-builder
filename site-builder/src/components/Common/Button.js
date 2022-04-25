import React from "react";
import classNames from "classnames";

const Button = ({
  children,
  iconStart = null,
  iconEnd = null,
  outlined = false,
  contained = false,
  color = "primary",
  className,
}) => {
  // Make sure contained prop takes precedence over outlined prop
  if ((outlined && contained) || (!outlined && !contained)) {
    contained = true;
    outlined = false;
  }
  return (
    <button
      className={classNames(
        { "bg-primary": color === "primary" && contained === true },
        { "bg-grey-dark": color === "secondary" && contained === true },
        { "border border-primary": color === "primary" && outlined === true },
        {
          "border border-grey-dark": color === "secondary" && outlined === true,
        },
        "flex items-center justify-center text-grey-darker px-4 rounded-[3px] hover:bg-opacity-90 active:bg-opacity-80",
        className
      )}
    >
      {iconStart && <div className="mr-4">{iconStart}</div>}
      {children}
      {iconEnd && <div className="ml-4">{iconEnd}</div>}
    </button>
  );
};

export default Button;

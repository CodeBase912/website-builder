import React from "react";
import classNames from "classnames";

const Button = ({
  children,
  startIcon = null,
  endIcon = null,
  color = "primary",
  contained = false,
  outlined = false,
  className,
}) => {
  // contained prop takes precedence
  if ((contained && outlined) || (!contained && !outlined)) {
    contained = true;
    outlined = false;
  }
  return (
    <button
      className={classNames(
        "flex items-center space-x-2 rounded-[3px] py-1 px-4 font-bold active:opacity-80 hover:opacity-90",
        { "bg-primary text-black": color === "primary" && contained === true },
        {
          "bg-grey-dark text-tertiary":
            color === "secondary" && contained === true,
        },
        {
          "border-[3px] border-primary text-primary":
            color === "primary" && outlined === true,
        },
        {
          "border-[3px] border-grey-dark text-grey-dark":
            color === "secondary" && outlined === true,
        },
        className
      )}
    >
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </button>
  );
};

export default Button;

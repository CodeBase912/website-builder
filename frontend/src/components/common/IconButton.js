import classNames from "classnames";
import React from "react";

/**
 *
 * @param {{className: string, iconClassName: string, onClick: () => void, icon: React.ReactNode, ...props: any }} param0
 * @returns
 */
const IconButton = ({ className, iconClassName, onClick, icon, ...props }) => {
  return (
    <button className={classNames("", className)} onClick={onClick} {...props}>
      <div className={classNames(iconClassName)}>{icon}</div>
    </button>
  );
};

export default IconButton;

import React from "react";
import { Icons } from "../common/icons/icons";
// Import Icons
// import LogoIcon from "../../assets/icons/Logo Icon.svg";

const Logo = ({ iconOnly = false }) => {
  return (
    <div className="flex items-center justify-center w-fit space-x-2">
      <div className="w-[35px]">{Icons.customIcons.logo}</div>
      {!iconOnly && (
        <p className="font-semibold text-xl">
          Web<span className="text-primary">X</span>
        </p>
      )}
    </div>
  );
};

export default Logo;

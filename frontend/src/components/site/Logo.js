import React from "react";
// Import Icons
import LogoIcon from "../../assets/icons/Logo Icon.svg";

const Logo = ({ iconOnly = false }) => {
  return (
    <div className="flex py-2 px-4 items-center justify-center w-fit space-x-2">
      <img src={LogoIcon} className="w-[35px] object-contain" />
      {!iconOnly && (
        <p className="font-semibold text-xl">
          Web<span className="text-primary">X</span>
        </p>
      )}
    </div>
  );
};

export default Logo;

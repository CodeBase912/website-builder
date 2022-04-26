import React, { useEffect } from "react";
// Import Icon Paths
import { iconPaths } from "./paths";

const CustomIcon = ({ icon, className }) => {
  return <div className={className}>{iconPaths[icon]({ className })}</div>;
};

export default CustomIcon;

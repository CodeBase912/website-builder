import UserIcon from "../../assets/icons/user-icon_big.svg";

export const navLinks = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Services",
    to: "/",
  },
  {
    title: "Our Plans",
    to: "/",
  },
];

export const navActions = [
  {
    title: "Login",
    endIcon: <img src={UserIcon} className="w-[18px] text-grey-lighter" />,
  },
];

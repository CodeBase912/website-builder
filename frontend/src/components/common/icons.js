import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import UserIcon from "../../assets/icons/user-icon_big.svg";
// Import FontAwesome Icons
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
// Import Brand Icons
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

library.add(faClose, faBars);

export const Icons = {
  closeIcon: <FontAwesomeIcon icon={faClose} />,
  bars: <FontAwesomeIcon icon={faBars} />,
  user: <FontAwesomeIcon icon={UserIcon} />,
};

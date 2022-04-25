import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import UserIcon from "../../assets/icons/user-icon_big.svg";
// Import FontAwesome Icons
import {
  faClose,
  faBars,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
// Import Brand Icons
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

library.add(faClose, faBars, faPaperPlane);

export const Icons = {
  closeIcon: <FontAwesomeIcon icon={faClose} />,
  bars: <FontAwesomeIcon icon={faBars} />,
  paperPlane: <FontAwesomeIcon icon={faPaperPlane} />,
};

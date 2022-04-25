import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import FontAwesome Icons
import {
  faClose,
  faBars,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
// Import Brand Icons
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
// Import Custom Icons
import CustomIcon from "./CustomIcon";

library.add(
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
  faYoutube,
  faClose,
  faBars,
  faPaperPlane,
  faUser
);

export const Icons = {
  customIcons: {
    userFriendly: <CustomIcon icon="userFriendly" />,
    user: <CustomIcon icon="user" />,
  },
  social: {
    facebook: <FontAwesomeIcon icon={faFacebookF} />,
    twitter: <FontAwesomeIcon icon={faTwitter} />,
    instagram: <FontAwesomeIcon icon={faInstagram} />,
    youtube: <FontAwesomeIcon icon={faYoutube} />,
  },
  closeIcon: <FontAwesomeIcon icon={faClose} />,
  bars: <FontAwesomeIcon icon={faBars} />,
  paperPlane: <FontAwesomeIcon icon={faPaperPlane} />,
  user: <FontAwesomeIcon icon={faUser} />,
};

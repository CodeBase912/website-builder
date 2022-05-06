import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import FontAwesome Icons
import {
  faClose,
  faBars,
  faPaperPlane,
  faUser,
  faUndo,
  faRedo,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
  faQuestion,
  faMap,
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
  faUser,
  faUndo,
  faRedo,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
  faQuestion,
  faMap
);

export const Icons = {
  customIcons: {
    logo: <CustomIcon icon="logo" />,
    heroImage: <CustomIcon icon="heroImage" />,
    dotsTopRight: <CustomIcon icon="dotsTopRight" />,
    dotsBottomLeft: <CustomIcon icon="dotsBottomLeft" />,
    userFriendly: <CustomIcon icon="userFriendly" />,
    user: <CustomIcon icon="user" />,
    customize: <CustomIcon icon="customize" />,
    page: <CustomIcon icon="page" />,
    rocket: <CustomIcon icon="rocket" />,
    cycle: <CustomIcon icon="cycle" />,
    database: <CustomIcon icon="database" />,
    cloudOutlined: <CustomIcon icon="cloudOutlined" />,
    allDevices: <CustomIcon icon="allDevices" />,
    clients: {
      robinhood: <CustomIcon icon="robinhood" />,
      reddit: <CustomIcon icon="reddit" />,
      upcase: <CustomIcon icon="upcase" />,
      hubspot: <CustomIcon icon="hubspot" />,
    },
    builder: {
      header: {
        // widths = {mobile: w-[21px], tablet: w-[36px], desktop: w-[54px]}
        mobile: <CustomIcon icon="mobile" />,
        tablet: <CustomIcon icon="tablet" />,
        desktop: <CustomIcon icon="desktop" />,
        borders: <CustomIcon icon="borders" />,
        canvasWidth: <CustomIcon icon="canvasWidth" />,
        download: <CustomIcon icon="download" />,
        preview: <CustomIcon icon="preview" />,
        upload: <CustomIcon icon="upload" />,
      },
      sideBar: {
        pages: <CustomIcon icon="pages" />,
        blocks: <CustomIcon icon="blocks" />,
        layers: <CustomIcon icon="layers" />,
        styles: <CustomIcon icon="styles" />,
        traits: <CustomIcon icon="traits" />,
      },
    },
  },
  social: {
    facebook: <FontAwesomeIcon icon={faFacebookF} />,
    twitter: <FontAwesomeIcon icon={faTwitter} />,
    instagram: <FontAwesomeIcon icon={faInstagram} />,
    youtube: <FontAwesomeIcon icon={faYoutube} />,
  },
  chevron: {
    up: <FontAwesomeIcon icon={faChevronUp} />,
    down: <FontAwesomeIcon icon={faChevronDown} />,
    right: <FontAwesomeIcon icon={faChevronRight} />,
    left: <FontAwesomeIcon icon={faChevronLeft} />,
  },
  closeIcon: <FontAwesomeIcon icon={faClose} />,
  bars: <FontAwesomeIcon icon={faBars} />,
  paperPlane: <FontAwesomeIcon icon={faPaperPlane} />,
  user: <FontAwesomeIcon icon={faUser} />,
  redo: <FontAwesomeIcon icon={faRedo} />,
  undo: <FontAwesomeIcon icon={faUndo} />,
  ellipes: <FontAwesomeIcon icon={faEllipsisH} />,
  question: <FontAwesomeIcon icon={faQuestion} />,
  map: <FontAwesomeIcon icon={faMap} />,
};

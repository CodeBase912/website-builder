import { Icons } from "../../components/common/icons/icons";

export const sections = {
  services: {
    title: "WebX brings all your creativity together",
    subtitle: (
      <>
        {"When you need to a kickstart in your business and have no time for "}
        <br className="hidden 4xs:block" />
        {"coding your website, let us do that job for you in minutes"}
      </>
    ),
    content: [
      {
        icon: Icons.customIcons.page,
        title: "USER-FRIENDLY PAGE BUILDER",
        text: "An industry leading page builder that makes it easy to build world-class websites that you can host anywhere",
      },
      {
        icon: Icons.customIcons.customize,
        title: "EASY TO CUSTOMIZE",
        text: "Be able to customize your plan over time if needed so you pay only for what you use",
      },
      {
        icon: Icons.customIcons.allDevices,
        title: "FITS WITH ANY DEVICE",
        text: "Build functional responsive websites that look great on any device in a breeze",
      },
    ],
  },
  pricing: {
    title: "Types of hosting that we provide",
    subtitle: "Our service is always affordable for everyone",
    content: [
      {
        icon: "",
        title: "USER-FRIENDLY PAGE BUILDER",
        text: "An industry leading page builder that makes it easy to build world-class websites that you can host anywhere",
      },
      {
        title: "EASY TO CUSTOMIZE",
        text: "Be able to customize your plan over time if needed so you pay only for what you use",
      },
      {
        title: "FITS WITH ANY DEVICE",
        text: "Build functional responsive websites that look great on any device in a breeze",
      },
    ],
  },
};

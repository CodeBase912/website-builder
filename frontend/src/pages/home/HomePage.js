import React from "react";
// Import Custom React Components
import Header from "../../components/site/Header";
import Footer from "../../components/site/footer/Footer";
// Import Images
import HeroImage from "../../assets/images/Hero_Image.svg";
import { HeroIcon, Icons } from "../../components/common/icons/icons";
import Button from "../../components/common/Button";
import Icon from "../../components/common/icons/CustomIcon";

const HomePage = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-screenw max-w-full">
      <Header />
      <main className="flex flex-col flex-1 pt-[47px] w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center 2sm:flex-row bg-grey-darker text-white w-full">
          {/* Hero Content Container */}
          <div className="w-full p-4 text-center 2sm:text-left">
            {/* Hero Header */}
            <h1 className="p-2 font-bold text-md xs:text-lg 3xs:text-[18px] sm:text-lg 2ms:text-2xl ls:text-3xl">
              <span>
                {"Simplify Website Development"}
                <br /> {"with Web "}
                <span className="text-primary">{"X"}</span>
              </span>
            </h1>
            {/* Hero Text */}
            <p className="px-2 text-xs xs:text-sm 2sm:text-[12px] 2ms:text-[14px] ls:text-[16px] text-grey-lighter">
              <span>
                {"Design and develop your website at the same time"}
                <br className="hidden 2xs:block" /> {"in our website builder"}
              </span>
              <span>{""}</span>
            </p>
            {/* Hero Button Container */}
            <div className="flex flex-wrap gap-3 text-sm py-5 px-2 justify-center 2sm:justify-start">
              <Button>{"Get Started"}</Button>
              <Button outlined>{"Try it for FREE"}</Button>
            </div>
          </div>
          {/* Hero Illustration Container */}
          <div className="flex justify-center w-full">
            <img
              src={HeroImage}
              alt={"Illustration of a man and woman working"}
              className="object-contain w-[20rem] sm:w-[20rem] md:w-[30rem]"
            />
          </div>
        </section>

        {/* Services Section */}
        <section>
          {/* Section Header Container */}
          <div className="py-8 space-y-3 px-3">
            <h2 className="font-semibold text-center text-lg 2sm:text-xl ls:text-2xl">
              {"WebX brings all your creativity together"}
            </h2>
            <p className=" text-grey-dark text-center 2xs:text-sm 2sm:text-[16px]">
              {
                "When you need to a kickstart in your business and have no time for "
              }
              <br className="hidden 4xs:block" />
              {"coding your website, let us do that job for you in minutes"}
            </p>
          </div>
          {/* Section Content Container */}
          <div className="w-24 fill-blue-icons">
            {Icons.customIcons.userFriendly}
          </div>
          <div className="w-24 fill-blue-icons">
            {Icons.customIcons.customize}
          </div>
          <div className="w-24 fill-blue-icons">
            {Icons.customIcons.allDevices}
          </div>
          <div className="w-24 fill-blue-icons">{Icons.customIcons.page}</div>
          <div className="w-24 fill-blue-icons">{Icons.customIcons.rocket}</div>
          <div className="w-24">{Icons.customIcons.cycle}</div>
          <div className="w-24">{Icons.customIcons.database}</div>
          <div className="w-24">{Icons.customIcons.cloudOutlined}</div>
          <div className="w-24">{Icons.customIcons.clients.robinhood}</div>
          <div className="w-24">{Icons.customIcons.clients.reddit}</div>
          <div className="w-24 fill-grey-dark">
            {Icons.customIcons.clients.upcase}
          </div>
          <div className="w-24 fill-grey-dark">
            {Icons.customIcons.clients.hubspot}
          </div>
          <div className="w-[54px] object-contain fill-primary stroke-primary">
            {Icons.customIcons.builder.header.desktop}
          </div>
          <div className="w-[36px] fill-primary stroke-primary">
            {Icons.customIcons.builder.header.tablet}
          </div>
          <div className="w-[21px] fill-primary stroke-primary">
            {Icons.customIcons.builder.header.mobile}
          </div>
          <div className="w-24 fill-grey-darker ">
            {Icons.customIcons.builder.header.download}
          </div>
          <div className="w-24 fill-grey-darker ">
            {Icons.customIcons.builder.header.preview}
          </div>
          <div className="w-24 fill-grey-darker ">
            {Icons.customIcons.builder.header.upload}
          </div>
          <div className="w-24 fill-blue-icons ">
            {Icons.customIcons.builder.sideBar.pages}
          </div>
          <div className="w-24 fill-blue-icons ">
            {Icons.customIcons.builder.sideBar.blocks}
          </div>
          <div className="w-24 fill-blue-icons ">
            {Icons.customIcons.builder.sideBar.layers}
          </div>
          <div className="w-24 fill-blue-icons ">
            {Icons.customIcons.builder.sideBar.styles}
          </div>
          <div className="w-24 fill-blue-icons ">
            {Icons.customIcons.builder.sideBar.traits}
          </div>
        </section>

        {/* Where to Start Section */}
        <section>
          {/* Section Header Container */}
          {/* Section Content Container */}
        </section>

        {/* Pricing Section */}
        <section>
          {/* Section Header Container */}
          {/* Section Content Container */}
        </section>

        {/* Reviews Section */}
        <section>
          {/* Section Header Container */}
          {/* Section Content Container */}
        </section>

        {/* Our Clients Section */}
        <section>
          {/* Section Header Container */}
          {/* Section Content Container */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

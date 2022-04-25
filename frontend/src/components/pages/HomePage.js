import React from "react";
// Import Custom React Components
import Header from "../site/Header";
import Footer from "../site/footer/Footer";
// Import Images
import HeroImage from "../../assets/images/Hero_Image.svg";
import { HeroIcon, Icons } from "../common/icons";
import Button from "../common/Button";

const HomePage = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-screenw max-w-full">
      <Header />
      <main className="flex flex-1 pt-[47px] w-full">
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
          {/* Section Content Container */}
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

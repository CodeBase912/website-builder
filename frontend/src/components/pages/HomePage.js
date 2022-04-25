import React from "react";
// Import Custom React Components
import Header from "../site/Header";
import Footer from "../site/footer/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 pt-[60px]">Hello</main>
      <Footer />
    </div>
  );
};

export default HomePage;

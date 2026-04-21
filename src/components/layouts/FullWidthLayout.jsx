import React from "react";
import Navbar from "../common/navbar/Navbar.jsx";
import Footer from "../common/footer/Footer.jsx";
import Hero from "../common/hero/Hero.jsx";
import "./Layouts.css";

const FullWidthLayout = ({ children, showHero = true }) => {
  return (
    <div className="full-width-layout">
      <Navbar />
      {showHero && <Hero />}
      <main className="main-full-width">{children}</main>
      <Footer />
    </div>
  );
};

export default FullWidthLayout;

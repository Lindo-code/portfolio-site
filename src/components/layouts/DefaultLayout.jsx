import React from "react";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import "./Layouts.css";

const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      <Navbar />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import "./Pages.css";

const About = () => {
  return (
    <DefaultLayout>
      <div className="page-container">
        <h1>About Us</h1>
        <p>
          This is a React implementation of stack cards with responsive layouts.
        </p>
        <p>Features include:</p>
        <ul>
          <li>Responsive design for mobile and desktop</li>
          <li>Smooth animations with Framer Motion</li>
          <li>Sticky scroll effects</li>
          <li>Intersection observer for lazy loading</li>
          <li>CSS Grid layout system</li>
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default About;

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../logo/Logo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="brand" onClick={closeMenu}>
            <Logo
              size="compact"
              scale={0.5}
              lampHeight={30}
              postWidth={0.95}
              dotWidth={1.6}
              bulbWidth={0.7}
              headWidth={2.3}
              headPos={1.7}
              rayPos={-0.7}
              postMargin={33}
              headColor="#ffffff"
              postColor="#ffffff"
              bulbColor="#ffffff"
              rayColor="#ffffff"
              dotColor="#C90201"
            />
          </Link>
          <button
            type="button"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`navbar-nav ${mobileMenuOpen ? "active" : ""}`}>
            {/* <NavLink to="/" className="nav-link" onClick={closeMenu} end> */}
            {/*   Home */}
            {/* </NavLink> */}
            {/**/}
            {/* <NavLink to="/about" className="nav-link" onClick={closeMenu}> */}
            {/*   About */}
            {/* </NavLink> */}
            {/**/}
            {/* <NavLink to="/projects" className="nav-link" onClick={closeMenu}> */}
            {/*   Projects */}
            {/* </NavLink> */}{" "}
            <a href="#" className="nav-link" onClick={closeMenu}>
              Home
            </a>
            <a href="#sectionPin" className="nav-link" onClick={closeMenu}>
              Projects
            </a>
            <a
              href="https://lindocode.com/contact?theme=minimal-black"
              className="nav-link nav-link-contact"
              onClick={closeMenu}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

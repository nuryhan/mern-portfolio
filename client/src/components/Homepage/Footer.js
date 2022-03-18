import React from "react";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import "./Footer.css";

const Footer = () => {
  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 50,
      smooth: true,
      offset: -80,
    });
  };

  return (
    <>
      <div className="main-title">
        <h2 className="title contact-title">Contact</h2>
      </div>

      <div className="main-contact">
        <div className="contact">
          <div className="contact-center">
            <div className="contact-center-links">
              <h3> Links</h3>
              <div className="contact-links">
                <li onClick={() => scrollToElement("Home")}>
                  <Link to="/"> Home </Link>
                </li>
                <li onClick={() => scrollToElement("About")}>
                  <Link to="/"> About </Link>
                </li>
                <li onClick={() => scrollToElement("Education")}>
                  <Link to="/"> Education </Link>
                </li>
                <li onClick={() => scrollToElement("Experience")}>
                  <Link to="/"> Experience </Link>
                </li>
                <li onClick={() => scrollToElement("Projects")}>
                  <Link to="/"> Projects </Link>
                </li>
                <li onClick={() => scrollToElement("Contact")}>
                  <Link to="/"> Contact </Link>
                </li>
                {/* <li>
                  <Link className="admin" to="/">
                    Admin
                  </Link>
                </li> */}
              </div>
            </div>

            {/* media */}

            <div className="contact-center-media">
              <h3> Media </h3>
              <div className="contact-media">
                <li>
                  <a href="/">Linkedin</a>
                </li>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <p> Powered by ParlakUlgam 2022 </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

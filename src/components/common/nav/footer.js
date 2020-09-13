import { Link, } from "gatsby";
import React from "react";
import "./header.scss";
import "../styles/_common.scss";
import LP from "../../../images/LP.svg";

const Footer = () => (
  <footer className="footer">
    <hr className="footerHr" />
    <div className="container navMenuWrapper footerDetails">
      <Link to="/">
        <img src={LP} alt="logo" />
      </Link>
      &nbsp;
      <p>&copy;2020</p>
      <p>|</p>
      <p>Privacy</p>
      <p>|</p>
      <p>Terms And Conditions</p>
    </div>
  </footer>
);

export default Footer;

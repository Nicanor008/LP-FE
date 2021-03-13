import { Link } from "gatsby"
import React from "react"
import "./header.scss"
import "../styles/_common.scss"
import LP from "../../../images/LP.svg"
import "./footer.scss"

const Footer = () => (
  <footer className="footer">
  <hr className="footerHr"/>
    <div className="container navMenuWrapper footerDetails">
      <Link to="/">
        <img src={LP} alt="logo" />
      </Link>
      &nbsp;
      <p>&copy;2021 <span className="divider">|</span> </p>
      <p>Privacy <span className="divider">|</span> </p>
      <p>Terms And Conditions</p>
    </div>
  </footer>
)

export default Footer

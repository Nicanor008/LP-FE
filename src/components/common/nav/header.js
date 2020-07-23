import { Link } from "gatsby"
import React from "react"
import "./header.scss"
import Logo from "../../../images/logo.svg"

const Header = () => (
  <header className="navHeader">
    <div className="container navMenuWrapper">
      <Link to="/">
        <img src={Logo} alt="logo" className="logo" />
      </Link>
    </div>
  </header>
)

export default Header

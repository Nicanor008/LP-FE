import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "./header.scss"
import "../styles/_common.scss"
import Logo from "../../../images/logo.svg"
import Menu from "../../../images/icons/menu.svg"
import { Loader } from "../loader"

const Header = () => {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const getToken =
      typeof window !== "undefined" && window.localStorage.getItem("token")
    if (getToken) {
      setToken(getToken)
      setLoading(false)
    } else {
      setLoading(false)
      setToken("")
    }
  }, [])

  const logoutHandler = () => {
    localStorage.clear()
    if (typeof window !== "undefined") {
      window.location.href = ("/")
    }
  }

  function responsiveMenu() {
    var x = document.getElementById("myTopNav")
    if (x.className === "myTopNav") {
      x.className += " responsive"
    } else {
      x.className = "myTopNav"
    }
  }
  
  return (
    <header className="navHeader">
      <div className="container navMenuWrapper navWrapper">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
        <div className="menu" id="meTest">
          {loading ? (
            <Loader />
          ) : token ? (
            <div className="myTopNav" id="myTopNav">
              <Link to="/todo">Todo</Link>
              <button onClick={logoutHandler}>Log out</button>
              <button className="icon" onClick={responsiveMenu}>
                <img src={Menu} alt="menu" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="unAuthButton">
              Sign In|Up
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

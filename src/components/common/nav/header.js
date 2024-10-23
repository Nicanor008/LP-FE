import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import "./header.scss"
import "../styles/_common.scss"
import Logo from "../../../images/logo2.svg"
import DashboardLogo from "../../../images/dashboard-logo.svg"
import Menu from "../../../images/icons/menu.svg"
import { Loader } from "../loader"

const Header = ({ isDashboard }) => {
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

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  
  return (
    <header className="navHeader">
      <Box className="container navMenuWrapper navWrapper" pb="0.5rem">
        <Link to="/">
          <img src={isDashboard || scrollPosition > 224 ? DashboardLogo : Logo} alt="logo" className="logo" />
        </Link>
        <div className="menu" id="meTest">
          {loading ? (
            <Loader />
          ) : token ? (
            <div className="myTopNav" id="myTopNav">
              <Link to="/todo">Todo</Link>
              <Link to="#">Notes</Link>
              <Link to="#">FutureMe</Link>{" "}
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
      </Box>
    </header>
  )
}

export default Header

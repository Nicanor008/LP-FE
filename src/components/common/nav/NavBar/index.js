// import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { Box, useBreakpointValue, Link, Button, Flex } from "@chakra-ui/react"
import Logo from "../../../../images/logo2.svg"
import DashboardLogo from "../../../../images/dashboard-logo.svg"
import Menu from "../../../../images/icons/menu.svg"
import Loader from "../../loader"
import "../../styles/_common.scss"
import "./header.scss"

const Header = ({ isDashboard }) => {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const isMobile = useBreakpointValue({ base: true, md: false });

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
        <Link href="/">
          <img src={isDashboard || scrollPosition > 224 ? DashboardLogo : Logo} alt="logo" className="logo" />
        </Link>
        <Flex alignItems="center" className="menu" id="meTest">
          {loading ? (
            <Loader />
          ) : token ? (
            <Box className="myTopNav" id="myTopNav">
              <Link href="/todo">Todo</Link>
              {!isMobile && (
                <>
                  <Link href="#">Notes</Link>
                  <Link href="#" mr={4}>FutureSelf</Link>{" "}
                </>
              )}
              <Button
                onClick={logoutHandler}
                fontSize="23px"
                bg="none"
                p={0}
                m={0}
                color="white"
                pr={1}
                _hover={{
                  bg: 'none',
                  color: 'white'
                }}
              >Log out</Button>
              <button className="icon" onClick={responsiveMenu}>
                <img src={Menu} alt="menu" />
              </button>
            </Box>
          ) : (
            <Link href="/auth" className="unAuthButton">
              Sign In|Up
            </Link>
          )}
        </Flex>
      </Box>
    </header>
  )
}

export default Header

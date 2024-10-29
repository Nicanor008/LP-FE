import { Link } from "gatsby"
import React from "react"
import { Box, Divider, Flex, Image } from "@chakra-ui/react"
import "../NavBar/header.scss"
import "../../styles/_common.scss"
import LP from "../../../../images/LP.svg"
import "./footer.scss"

const Footer = () => (
  <Box className="footer" bg="#ccceff" w="100vw" overflow="visible" zIndex={1000}>
    <Divider color="red" bg="blue" />
    <Flex className="container navMenuWrapper footerDetails" flexDir={["column", "row"]}>
      <Link to="/">
        <Image src={LP} alt="logo" />
      </Link>
      &nbsp;
      <p>&copy;{new Date().getFullYear()} <span className="divider">|</span> </p>
      <p>Privacy <span className="divider">|</span> </p>
      <p>Terms And Conditions</p>
    </Flex>
  </Box>
)

export default Footer

import React  from "react"
import PropTypes from "prop-types"

import "./layout.css"
import Header from "./common/nav/header"
import Footer from "./common/nav/footer"
import { Box } from "@chakra-ui/react"

const Layout = ({ height, children, isDashboard }) => {

  return (
    <Box>
      <Header isDashboard={isDashboard} />
      <main style={{ height }}>{children}</main>
      <Footer />
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import { Box } from "@chakra-ui/react"
import React  from "react"
import PropTypes from "prop-types"
import {Header, Footer} from "./common"
import "./layout.css"

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

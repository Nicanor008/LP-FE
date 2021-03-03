import React  from "react"
import PropTypes from "prop-types"

import "./layout.css"
import Header from "./common/nav/header"
import Footer from "./common/nav/footer"

const Layout = ({ height, children }) => {

  return (
    <div>
        <Header />
        <main style={{ height }}>{children}</main>
        <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

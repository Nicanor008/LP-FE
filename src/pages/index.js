import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import LandingPage from "../components/LP/LandingPage"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" description="LP todo Home page" />
    <LandingPage />
  </Layout>
)

export default IndexPage

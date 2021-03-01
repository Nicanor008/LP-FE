import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Version2LandingPage from "../components/LP/LandingPage/version2LandingPage"

const IndexPage = () => {
  return (
    <div>
        <Layout>
          <SEO title="Home Learning Pattern" description="LP todo Home page" />
          <Version2LandingPage />
        </Layout>
    </div>
  )
}

export default IndexPage

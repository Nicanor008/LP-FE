import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import LandingPage from "../components/LP/LandingPage";

const IndexPage = () => (
  <div>
    <Layout>
      <SEO title="Home Learning Pattern" description="LP todo Home page" />
      <LandingPage />
    </Layout>
  </div>
);

export default IndexPage;

require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `LP`,
    description: `Learning Pattern is an advanced todo with auto generated analytics.`,
    keywords: `LP, learning pattern, Learning-pattern, todo, todo-list, automated-todo, Nicanor Korir, todo analytics, todo time tracking, todo productivity, productivity, productivity tools, Nicanor Project, real time todo`,
    author: `Nicanor Korir`,
    // apiURL: "http://localhost:4001",
    apiURL: process.env.LP_PROD_API,
    weatherApiKey: process.env.WEATHER_API_KEY,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-175647805-1",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Learning Pattern`,
        short_name: `LP`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/title-logo.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

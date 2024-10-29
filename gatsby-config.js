require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `LP`,
    description: `Learning Pattern is an advanced todo with auto generated analytics.`,
    keywords: `LP, learning pattern, Learning-pattern, todo, todo-list, automated-todo, Nicanor Korir, todo analytics, todo time tracking, todo productivity, productivity, productivity tools, Nicanor Project, real time todo`,
    author: `Nicanor Korir`,
    apiURL: "http://localhost:4001",
    ipInfoAPIToken: "83684f7099807a",
    // ipInfoAPIToken: process.env.ipInfoAPIToken,
    // apiURL: process.env.LP_PROD_API,
    weatherApiKey: "f0c992e01a794c68b7b73844242010",
    // weatherApiKey: process.env.WEATHER_API_KEY,
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
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {number} [portalZIndex=undefined]
         * The z-index to apply to all portal nodes. This is useful
         * if your app uses a lot z-index to position elements.
         */
        portalZIndex: undefined,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

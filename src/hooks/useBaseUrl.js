import { graphql, useStaticQuery } from "gatsby"

export function useBaseUrl() {
    const data = useStaticQuery(graphql`
      query SiteTitleRQuery {
        site {
          siteMetadata {
            apiURL
          }
        }
      }
    `)
  
    const apiURL = data.site.siteMetadata.apiURL
    return apiURL
  }

import axios from "axios";
import { useStaticQuery, graphql } from "gatsby";

const server = typeof window !== "undefined"
  && axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });

export { server };

// get base url
export default function useBaseUrl() {
  const data = useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          apiURL
        }
      }
    }
  `);

  const { apiURL } = data.site.siteMetadata;
  return apiURL;
}

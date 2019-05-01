console.log(`Using environment config: '${process.env.GATSBY_ENV}'`);
const isProduction = process.env.GATSBY_ENV === "production";

const siteMetadata = {
  description: "",
  og_image: "",
  siteUrl: "http://www.naver.com",
  title: "",
  titleTemplate: "%s"
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `React`, // defaults to "React"
        allExtensions: true // defaults to false
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/logo.png"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        start_url: `/`,
        background_color: `#eee`,
        theme_color: `#eee`,
        display: `standalone`,
        icon: `src/images/logo.png`,
        include_favicon: true
      }
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }]
          },
          staging: {
            policy: [{ userAgent: "*", disallow: ["/"] }]
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }]
          }
        },
        resolveEnv: () => process.env.GATSBY_ENV
      }
    }
  ]
};

import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

interface ISEOProps {
  description?: string;
  lang: string;
  meta: any[];
  keywords: string[];
  title?: string;
}

function SEO({ description, lang, meta, keywords, title }: ISEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            siteUrl
            og_image
          }
        }
      }
    `
  );
  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description;
  const metaUrl = site.siteMetadata.siteUrl;
  const metaImage = site.siteMetadata.og_image;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={metaTitle}
      titleTemplate={`%s`}
      meta={[
        {
          content: metaDescription,
          name: `description`
        },
        {
          content: metaTitle,
          property: `og:title`
        },
        {
          content: metaDescription,
          property: `og:description`
        },
        {
          content: metaUrl,
          property: `og:url`
        },
        {
          content: `Site Name`,
          property: `og:site_name`
        },
        {
          content: metaImage,
          property: `og:image`
        },
        {
          content: `website`,
          property: `og:type`
        },
        {
          content: `summary`,
          name: `twitter:card`
        },
        {
          content: "none",
          name: `twitter:creator`
        },
        {
          content: metaTitle,
          name: `twitter:title`
        },
        {
          content: metaDescription,
          name: `twitter:description`
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                content: keywords.join(`, `),
                name: `keywords`
              }
            : []
        )
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  keywords: [],
  lang: `en`,
  meta: []
};

export default SEO;

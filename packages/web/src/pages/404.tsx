import { PageRendererProps } from "gatsby";
import React from "react";

import Layout from "src/components/common/Layout";
import SEO from "src/components/common/SEO";

class NotFoundPage extends React.Component<PageRendererProps> {
  public render() {
    return (
      <Layout>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    );
  }
}

export default NotFoundPage;

import React from "react";
import styled from "styled-components";

import { test } from "@shared/test";

import Layout from "src/components/common/Layout";
import SEO from "src/components/common/SEO";

class IndexPage extends React.Component {
  public render() {
    return (
      <Layout>Hello WOrld{test()}</Layout>
    );
  }
}

export default IndexPage;

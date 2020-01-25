import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import RNText from "@shared/components/text/RNText/RNText.web";
import { test } from "@shared/sharedTest";

import Layout from "src/components/common/Layout";
import SEO from "src/components/common/SEO";
import { IStore } from "src/stores/Store";

interface IInject {
  store: IStore;
}

@inject(
  ({ store }: { store: IStore }): IInject => ({
    store
  })
)
@observer
class IndexPage extends React.Component<IInject> {
  public render() {
    const { todoTest } = this.props.store.todoStore;
    return (
      <Layout>
        <RNText>RNText Shared</RNText>
        Hello WOrld{test()}
        {todoTest}
      </Layout>
    );
  }
}

export default IndexPage;

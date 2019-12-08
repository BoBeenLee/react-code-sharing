import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { test } from "@shared/test";

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
      <Layout>Hello WOrld{test()}{todoTest}</Layout>
    );
  }
}

export default IndexPage;

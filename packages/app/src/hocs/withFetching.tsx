import hoistNonReactStatic from "hoist-non-react-statics";
import React, { Component } from "react";
import styled from "styled-components/native";

export enum FetchingStatus {
  LOADING = "LOADING",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED"
}

export interface IFetchingProps {
  wrapperFetching?: (
    func: any,
    params: { [key in FetchingStatus]: React.ReactNode }
  ) => any;
  fetchingStatus?: FetchingStatus;
}

const withFetching = () => <P extends object>(
  TargetComponent: React.ComponentType<P>
): any => {
  class WithFetching extends Component<Subtract<P, IFetchingProps>> {
    public render() {
      return (
        <React.Fragment>
          <TargetComponent
            {...(this.props as P)}
            wrapperFetching={this.wrapperFetching}
          />
        </React.Fragment>
      );
    }

    private wrapperFetching = (func: any) => {
      return async (...args: any[]) => {
        return await func(...args);
      };
    };
  }
  hoistNonReactStatic(WithFetching, TargetComponent);
  return WithFetching;
};

export default withFetching;

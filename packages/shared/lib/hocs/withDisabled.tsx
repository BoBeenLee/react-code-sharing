import hoistNonReactStatic from "hoist-non-react-statics";
import React from "react";
import { uniqueId as sharedUniqueId } from "@shared/utils/common";

interface IProps {
  componentId: string;
}

export interface IDisabledProps {
  isDiabledUniqueId: (uniqueId: string) => boolean;
  wrapperDisabled: (func: any, uniqueId?: string) => any;
}

const withDisabled = <T extends IDisabledProps, P>(
  TargetComponent: React.ComponentType<T> & P
) => {
  class WithDisabled extends React.PureComponent<T & IProps> {
    public disabledUniqueIds: { [key in string]: boolean };

    constructor(props: T & IProps) {
      super(props);
      this.disabledUniqueIds = {};
    }

    public render() {
      return (
        <TargetComponent
          {...(this.props as any)}
          wrapperDisabled={this.wrapperDisabled}
          isDiabledUniqueId={this.isDiabledUniqueId}
        />
      );
    }

    private wrapperDisabled = (
      func: any,
      uniqueId: string = sharedUniqueId("disabled")
    ) => {
      this.disabledUniqueIds[uniqueId] = false;
      return async (...args: any[]) => {
        const disabled = this.disabledUniqueIds[uniqueId];
        if (disabled) {
          return;
        }
        this.disabledUniqueIds[uniqueId] = true;
        try {
          return await func(...args);
        } finally {
          this.disabledUniqueIds[uniqueId] = false;
        }
      };
    };

    private isDiabledUniqueId = (uniqueId: string) => {
      return Boolean(this.disabledUniqueIds[uniqueId]);
    };
  }

  return hoistNonReactStatic(WithDisabled, TargetComponent);
};

export default withDisabled;

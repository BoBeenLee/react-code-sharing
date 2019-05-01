import React, { Component } from "react";

interface ILayoutProps {
  layoutStyle?: any;
  mainStyle?: any;
  className?: string;
}

class Layout extends Component<ILayoutProps> {
  public render() {
    return (
      <div style={this.props.layoutStyle} className={this.props.className}>
        <main style={this.props.mainStyle}>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;

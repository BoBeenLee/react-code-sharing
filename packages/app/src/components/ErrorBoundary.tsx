import React, { ErrorInfo, ReactElement } from "react";

interface IProps {
  renderFallback: (error: Error, errorInfo: ErrorInfo) => React.ReactNode;
  children: React.ReactNode;
}

interface IStates {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  public render() {
    const { renderFallback } = this.props;
    const { error, errorInfo } = this.state;

    if (error) {
      return renderFallback(error, errorInfo!);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

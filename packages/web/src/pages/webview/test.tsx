import React, { Component } from 'react';

import { getReactNativeWebView } from "src/utils/webview";

class Test extends Component {
    public componentDidMount() {
        getReactNativeWebView({ test: "hello world" });
    }

    public render() {
        return (
            <div>
                Hello World
                Hello World
            </div>
        );
    }
}

export default Test;
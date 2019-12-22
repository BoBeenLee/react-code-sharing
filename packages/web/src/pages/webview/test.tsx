import React, { Component } from 'react';

import { IMessagePayload, IPayload } from "@shared/webviews/test";
import { getReactNativeWebView } from "src/utils/webview";

class Test extends Component {
    constructor(props: any) {
        super(props);

        window.addEventListener("message", this.onMessage);
    }
    public componentDidMount() {
        getReactNativeWebView<IPayload>({ test: "hello world" });
    }

    public render() {
        return (
            <div>
                Hello World
                Hello World
            </div>
        );
    }

    private onMessage = (message: MessageEvent) => {
        console.log(message.data as IMessagePayload);
    }
}

export default Test;
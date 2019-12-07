import React, { Component } from 'react';
import { WebView } from "react-native-webview";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import { routes } from "src/configs/webview";

class TestWebview extends Component {
    public render() {
        return (
            <WebView
                style={{ width: 300, height: 300 }}
                source={{ uri: routes.test }}
                javaScriptEnabled={true}
                onMessage={this.onMessage}
            />
        );
    }

    private onMessage = (event: WebViewMessageEvent) => {
        const { data } = event.nativeEvent;
        console.tron.log(data);
    };
}

export default TestWebview;
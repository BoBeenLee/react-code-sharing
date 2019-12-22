import React, { Component } from 'react';
import { WebView } from "react-native-webview";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import styled from "styled-components/native";

import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import RNWebview from "src/components/RNWebview";
import { routes } from "src/configs/webview";

const Content = styled(RNWebview)`
    width: 300px;
    height: 300px;
`;

class TestWebview extends Component {
    public webview = React.createRef<WebView>();

    public render() {
        return (
            <ContainerWithStatusBar>
                <Content
                    onMessage={this.onMessage}
                    source={{ uri: routes.test }}
                />
            </ContainerWithStatusBar>
        );
    }

    private onMessage = (event: WebViewMessageEvent) => {
        const { data } = event.nativeEvent;
        // console.tron.log(data);
    };
}

export default TestWebview;
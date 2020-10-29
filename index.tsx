import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
    storeName: string;
    description: string;
    imageUrl: string;
    amount: number;
    currency: string;
    allowRememberMe: boolean;
    email: string;
    style?: object;
    onClose: () => void;
    onPaymentSuccess: (token: string) => void;
}

const jsCode = `(function() {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function(message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function() {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };

    window.postMessage = patchedPostMessage;
  })();`;


class ExpoStripePurchase extends React.Component<Props> {


  onClose = () => {
    // go back
    return;
  }

  onPaymentSuccess = async (token: string) => {
    // save token to backend
    // will close webview automatically (calls onClose())
    return await null;
  }
    
    render() {
    const props = this.props;
    return (
        <WebView
        originWhitelist={['*']}
        javaScriptEnabled={true}
        scrollEnabled={false}
        bounces={false}
        injectedJavaScript={jsCode}
        source={{ html: `<script src="https://checkout.stripe.com/checkout.js"></script>
            <script>
            var handler = StripeCheckout.configure({
            key: '// FILL HERE',
            image: '${props.imageUrl}',
            locale: 'auto',
            token: function(token) {
                window.ReactNativeWebView.postMessage(token.id, token.id);
            },
            });

            window.onload = function() {
            handler.open({
                name: 'SOTC',
                description: '${props.description}',
                image: '${props.imageUrl}',
                amount: ${props.amount},
                currency: 'USD',
                allowRememberMe: ${props.allowRememberMe},
                email: '${props.email}',
                closed: function() {
                  window.ReactNativeWebView.postMessage("WINDOW_CLOSED", "*");
                }
            });
            };
            </script>`, baseUrl: ''}}
        onMessage={event => event.nativeEvent.data === "WINDOW_CLOSED" ? props.onClose() : props.onPaymentSuccess(event.nativeEvent.data)}
        style={{ flex: 1, ...props.style }}
        scalesPageToFit={Platform.OS === 'android'}
    />
    );
    }
  };

  export default ExpoStripePurchase;
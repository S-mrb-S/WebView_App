import WebView from 'react-native-webview';

export const WebViewComponent = () => {
  const webViewScript = `
        // بدست آوردن تمام تگ‌های img
        var images = document.getElementsByTagName('img');

        // نمایش تمام عکس‌ها به صورت لیست
        for (var i = 0; i < images.length; i++) {
            window.ReactNativeWebView.postMessage(images[i].src);
        }

      setTimeout(function() { 
        window.ReactNativeWebView.postMessage('fuck her'); 
      }, 2500);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  return (
    <WebView
      source={{
        uri: `https://google.com`,
      }}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={false}
      onMessage={event => {
        // do something with `event.nativeEvent.data`
        console.log('You have message: ' + event.nativeEvent.data);
      }}
      javaScriptEnabled={true}
      injectedJavaScript={webViewScript}
      domStorageEnabled={true}
      style={{width: '100%', height: '90%'}}
    />
  );
};

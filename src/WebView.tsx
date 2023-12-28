/**
 * MRB
 * @format
 */

import WebView from "react-native-webview";
import {
  WebViewNoScript,
  // WebViewScript_Intersect,
  WebViewScript_Mutation,
} from "../html_js";

export const WebViewComponent = ({ start }) => {
  
  const ScriptManager = (function () {
    if (start) {
      return WebViewScript_Mutation;
    }
    return WebViewNoScript;
  })();

  return (
    <WebView
      source={{
        uri: `https://google.com`,
      }}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={false}
      onMessage={(event) => {
        // do something with `event.nativeEvent.data`
        if (event.nativeEvent.data != "") {
          console.log("You have message: `" + event.nativeEvent.data + "`");
        }
      }}
      javaScriptEnabled={true}
      injectedJavaScript={ScriptManager}
      domStorageEnabled={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

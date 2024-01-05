import React, { useEffect } from 'react';
import WebView from 'react-native-webview';

import { scripts } from './scriptsManager';
import { arrayHandler_Add } from '../../Controller/HandleUrls_Message';
import { addLinkToData } from '../../Model/Storage/save';
import { fs } from '../../Model/System_fm/downloadFile';
import { defaultWeb } from '../../Public';
import { styles } from '../Styles';

//========================================================
/* WebView */
//========================================================
type WebViewType = {
  start: boolean;
  arrayRef: React.MutableRefObject<string[]>;
  scriptType?: number;
};
/**
 * WebView screen
 * @param param0 useState (Start)
 * @returns WebView Screen
 */
export default function ({ start, arrayRef, scriptType = 0 }: WebViewType): React.JSX.Element {
  const ScriptManager = scripts(start, scriptType);

  // const printAndRemoveFirstItem = () => {
  //   if (arrayRef.current.length > 0) {
  //     const firstItem = arrayRef.current[0];
  //     if (firstItem !== null) {
  //       arrayRef.current.shift();
  //       return firstItem;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  // async function managerLinks() {
  //   const interval = setInterval(async () => {
  //     console.log('effect');
  //     const checkPP = printAndRemoveFirstItem();
  //     if (checkPP !== false) {
  //       const altd = await addLinkToData(checkPP);
  //       if (altd) fs(checkPP, Date.now() + '.png');
  //       alert('Error');
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }

  // useEffect(() => {
  //   if (start) {
  //     managerLinks();
  //   }
  // }, [start]);
  useEffect(() => {
    console.log('edited array!');
  }, [arrayRef.current]);

  return (
    <WebView
      source={{
        uri: defaultWeb,
      }}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={false}
      onMessage={event => {
        console.log('on message');
        if (event.nativeEvent.data !== '') arrayHandler_Add(arrayRef, event.nativeEvent.data);
      }}
      javaScriptEnabled
      injectedJavaScript={ScriptManager}
      domStorageEnabled
      style={styles.WebView}
    />
  );
}

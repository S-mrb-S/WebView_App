import React, { useState, useCallback, useEffect, useRef } from 'react';
import WebView from 'react-native-webview';

import { styles } from './Styles';
import { WebViewNoScript, WebViewScript_Intersect, WebViewScript_Mutation } from '../../html_js';
import { Handle_urls } from '../Controller/HandleUrls';
import { addLinkToData } from '../Model/Storage/save';
import { searchLinkInData } from '../Model/Storage/search';
import { fs } from '../Model/System_fm/downloadFile';
import { defaultWeb } from '../Public';

//========================================================
/* WebView */
//========================================================
// WebView screen
export default function ({ start }) {
  const [scriptType, setScriptType] = useState<number>(1);
  console.log('start: ' + start);
  const ScriptManager = (function () {
    if (start) {
      console.log('start: ' + start);
      if (scriptType === 1) return WebViewScript_Mutation;
      else return WebViewScript_Intersect;
    }
    return WebViewNoScript;
  })();

  const arrayRef = useRef<string[]>([]);
  console.log('items: ' + arrayRef.current);

  const arrayHandler_Add = useCallback(async (newItem: string) => {
    console.log('handler!');
    const check = await searchLinkInData(newItem);
    console.log('check: ' + check);
    if (!check)
      if (Handle_urls(arrayRef.current, newItem)) arrayRef.current = [...arrayRef.current, newItem];
      else console.log('exit');
  }, []);

  // const arrayHandler_Rmv = useCallback(newItem => {
  const printAndRemoveFirstItem = () => {
    if (arrayRef.current.length > 0) {
      const firstItem = arrayRef.current[0];
      if (firstItem !== null) {
        arrayRef.current.shift();
        return firstItem;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('effect');
      const checkPP = printAndRemoveFirstItem();
      if (checkPP !== false) {
        addLinkToData(checkPP);
        fs(checkPP, Date.now() + '.png');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WebView
      source={{
        uri: defaultWeb,
      }}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={false}
      onMessage={event => {
        console.log('on message');
        if (event.nativeEvent.data !== '') arrayHandler_Add(event.nativeEvent.data);
      }}
      javaScriptEnabled
      injectedJavaScript={ScriptManager}
      domStorageEnabled
      style={styles.WebView}
    />
  );
}

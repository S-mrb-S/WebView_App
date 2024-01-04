/**
 * MRB
 * @flow
 * @format
 */

import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { send_per } from './Model/Permissions/req';
import BottomSheet from './Screen/BottomSheet';
import BottomSheetFooter from './Screen/BottomSheetFooter';
import RootView from './Screen/RootView';
import WebViewComponent from './Screen/WebViewComponent';
import WebViewScreen from './Screen/WebViewScreen';

//========================================================
/* App */
//========================================================
export default function (): React.JSX.Element {
  const [granted, setGranted] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(true); //false
  console.log('Starter show: ' + granted);

  const setShowCallback = useCallback(
    (e: boolean) => {
      setGranted(e);
    },
    [granted]
  );

  useEffect(() => {
    send_per(setShowCallback);
  }, []);

  return (
    <SafeAreaProvider>
      <RootView>
        <WebViewScreen granted={granted}>
          <WebViewComponent start={start} />
        </WebViewScreen>
        <BottomSheet CustomFooter={BottomSheetFooter} />
      </RootView>
    </SafeAreaProvider>
  );
}

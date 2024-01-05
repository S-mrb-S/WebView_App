/**
 * MRB
 * @flow
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';

//========================================================
/* Screens And Component */
//========================================================
import { send_per } from './Model/Permissions/req';
import BottomSheet from './Screen/BottomSheet';
import BottomSheetFooter from './Screen/BottomSheet/Footer';
import RootView from './Screen/RootView';
import WebViewScreen from './Screen/WebView';
import WebViewComponent from './Screen/WebView/WebViewComponent';

/**
 * App
 * @returns React.JSX.Element
 */
export default function (): React.JSX.Element {
  const arrayRef = useRef<string[]>([]); // لیست لینک های دریافت شده از وب
  const [granted, setGranted] = useState<boolean>(true); // دسترسی برای ذخیره و دانلود
  const [start, setStart] = useState<boolean>(false); // شروع کننده کد های جاوااسکریپت
  const [scriptType, setScriptType] = useState<number>(1); // 0 | 1 | 2 | number   // نوع اسکریپت اجرایی

  async function req() {
    const ru = await send_per();
    if (!ru) setGranted(ru); // مجوز رد شده و صفحه بسته میشود
    // console.log('this is ru: ' + ru); // مجوز دارید و لاگ بگیرید
  }

  useEffect(() => {
    req(); // مجوز لازم دارید
  }, []);

  return (
    <RootView>
      <WebViewScreen granted={granted}>
        <WebViewComponent start={start} arrayRef={arrayRef} scriptType={scriptType} />
      </WebViewScreen>
      <BottomSheet CustomFooter={BottomSheetFooter} />
    </RootView>
  );
}

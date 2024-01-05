/**
 * WebView => onMessage
 */
import React from 'react';

import { Handle_urls } from './HandleUrls_Filter';
import { searchLinkInData } from '../Model/Storage/search';

/**
 * Handle Urls on WebView
 * @param arrayRef Ref
 * @param newItem New data
 * @returns boolean (!check << false)
 */
export async function arrayHandler_Add(
  arrayRef: React.MutableRefObject<string[]>,
  newItem: string
): Promise<boolean> {
  const check = await searchLinkInData(newItem);
  console.log('checker: ' + check);

  if (!check)
    if (Handle_urls(arrayRef.current, newItem)) arrayRef.current = [...arrayRef.current, newItem];
    else return false;
  else return false;
}

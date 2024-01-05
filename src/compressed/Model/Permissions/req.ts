import { requestPermissionsAsync } from 'expo-media-library';

import { check_per } from './check';

/**
 * Request
 * @returns boolean
 */
async function get_per(): Promise<boolean> {
  try {
    const Req = await requestPermissionsAsync();
    // جواب مجوز ارسال را بفرستید
    return Req.granted;
  } catch (e) {
    console.log(e);
    // مشکلی هست
    return false;
  }
}

/**
 * Send (check)
 * @returns boolean
 */
export async function send_per(): Promise<boolean> {
  const ss = await check_per(); // چک کننده
  // اگر مجوز نداشتید درخواست بدید
  if (!ss) {
    // مجوز ندارید و منتظر پاسخ درخواست ارسالی باشید
    const aa = await get_per();
    // جواب درخواست را ارسال کنید
    return aa;
  } else {
    // مجوز دارید
    return true;
  }
}

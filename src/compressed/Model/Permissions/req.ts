import { requestPermissionsAsync } from 'expo-media-library';

import { check_per } from './check';

/**
 * Request
 * @param setShowCallback Callback (boolean)
 */
export function get_per(setShowCallback: (e: boolean) => void) {
  requestPermissionsAsync()
    .then(async Req => {
      if (!Req.granted) {
        alert('reject'); // rejected
        setShowCallback(false);
      }
    })
    .catch(e => console.log(e));
}

/**
 * Send
 * @param setShowCallback Callback (boolean)
 */
export async function send_per(setShowCallback: (e: boolean) => void) {
  //   console.log('check per res: ' + (await check_per()));
  if (!(await check_per())) {
    get_per(setShowCallback);
    // console.log('per false! get_per() called');
  }
}

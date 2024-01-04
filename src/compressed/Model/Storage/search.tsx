import AsyncStorage from '@react-native-async-storage/async-storage';

import { storageKey_links } from '../../Public';

/**
 * Search link in data
 * @param searchLink Link (string)
 * @returns boolean
 */
export const searchLinkInData = async (searchLink: string): Promise<boolean> => {
  try {
    // گرفتن دیتای موجود از AsyncStorage
    const linksString = await AsyncStorage.getItem(storageKey_links);
    console.log('this is search: ' + linksString);

    if (linksString !== null) {
      // اگر دیتا وجود داشت، آن را به آرایه تبدیل کنید
      const linksArray = JSON.parse(linksString);

      // بررسی وجود لینک در آرایه
      const found = linksArray.includes(searchLink);
      console.log('data founded!');

      return found;
    }

    return false; // اگر دیتا وجود نداشت
  } catch (error) {
    console.error('Error searching link in data: ', error);
    return false; // در صورت خطا
  }
};

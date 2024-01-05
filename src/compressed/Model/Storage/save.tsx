import AsyncStorage from '@react-native-async-storage/async-storage';

import { storageKey_links } from '../../Public';

/**
 * Add new link to storage
 * @param newLink Link (string)
 * @returns bool
 */
export async function addLinkToData(newLink: string): Promise<boolean> {
  try {
    // گرفتن دیتای موجود از AsyncStorage
    const linksString = await AsyncStorage.getItem(storageKey_links);

    console.log(linksString);

    if (linksString !== null) {
      // اگر دیتا وجود داشت، آن را به آرایه تبدیل کنید
      const linksArray = JSON.parse(linksString);
      console.log('add ! ' + newLink);

      // اضافه کردن لینک جدید به آرایه
      linksArray.push(newLink);

      // ذخیره دیتای جدید با لینک جدید اضافه شده
      await AsyncStorage.setItem(storageKey_links, JSON.stringify(linksArray));
      console.log('New link added and data updated successfully!');
      return true;
    } else {
      // اگر دیتا وجود نداشت، یک آرایه جدید با لینک جدید ایجاد کنید و ذخیره کنید
      const newLinksArray = [newLink];
      await AsyncStorage.setItem(storageKey_links, JSON.stringify(newLinksArray));
      console.log('New link added and data created successfully!');
      return true;
    }
  } catch (error) {
    console.error('Error adding link to data: ', error);
    return false;
  }
}

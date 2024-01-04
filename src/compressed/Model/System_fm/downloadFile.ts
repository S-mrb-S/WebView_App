import { downloadAsync, documentDirectory } from 'expo-file-system';

import { save } from './saveAlbumTo';
/**
 * Download image
 * @param url Link
 * @param filename Random filename
 * @returns boolean
 */
export async function fs(url: string, filename: string): Promise<boolean> {
  try {
    const result = await downloadAsync(url, documentDirectory + filename);
    if (result.status !== 200) {
      alert('Error when downloading: 200');
      return false;
    } else {
      if (save(result.uri)) return true;
      else return false;
    }
  } catch (e) {
    alert('[fs] Error: ' + e);
    return false;
  }
}

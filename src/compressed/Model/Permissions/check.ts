import { getPermissionsAsync } from 'expo-media-library';

//========================================================
/* MediaLibrary And FileSystem */
//========================================================

/**
 * Check permissions
 * @returns boolean
 */
export async function check_per(): Promise<boolean> {
  try {
    const per = await getPermissionsAsync();
    return per.granted;
  } catch (error) {
    alert('Error: ' + error);
    return false;
  }
}

import {
  createAssetAsync,
  getAlbumAsync,
  createAlbumAsync,
  addAssetsToAlbumAsync,
} from 'expo-media-library';
import { Platform } from 'react-native';

import { nameFolder_Albums, copyAlbums } from '../../Public';
//========================================================
// Media and download
//========================================================
/**
 * Create and save album (pic)
 * @param uri Link
 * @returns boolean
 */
export async function save(uri: string): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const asset = await createAssetAsync(uri);
      const album = await getAlbumAsync(nameFolder_Albums);

      if (album == null) {
        await createAlbumAsync(nameFolder_Albums, asset, copyAlbums);
        console.log('new album, uri: ' + asset.uri);

        return true;
      } else {
        const albumC = await addAssetsToAlbumAsync([asset], album, copyAlbums);
        if (albumC) {
          console.log('save to album, locationNames: ' + album.locationNames);
        } else {
          console.log('album doesnt save');
        }

        return true;
      }
    } catch (error) {
      alert('[save] Error: ' + error);
      return false;
    }
  } else {
    alert('just android, ' + uri);
  }
}

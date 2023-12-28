import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export function get_per(Callback) {
  MediaLibrary.getPermissionsAsync()
    .then(async (Per) => {
      console.log("dir M: " + Per.granted);

      if (Per.granted) {
        // show startEr
        Callback(true)
      } else {
        MediaLibrary.requestPermissionsAsync()
          .then(async (Req) => {
            console.log("req: " + Req.granted);
          })
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
}

// download image
export async function fs(url: string, filename: string) {
  try {
    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + filename
    );

    if (result.status != 200) {
      alert("Error when downloading: 200");
    }

    save(result.uri);
  } catch (e) {
    alert("[fs] Error: " + e);
  }
}

//save album
async function save(uri: string) {
  if (Platform.OS === "android") {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("KK");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("KK", asset, false);
        console.log("new album, uri: " + asset.uri);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        console.log("save to album, locationNames: " + album.locationNames);
      }
    } catch (error) {
      alert("[save] Error: " + error);
    }
  } else {
    alert("just android, " + uri);
  }
}

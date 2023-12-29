import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { fs, get_per } from "../fs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//bottomsheet
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

// expo fs
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export function get_per(Callback) {
  MediaLibrary.getPermissionsAsync()
    .then(async (Per) => {
      console.log("dir M: " + Per.granted);

      if (Per.granted) {
        // show startEr
        Callback(true);
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

//
// import { WebViewComponent } from "../WebView/index";
// import BottomSheet_Popup from "../Popup_Modal";

type StarterType = {
  Callback: any;
  start: boolean;
};

export function BottomSheet_Popup({ Callback, start }: StarterType) {
  // console.log(start)
  return (
    <View
      style={{
        height: 60,
        width: 60,
        backgroundColor: start ? "green" : "grey",
        borderRadius: 1000,
        borderTopEndRadius: 0,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        right: "5%",
        top: "10%",

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      <Pressable onPress={Callback}>
        <Text
          style={{
            color: start ? "yellow" : "#999",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          Setting
        </Text>
      </Pressable>
    </View>
  );
}

// webview
import WebView from "react-native-webview";
import {
  WebViewNoScript,
  // WebViewScript_Intersect,
  WebViewScript_Mutation,
} from "../html_js";
export const WebViewComponent = ({ start }) => {
  const ScriptManager = (function () {
    if (start) {
      return WebViewScript_Mutation;
    }
    return WebViewNoScript;
  })();

  return (
    <WebView
      source={{
        uri: `https://google.com`,
      }}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={false}
      onMessage={(event) => {
        // do something with `event.nativeEvent.data`
        if (event.nativeEvent.data != "") {
          console.log("You have message: `" + event.nativeEvent.data + "`");
        }
      }}
      javaScriptEnabled={true}
      injectedJavaScript={ScriptManager}
      domStorageEnabled={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// import BottomSheet from "../BottomSheet";
function WebView_C({ start }) {
  return <WebViewComponent start={start} />;
}

//
// import App from "../";

export default function (): React.JSX.Element {
  const [showStarter, setShowStarter] = useState<boolean>(false);
  // const [todos, setTodos] = useState<[]>([]);

  const [showModal, setShowModal] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);

  const changheStart = useCallback(() => {
    setStart((f) => !f);
  }, [start]);
  const changheModal = useCallback(() => {
    setShowModal((f) => !f);
  }, [showModal]);

  const changheShowStarter = useCallback(
    (val: boolean) => {
      console.log("granted and : " + val);
      setShowStarter(val);
    },
    [showStarter]
  );

  if (showStarter) {
    console.log("starter true!");
    // fs(
    //   "https://s.pinimg.com/webapp/HubBanner_mWeb_Beauty-199b84c2.png",
    //   "1.png"
    // );
  }

  useEffect(() => {
    get_per(changheShowStarter);
  }, []);

  // bottomsheet
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.container, styles.background]}>
        <StatusBar style="auto" animated translucent />
        <SafeAreaView style={styles.container}>
          <>
            <>
              <BottomSheet_Popup start={start} Callback={changheStart} />
              <WebView_C start={start} />
            </>
            <View style={styles.container}>
              {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} /> */}
              <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
              {/* <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}
              {/* <Button title="Close" onPress={() => handleClosePress()} /> */}
              <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
              >
                <BottomSheetFlatList
                  data={data}
                  keyExtractor={(i) => i}
                  renderItem={renderItem}
                  contentContainerStyle={styles.contentContainer}
                />
              </BottomSheet>
            </View>
          </>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  // bottomsheet

  bottomsheet_contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

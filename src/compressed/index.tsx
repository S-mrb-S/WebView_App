/**
 * MRB
 * @flow
 * @format
 */

import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetFooterProps,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Platform, Pressable } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { toRad } from 'react-native-redash';
import { SafeAreaView, useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import { WebViewNoScript, WebViewScript_Intersect, WebViewScript_Mutation } from '../html_js';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);
//========================================================
//========================================================
// types
// type StarterType = {
//   Callback: any;
//   start: boolean;
// };

// inherent the `BottomSheetFooterProps` to be able receive
// `animatedFooterPosition`.
interface CustomFooterProps extends BottomSheetFooterProps {}
//========================================================
//========================================================
// def value
const nameFolder_Albums: string = 'KK';
const copyAlbums: boolean = false;
const defaultWeb: string = `https://google.com`;
const positionBottomSheet: string[] = ['5%', '20%', '80%'];
//========================================================
/* MediaLibrary And FileSystem */
//========================================================
// Check permissions
async function check_per() {
  try {
    const per = await MediaLibrary.getPermissionsAsync();
    return per.granted;
  } catch (error) {
    alert('Error: ' + error);
  }
}
// Request
function get_per(setShowCallback) {
  MediaLibrary.requestPermissionsAsync()
    .then(async Req => {
      if (!Req.granted) {
        alert('reject');
        setShowCallback(false);
      }
    })
    .catch(e => console.log(e));
}
// Download image
async function fs(url: string, filename: string) {
  //save album
  async function save(uri: string) {
    if (Platform.OS === 'android') {
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.getAlbumAsync(nameFolder_Albums);

        if (album == null) {
          await MediaLibrary.createAlbumAsync(nameFolder_Albums, asset, copyAlbums);
          console.log('new album, uri: ' + asset.uri);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, copyAlbums);
          console.log('save to album, locationNames: ' + album.locationNames);
        }
      } catch (error) {
        alert('[save] Error: ' + error);
      }
    } else {
      alert('just android, ' + uri);
    }
  }
  try {
    const result = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + filename);

    if (result.status !== 200) {
      alert('Error when downloading: 200');
    }

    save(result.uri);
  } catch (e) {
    alert('[fs] Error: ' + e);
  }
}

const CustomFooter = ({ animatedFooterPosition }: CustomFooterProps) => {
  //#region hooks
  // we need the bottom safe insets to avoid bottom notches.
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  // extract animated index and other functionalities
  const { expand, collapse, animatedIndex } = useBottomSheet();
  //#endregion

  //#region styles
  // create the arrow animated style reacting to the
  // sheet index.
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    const arrowRotate = interpolate(
      animatedIndex.value,
      [0, 1],
      [toRad(0), toRad(-180)],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ rotate: `${arrowRotate}rad` }],
    };
  }, []);
  const arrowStyle = useMemo(() => [arrowAnimatedStyle, styles.arrow], [arrowAnimatedStyle]);
  // create the content animated style reacting to the
  // sheet index.
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(animatedIndex.value, [-2, 0], [0, 1], Extrapolate.CLAMP),
    }),
    [animatedIndex]
  );
  const containerStyle = useMemo(
    () => [containerAnimatedStyle, styles.container_footer],
    [containerAnimatedStyle]
  );
  //#endregion

  //#region callbacks
  const handleArrowPress = useCallback(() => {
    // if sheet is collapsed, then we extend it,
    // or the opposite.
    if (animatedIndex.value === 0) {
      expand();
    } else {
      collapse();
    }
  }, [expand, collapse, animatedIndex]);
  //#endregion

  return (
    <BottomSheetFooter
      // we pass the bottom safe inset
      bottomInset={bottomSafeArea}
      // we pass the provided `animatedFooterPosition`
      animatedFooterPosition={animatedFooterPosition}>
      <AnimatedRectButton style={containerStyle} onPress={handleArrowPress}>
        <Animated.Text style={arrowStyle}>⌃</Animated.Text>
      </AnimatedRectButton>
    </BottomSheetFooter>
  );
};

const BottomSheetScreen = () => {
  const snapPoints = useMemo(() => positionBottomSheet, []);
  const sheetRef = useRef<BottomSheet>(null);

  const BottomSheet_children = () => {
    // render
    const renderItem = useCallback(
      ({ item }) => (
        <View style={styles.itemContainer}>
          <Text>{item}</Text>
        </View>
      ),
      []
    );
    // variables
    const data = useMemo(
      () =>
        Array(50)
          .fill(0)
          .map((_, index) => `index-${index}`),
      []
    );

    return (
      <BottomSheetFlatList
        data={data}
        keyExtractor={i => i}
        renderItem={renderItem}
        contentContainerStyle={styles.bottomsheet_contentContainer}
      />
    );
  };

  return (
    <BottomSheet index={1} ref={sheetRef} snapPoints={snapPoints} footerComponent={CustomFooter}>
      <BottomSheet_children />
    </BottomSheet>
  );
};

// webview
const WebViewComponent = ({ start }) => {
  const [scriptType, setScriptType] = useState<number>(1);
  const ScriptManager = (function () {
    if (start) {
      if (scriptType === 1) return WebViewScript_Mutation;
      else return WebViewScript_Intersect;
    }
    return WebViewNoScript;
  })();

  return (
    <WebView
      source={{
        uri: defaultWeb,
      }}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={false}
      onMessage={event => {
        // do something with `event.nativeEvent.data`
        if (event.nativeEvent.data != '') {
          console.log('You have message: `' + event.nativeEvent.data + '`');
        }
      }}
      javaScriptEnabled
      injectedJavaScript={ScriptManager}
      domStorageEnabled
      style={styles.WebView}
    />
  );
};
const Screen = () => {
  const [start, setStart] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <WebViewComponent start={start} />
    </SafeAreaView>
  );
};

const RootView = ({ children }) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.container, styles.background]}>
        <StatusBar style="auto" animated translucent />
        {children}
      </View>
    </GestureHandlerRootView>
  );
};

async function send_per(setShowCallback) {
  console.log('check per res: ' + (await check_per()));
  if (!(await check_per())) {
    get_per(setShowCallback);
    console.log('per false! get_per() called');
  }
}

// App
export default function (): React.JSX.Element {
  const [granted, setGranted] = useState<boolean>(true);
  console.log('Starter show: ' + granted);

  const setShowCallback = useCallback(
    (e: boolean) => {
      setGranted(e);
    },
    [granted]
  );

  // if (granted) {
  //   console.log('starter true!');
  //   // fs(
  //   //   "https://s.pinimg.com/webapp/HubBanner_mWeb_Beauty-199b84c2.png",
  //   //   "1.png"
  //   // );
  // }

  useEffect(() => {
    send_per(setShowCallback);
  }, []);

  return (
    <SafeAreaProvider>
      <RootView>
        <Screen />
        <BottomSheetScreen />
      </RootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // App
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  // bottomsheet
  bottomsheet_contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  //footer
  container_footer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#80f',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,

    elevation: 8,
  },
  arrow: {
    fontSize: 20,
    height: 20,
    textAlignVertical: 'center',
    fontWeight: '900',
    color: '#fff',
  },

  // WebView
  WebView: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    backgroundColor: '#fff',
  },
});

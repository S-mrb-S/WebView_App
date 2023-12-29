/**
 * MRB
 * @flow
 * @format
 */

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button, Platform, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import {
  WebViewNoScript,
  WebViewScript_Intersect,
  // WebViewScript_Intersect,
  WebViewScript_Mutation,
} from '../html_js';

type StarterType = {
  Callback: any;
  start: boolean;
};

// global
const nameFolder_Albums: string = 'KK';
const copyAlbums: boolean = false;
const defaultWeb: string = `https://google.com`;

/* MediaLibrary And FileSystem */

// check permissions
function get_per(Callback) {
  try {
    MediaLibrary.getPermissionsAsync()
      .then(async Per => {
        console.log('dir M: ' + Per.granted);

        if (Per.granted) {
          // show startEr
          Callback(true); // قبول شده
        } else {
          MediaLibrary.requestPermissionsAsync()
            .then(async Req => {
              // قبول کرد
              console.log('req: ' + Req.granted);
            })
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e));
  } catch (error) {
    alert('Error');
  }
}

// download image
async function fs(url: string, filename: string) {
  try {
    const result = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + filename);

    if (result.status != 200) {
      alert('Error when downloading: 200');
    }

    save(result.uri);
  } catch (e) {
    alert('[fs] Error: ' + e);
  }
}

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

function BottomSheet_Popup({ Callback, start }: StarterType) {
  return (
    <View
      style={{
        height: 60,
        width: 60,
        backgroundColor: start ? 'green' : 'grey',
        borderRadius: 1000,
        borderTopEndRadius: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: '5%',
        top: '10%',

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}>
      <Pressable onPress={Callback}>
        <Text
          style={{
            color: start ? 'yellow' : '#999',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          Setting
        </Text>
      </Pressable>
    </View>
  );
}

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

// App
export default function (): React.JSX.Element {
  const [showStarter, setShowStarter] = useState<boolean>(false);
  // const [todos, setTodos] = useState<[]>([]);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);

  const changheStart = useCallback(() => {
    setStart(f => !f);
  }, [start]);
  const changheModal = useCallback(() => {
    setShowModal(f => !f);
  }, [showModal]);
  const changheShowStarter = useCallback(
    (val: boolean) => {
      console.log('granted and : ' + val);
      setShowStarter(val);
    },
    [showStarter]
  );

  if (showStarter) {
    console.log('starter true!');
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
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
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
              <WebViewComponent start={start} />
            </>
            <View style={styles.container}>
              {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} /> */}
              <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
              {/* <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}
              {/* <Button title="Close" onPress={() => handleClosePress()} /> */}
              <BottomSheet ref={sheetRef} snapPoints={snapPoints} onChange={handleSheetChange}>
                <BottomSheetFlatList
                  data={data}
                  keyExtractor={i => i}
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

  // WebView
  WebView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

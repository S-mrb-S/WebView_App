import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WebViewComponent } from "./src/WebView/index";
import { Starter } from "./src/StartDownload";
import { SafeAreaView } from "react-native-safe-area-context";
import { fs, get_per } from "./src/fs";

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function (): React.JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [showStarter, setShowStarter] = useState<boolean>(false);
  // const [todos, setTodos] = useState<[]>([]);

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

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["5%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" animated translucent />
        <SafeAreaView style={{ flex: 1 }}>
          <WebViewComponent start={start} />
          <Starter start={start} Callback={changheStart} />
        </SafeAreaView>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{ backgroundColor: "grey" }}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

import React, { useCallback, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WebViewComponent } from "./src/WebView";
import { Starter } from "./src/StartDownload";
import { SafeAreaView } from "react-native-safe-area-context";
import { fs, get_per } from "./src/fs";

export default function (): React.JSX.Element {
  const [start, setStart] = useState<boolean>(false);
  const [showStarter, setShowStarter] = useState<boolean>(false);
  // const [todos, setTodos] = useState<[]>([]);

  const changheStart = useCallback(() => {
    setStart((f) => !f);
  }, [start]);
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" animated translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <WebViewComponent start={start} />
        <Starter start={start} Callback={changheStart} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

import React, {useCallback, useState} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WebViewComponent } from "./src/WebView";
import { Starter } from "./src/StartDownload";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function (): React.JSX.Element {
  const [start, setStart] = useState<boolean>(false);
  const [todos, setTodos] = useState<[]>([]);

  // const increment = () => {
  //   setStart(true);
  // };
  const changheStart = useCallback(() => {
    // setTodos((t) => [...t, "New Todo"]);
    // console.log('changhe')
    setStart((f) => !f)
  }, [todos, start]);

  console.log(start)
  return (
    <View style={styles.container}>
      <StatusBar style="auto" animated translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <WebViewComponent />
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

/**
 * MRB
 * @format
 */
import React from "react";
import { Text, View, Pressable } from "react-native";

type StarterType = {
  Callback: any,
  start: boolean
}

export const Starter = ({Callback, start}: StarterType) => {
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
        <Text style={{ color: start ? "yellow" : "#999", fontSize: 12, fontWeight: 'bold' }}>StartEr</Text>
      </Pressable>
    </View>
  );
};

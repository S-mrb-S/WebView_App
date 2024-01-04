import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { styles } from './Styles';

// Handler
export default function ({ children }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.container, styles.background]}>
        <StatusBar style="auto" animated translucent />
        {children}
      </View>
    </GestureHandlerRootView>
  );
};

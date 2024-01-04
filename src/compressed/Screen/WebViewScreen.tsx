import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './Styles';

// SafeAreaView for WebView
export default function ({ children, granted }) {
  if (!granted)
    return (
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={{ fontSize: 20 }}>No permissions</Text>
      </View>
    );
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../Styles';

/**
 * WebView Screen (SafeAreaView for WebView)
 * @param param0 granted (permission)
 * @returns React.JSX.Element
 */
export default function ({ children, granted }): React.JSX.Element {
  if (!granted)
    return (
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={{ fontSize: 20 }}>No permissions</Text>
      </View>
    );
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

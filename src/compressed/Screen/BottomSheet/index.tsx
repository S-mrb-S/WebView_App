import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useMemo, useCallback, useRef } from 'react';
import { View, Text } from 'react-native';

import { positionBottomSheet } from '../../Public';
import { styles } from '../Styles';

// BottomSheet
export default function ({ CustomFooter }) {
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
}

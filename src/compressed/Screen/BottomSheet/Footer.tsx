import { BottomSheetFooter, BottomSheetFooterProps, useBottomSheet } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { toRad } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from '../Styles';
//========================================================
const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);
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
/* BottomSheet And Animation */
//========================================================
// Footer for BottomSheet (CustomFooter)
export default function ({ animatedFooterPosition }: CustomFooterProps) {
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
}

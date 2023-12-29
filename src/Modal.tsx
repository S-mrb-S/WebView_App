// import { StyleSheet, View, Modal, Pressable } from 'react-native';

// export default function Popup({ children, visible, transparent, dismiss, margin }) {
//   return (
//     <Modal
//       visible={visible}
//       transparent={transparent}
//       onRequestClose={dismiss}
//     >
//       <Pressable onPress={dismiss}>
//         <View style={styles.modalOverlay} />
//       </Pressable>

//       <View 
//         style={{
//           ...styles.modalContent,
//           margin: margin
//         }}
//       >
//         {children}
//       </View>
//     </Modal>
//   )
// }

// const styles = StyleSheet.create({
//   modalContent: {
//     justifyContent: "center",
//     marginVertical: "100%"
//   },
//   modalOverlay: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0,0,0,0.5)"
//   },
// });
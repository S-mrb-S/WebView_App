import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // App
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  // bottomsheet
  bottomsheet_contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  //footer
  container_footer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#80f',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,

    elevation: 8,
  },
  arrow: {
    fontSize: 20,
    height: 20,
    textAlignVertical: 'center',
    fontWeight: '900',
    color: '#fff',
  },

  // WebView
  WebView: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    backgroundColor: '#fff',
  },
});

/**
 * Code by Mehrab832
 * @format
 */
import { SafeAreaProvider } from 'react-native-safe-area-context';

import App from './src/compressed';

export default function () {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

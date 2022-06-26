/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AppNav from './src/core/navigation/appNav';
import { Provider } from 'react-redux';
import store, { persistor } from './src/core/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={[style.container, backgroundStyle]}>
          <AppNav />
        </SafeAreaView>
      </PersistGate>
    </Provider>

  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  }
})

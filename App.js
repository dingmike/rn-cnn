/*
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js1 to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
import React from 'react';
import {
  Provider
} from 'react-redux';
import configureStore from './src/store/Index';
import AppNavigation from "./src/navigations/Index";
import { StyleSheet, Text, View } from 'react-native';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
        // <View style={styles.container}>
        //   <Text>Open up App.js to start working on your app!</Text>
        // </View>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

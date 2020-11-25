import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import {Platform, StyleSheet} from 'react-native';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/persistStore'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';

export default function App(props) {
    // enableScreens(); // react-native-screens provides native primitives to represent screens instead of plain <View> components in order to better take advantage of operating system behavior and optimizations around screens.
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <SafeAreaProvider style={styles.container}>
                            <Navigation colorScheme={colorScheme} />
                            <StatusBar/>
                            {/*{Platform.OS === 'ios' && <StatusBar
                            animated={true}
                            backgroundColor="#61dafb"
                            barStyle="dark-content"/>}*/}
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

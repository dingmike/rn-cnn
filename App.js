import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { Camera } from 'expo-camera';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';
// Screen route
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

// pages route
import HomeDetail from "./screens/HomeDetail";
import NotFoundScreen from './screens/NotFoundScreen';
import ArticleDetail from "./screens/pages/ArticleDetail";
import HomeScreenNew from './screens/HomeScreenNew';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/persistStore'
// import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';

export default function App(props) {
    // enableScreens(); // react-native-screens provides native primitives to represent screens instead of plain <View> components in order to better take advantage of operating system behavior and optimizations around screens.
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    alert(colorScheme)
    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <SafeAreaProvider style={styles.container}>
                        <Navigation colorScheme={colorScheme} />
                        {Platform.OS === 'ios' && <StatusBar
                            animated={true}
                            backgroundColor="#61dafb"
                            barStyle="dark-content"/>}
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

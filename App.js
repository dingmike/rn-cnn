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
import { AppLoading } from 'expo';
// import { useFonts, Inter_900Black  } from '@expo-google-fonts/inter'; // https://fonts.google.com/
import {
    useFonts,
    NotoSerif_400Regular,
    NotoSerif_400Regular_Italic,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
} from '@expo-google-fonts/noto-serif';
export default function App(props) {
    // enableScreens(); // react-native-screens provides native primitives to represent screens instead of plain <View> components in order to better take advantage of operating system behavior and optimizations around screens.
    const isLoadingComplete = useCachedResources();
    let [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_400Regular_Italic,
        NotoSerif_700Bold,
        NotoSerif_700Bold_Italic,
    });
    const colorScheme = useColorScheme();

    if (!isLoadingComplete && !fontsLoaded) {
        // return null;
        return <AppLoading />;
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

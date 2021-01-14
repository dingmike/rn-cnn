import {StatusBar} from 'expo-status-bar';
import React, {Component, useState, useEffect, useRef} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/persistStore'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';
import AppLoading from 'expo-app-loading';
import {RootSiblingParent} from "react-native-root-siblings";
// import { useFonts, Inter_900Black  } from '@expo-google-fonts/inter'; // https://fonts.google.com/
import {
    useFonts,
    NotoSerif_400Regular,
    NotoSerif_400Regular_Italic,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
} from '@expo-google-fonts/noto-serif';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {requestData} from "./redux/actions/userAction";


// ios 上传push密钥到expo服务器 https://docs.expo.io/push-notifications/push-notifications-setup/#credentials
// 设置push notify accessToken   https://expo.io/settings/access-tokens


// 函数型组件
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
        return <AppLoading/>;
    } else {
        return (
            <Provider store={store}>
                <RootSiblingParent>
                    <PersistGate persistor={persistor}>
                        <SafeAreaProvider style={styles.container}>
                            <Navigation colorScheme={colorScheme}/>
                            <StatusBar/>
                            {/*{Platform.OS === 'ios' && <StatusBar
                            animated={true}
                            backgroundColor="#61dafb"
                            barStyle="dark-content"/>}*/}
                        </SafeAreaProvider>
                    </PersistGate>
                </RootSiblingParent>
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


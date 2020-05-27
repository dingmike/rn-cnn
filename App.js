import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/persistStore'


// import { Router, Scene, Modal, Lightbox } from 'react-native-router-flux'

const Stack = createStackNavigator();
import HomeDetail from "./screens/HomeDetail";

export default function App(props) {
    const isLoadingComplete = useCachedResources();
    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content"/>}
                        <NavigationContainer linking={LinkingConfiguration}>
                            <Stack.Navigator>
                                <Stack.Screen name="Root" component={BottomTabNavigator}/>
                                <Stack.Screen name="HomeDetail" component={HomeDetail}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </View>
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

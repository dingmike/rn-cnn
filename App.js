import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, Image} from 'react-native';

import useCachedResources from './hooks/useCachedResources';
// Screen route
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

// pages route
import HomeDetail from "./screens/HomeDetail";
import ArticleDetail from "./screens/pages/ArticleDetail";


import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/persistStore'

const Stack = createStackNavigator();


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
                                <Stack.Screen name="ArticleDetail" component={ArticleDetail}/>
                             {/*   {PageRouters.forEach(item => {
                                    console.log(item)
                                 return <Stack.Screen name={item.name} component={HomeDetail}/>
                                })}*/}
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

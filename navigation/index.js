/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-23 16:45
 */

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import LinkingConfiguration from "./LinkingConfiguration";
import BottomTabNavigator from "./BottomTabNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import AboutScreen from "../screens/AboutScreen";
import React from "react";
import {Button, View} from "react-native";

const Stack = createStackNavigator();

export default function Navigation({ colorScheme }) {

    return (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={BottomTabNavigator}/>
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
                <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
                {/*   {PageRouters.forEach(item => {
                                    console.log(item)
                                 return <Stack.Screen name={item.name} component={HomeDetail}/>
                                })}*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

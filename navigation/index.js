/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-23 16:45
 */

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LinkingConfiguration from "./LinkingConfiguration";
import BottomTabNavigator from "./BottomTabNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import React from "react";

const Stack = createStackNavigator();

export default function Navigation({ colorScheme }) {

    return (
        <NavigationContainer linking={LinkingConfiguration}
                             theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Root" component={BottomTabNavigator}/>
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
                {/*   {PageRouters.forEach(item => {
                                    console.log(item)
                                 return <Stack.Screen name={item.name} component={HomeDetail}/>
                                })}*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
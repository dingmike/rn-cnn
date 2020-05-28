import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HomeScreenNew from '../screens/HomeScreenNew';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html https://reactnavigation.org/docs/bottom-tab-navigator#!
    navigation.setOptions({headerTitle: getHeaderTitle(route)});

    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                activeTintColor: '#1ea2e9',
            }}>
            <BottomTab.Screen
                name="Home"
                component={HomeScreenNew}
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book"/>,
                }}
            />
            <BottomTab.Screen
                name="HomeNew"
                component={HomeScreen}
                options={{
                    title: 'Home2',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book"/>,
                }}
            />
            <BottomTab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Resources',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-person"/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'English Ability';
        case 'HomeNew':
            return 'How to get started';
        case 'Links':
            return 'Links to learn more';
    }
}

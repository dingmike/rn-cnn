/*import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
    // navigation.setOptions({headerTitle: getHeaderTitle(route)});

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
                    tabBarIcon: ({focused, color}) => <TabBarIcon color={color} focused={focused} name="md-book"/>,
                }}
            />
            <BottomTab.Screen
                name="HomeNew"
                component={HomeScreen}
                options={{
                    title: 'Home2',
                    tabBarIcon: ({focused, color}) => <TabBarIcon color={color} focused={focused} name="md-book"/>,
                }}
            />
            <BottomTab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Resources',
                    tabBarIcon: ({focused, color}) => <TabBarIcon color={color} focused={focused} name="md-person"/>,
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
}*/

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
// import TabOneScreen from '../screens/TabOneScreen';
// import TabTwoScreen from '../screens/TabTwoScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeScreenNew from '../screens/HomeScreenNew';
import LinksScreen from '../screens/LinksScreen';
import ArticleDetail from "../screens/pages/ArticleDetail";
// import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Alert, Button, Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {AntDesign} from '@expo/vector-icons';
// const BottomTab = createBottomTabNavigator();


const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Home';
export default function BottomTabNavigator({navigation, route}) {

    const colorScheme = useColorScheme();
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html https://reactnavigation.org/docs/bottom-tab-navigator#!
    //点击子页面时隐藏底部导航栏

    console.log(navigation)
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName)
    return (
        /* <BottomTab.Navigator
             initialRouteName={INITIAL_ROUTE_NAME}
             tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
             <BottomTab.Screen
                 name="Home"
                 component={TabOneNavigator}
                 options={{
                     tabBarIcon: ({ color, focused }) => <TabBarIcon focused={focused} color={color}  name="md-book" />,
                 }}
             />
             <BottomTab.Screen
                 name="My"
                 component={TabTwoNavigator}
                 options={{
                     tabBarIcon: ({ color, focused }) => <TabBarIcon focused={focused} color={color} name="md-person"/>,
                 }}
             />
         </BottomTab.Navigator>*/
        <Drawer.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <Drawer.Screen
                name="Home"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({color, focused}) => <TabBarIcon focused={focused} color={color} name="md-book"/>,
                }}
            />
            <Drawer.Screen
                name="My"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({color, focused}) => <TabBarIcon focused={focused} color={color} name="md-person"/>,
                }}
            />
        </Drawer.Navigator>
    );

}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabHomeStack = createStackNavigator();

function TabOneNavigator() {
    return (
        <TabHomeStack.Navigator>
            <TabHomeStack.Screen
                name="TabHomeScreen"
                component={HomeScreenNew}
                // options={{ headerTitle: 'English Ability' }}
                options={{
                    headerTitle: 'English Ability',
                    header: ({scene, previous, navigation}) => {
                        // should:  headerShown = true
                        const {options} = scene.descriptor;
                        const title =
                            options.headerTitle !== undefined
                                ? options.headerTitle
                                : options.title !== undefined
                                ? options.title
                                : scene.route.name;

                        return (
                                <View style={{
                                    width:  Dimensions.get('window').width,
                                    marginTop: 40,
                                    height: 56,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    alignItems: "center",
                                    justifyContent: 'flex-start',
                                    borderBottomColor: '#e2e0e0',
                                    borderBottomWidth: 1,
                                    shadowColor: 'black',  //  阴影颜色
                                    shadowOffset: { width: 0, height: 0 },  // 阴影偏移
                                    shadowOpacity: 1,  // 阴影不透明度
                                    shadowRadius: 4,  //  圆角
                                }}>
                                    <TouchableOpacity style={{
                                        padding: 10,
                                        marginTop: 5
                                    }} onPress={scene.descriptor.navigation.toggleDrawer}>
                                        <AntDesign name="bars" size={28} color="black"/>
                                    </TouchableOpacity>
                                    <View style={{
                                        padding: 10,
                                        marginTop: 5
                                    }}>
                                        <Text style={{fontSize: 20}}>{title}</Text>
                                    </View>

                                </View>
                            /*<View
                                title={title}
                                leftButton={
                                    previous ? <Button onPress={navigation.goBack} title={'hello'} /> : undefined
                                }
                                style={options.headerStyle}
                            />*/
                        );
                    },
                    /* headerLeft: ({ scene, previous, navigation }) => {
                         return (
                             <TouchableOpacity style={{padding: 10,
                                 marginTop: 5}} onPress={(scene)=> {
                                 navigation.openDrawer();
                             }}>
                                 <AntDesign name="bars" size={28} color="black" />
                             </TouchableOpacity>

                         )
                     },*/
                }}
            />
            <TabHomeStack.Screen name="ArticleDetail" component={ArticleDetail} options={{title: 'Detail'}}/>
        </TabHomeStack.Navigator>
    );
}

const TabMyStack = createStackNavigator();

function TabTwoNavigator() {
    return (
        <TabMyStack.Navigator>
            <TabMyStack.Screen
                name="TabMyScreen"
                component={HomeScreen}
                options={{headerTitle: 'English Ability'}}
            />
        </TabMyStack.Navigator>
    );
}

const styles = StyleSheet.create({

});
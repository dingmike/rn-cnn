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
import {
    Alert,
    Button,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    NativeModules,
    SafeAreaView, StatusBar
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
// const BottomTab = createBottomTabNavigator();
import Constants from "expo-constants";
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';

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
            drawerStyle={Dimensions.get('window').width >= 768  ? null : { width: '50%',  backgroundColor: '#fff', }}
            drawerType={Dimensions.get('window').width >= 768 ? 'permanent' : 'slide'}
            drawerContentOptions={{activeTintColor: Colors[colorScheme].tint,
                activeBackgroundColor: Colors[colorScheme].background, inactiveTintColor: Colors[colorScheme].inSelectText }}
            >
            <Drawer.Screen
                name="Home"
                component={TabOneNavigator}
                options={{
                    drawerIcon: ({color, focused}) => <TabBarIcon focused={focused} color={color} name="md-book"/>,
                }}
            />
           {/* <Drawer.Screen
                name="My"
                component={TabTwoNavigator}
                options={{
                    drawerIcon: ({color, focused}) => <TabBarIcon focused={focused} color={color} name="md-person"/>,
                }}
            />*/}
        </Drawer.Navigator>
    );

}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabHomeStack = createStackNavigator();
const styleTypes = ['default', 'dark-content', 'light-content'];

function TabOneNavigator() {
    const colorScheme = useColorScheme();
    return (
        <TabHomeStack.Navigator>
            <TabHomeStack.Screen
                name="TabHomeScreen"
                component={HomeScreenNew}
                // options={{ headerTitle: 'English Ability' }}
                options={{
                    headerTitle: 'English Ability',
                    headerStyle: {
                        backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                        color: colorScheme === 'dark' ? 'white' : 'black',
                        borderBottomColor: colorScheme === 'dark' ? '#505050' : '#ccc',
                        shadowColor:  colorScheme === 'dark' ? '#808080' : 'black',
                        borderBottomWidth: 1,
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        alignItems: "center",
                        justifyContent: 'flex-start',
                        width: Dimensions.get('window').width,
                        paddingTop: Constants.statusBarHeight + 10,
                        flexDirection: 'row',
                        // marginTop: 10,
                        elevation: 4, // android shadowbox
                    },
                    barStyle: colorScheme === 'dark' ? 'light-content' : 'dark-content',
                    header: ({scene, previous, navigation}) => {
                        const {options} = scene.descriptor;
                        const title =
                            options.headerTitle !== undefined
                                ? options.headerTitle
                                : options.title !== undefined
                                ? options.title
                                : scene.route.name;

                        return (
                            <SafeAreaView style={{
                                ...options.headerStyle
                            }}>
                                <StatusBar backgroundColor="white" barStyle={options.barStyle}/>
                                <TouchableOpacity style={{
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                    flex: 1,
                                    // marginTop: 5
                                }} onPress={scene.descriptor.navigation.toggleDrawer}>
                                    <AntDesign name="bars" size={28} color={options.headerStyle.color}/>
                                </TouchableOpacity>
                                <View style={{
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                    flex: 6,
                                    // marginTop: 5
                                    alignItems: "center",
                                }}>
                                    <Text style={{fontSize: 18, fontWeight: '500',
                                        color: options.headerStyle.color}}>{title}</Text>
                                </View>
                                <TouchableOpacity  style={{
                                    flex: 1,
                                    paddingBottom: 10,
                                    alignItems: "center",
                                    paddingHorizontal: 10,
                                }} onPress={()=>{
                                    // navigation
                                  navigation.navigate('About', {})
                                }}>
                                    <Ionicons
                                        name="md-information-circle"
                                        size={24}
                                        style={{ marginBottom: -3 }}
                                        // color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                                        color="#000"
                                    />
                                </TouchableOpacity>
                            </SafeAreaView>
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
    const colorScheme = useColorScheme();
    return (
        <TabMyStack.Navigator>
            <TabMyStack.Screen
                name="TabMyScreen"
                component={HomeScreen}
                options={{
                    headerTitle: 'My Center',
                    headerStyle: {
                        backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                        color: colorScheme === 'dark' ? 'white' : 'black',
                        borderBottomColor: colorScheme === 'dark' ? '#505050' : '#ccc',
                        shadowColor:  colorScheme === 'dark' ? '#808080' : 'black',
                        borderBottomWidth: 1,
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        alignItems: "center",
                        justifyContent: 'flex-start',
                        width: Dimensions.get('window').width,
                        paddingTop: Constants.statusBarHeight + 10,
                        flexDirection: 'row',
                        // marginTop: 10,
                        elevation: 4, // android shadowbox
                    },
                    header: ({scene, previous, navigation}) => {
                        const {options} = scene.descriptor;
                        const title =
                            options.headerTitle !== undefined
                                ? options.headerTitle
                                : options.title !== undefined
                                ? options.title
                                : scene.route.name;
                        return (
                            <SafeAreaView
                                          style={{
                                              ...options.headerStyle
                                          }}>
                                <StatusBar backgroundColor="white" barStyle={styleTypes[1]}/>
                                <TouchableOpacity style={{
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                    flex: 1,
                                    // marginTop: 5
                                }} onPress={scene.descriptor.navigation.toggleDrawer}>
                                    <AntDesign name="bars" size={28} color={options.headerStyle.color}/>
                                </TouchableOpacity>
                                <View style={{
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                    flex: 6,
                                    // marginTop: 5
                                    alignItems: "center",
                                }}>
                                    <Text style={{fontSize: 18, fontWeight: '500',
                                        color: options.headerStyle.color}}>{title}</Text>
                                </View>
                                <TouchableOpacity  style={{
                                    flex: 1,
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                }}>

                                </TouchableOpacity>
                            </SafeAreaView>
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
        </TabMyStack.Navigator>
    );
}

const styles = StyleSheet.create({});

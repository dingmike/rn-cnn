import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import HomeScreenNew from '../screens/HomeScreenNew';
import CenterScreen from "../screens/CenterScreen";
import ArticleDetail from "../screens/pages/ArticleDetail";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView, StatusBar
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import Constants from "expo-constants";
import {useSelector} from "react-redux";
import AboutPage from "../screens/pages/AboutPage";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
    // function component use redux state https://react-redux.js.org/api/hooks#useStore
    let userInfo = useSelector(state => state.userReducer.user);
    const colorScheme = useColorScheme();
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html https://reactnavigation.org/docs/bottom-tab-navigator#!
    //点击子页面时隐藏底部导航栏
    const routeName = getFocusedRouteNameFromRoute(route);
    return (
         <BottomTab.Navigator
             initialRouteName={INITIAL_ROUTE_NAME}
             tabBarOptions={{ activeTintColor: Colors[colorScheme].tabIconSelected, inactiveTintColor: Colors[colorScheme].tabIconDefault }}>
             <BottomTab.Screen
                 name="Home"
                 component={TabOneNavigator}
                 options={{
                     tabBarIcon: ({ color, focused }) => <TabBarIcon focused={focused} color={color}  name="md-book" />,
                     tabBarBadge: null,  // tip badges
                 }}
             />
             <BottomTab.Screen
                 name="More"
                 component={TabTwoNavigator}
                 options={{
                     tabBarIcon: ({ color, focused }) => <TabBarIcon focused={focused} color={color} name="ellipsis-horizontal-circle-sharp"/>,
                     tabBarBadge: null,
                 }}
             />
         </BottomTab.Navigator>
    );
}
// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab


// Home screen
const TabHomeStack = createStackNavigator();
const styleTypes = ['default', 'dark-content', 'light-content'];
function TabOneNavigator() {
    const colorScheme = useColorScheme();
    return (
        <TabHomeStack.Navigator>
            <TabHomeStack.Screen
                name="TabHomeScreen"
                component={HomeScreen}
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
                                {/*<TouchableOpacity style={{
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                    flex: 1,
                                    // marginTop: 5
                                }} onPress={scene.descriptor.navigation.toggleDrawer}>
                                    <AntDesign name="bars" size={28} color={options.headerStyle.color}/>
                                </TouchableOpacity>*/}
                                <View style={{
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                    flex: 24,
                                    // marginTop: 5
                                    alignItems: "center",
                                }}>
                                    <Text style={{fontSize: 18, fontWeight: '500',
                                        color: options.headerStyle.color}}>{title}</Text>
                                </View>
                                {/*<TouchableOpacity  style={{
                                    flex: 2,
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
                                        // color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                                        color="#000"
                                    />
                                </TouchableOpacity>*/}
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


// more screen
const TabMyStack = createStackNavigator();
function TabTwoNavigator() {
    const colorScheme = useColorScheme();
    return (
        <TabMyStack.Navigator>
            <TabMyStack.Screen
                name="TabMyScreen"
                component={CenterScreen}
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

                                <View style={{
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                    flex: 24,
                                    // marginTop: 5
                                    alignItems: "center",
                                }}>
                                    <Text style={{fontSize: 18, fontWeight: '500',
                                        color: options.headerStyle.color}}>{title}</Text>
                                </View>
                                {/*<TouchableOpacity  style={{
                                    flex: 1,
                                    paddingBottom: 10,
                                }}>
                                    <Ionicons name="settings-sharp"
                                              size={24}
                                              style={{ marginBottom: -3 }}
                                              color="black" />
                                </TouchableOpacity>*/}
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
            <TabMyStack.Screen name="About" component={AboutPage} options={{title: 'About'}}/>
        </TabMyStack.Navigator>

    );
}
const styles = StyleSheet.create({});

import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect, useRef } from 'react';
import {Platform, StyleSheet} from 'react-native';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';
import {connect, Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/persistStore'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import  AppLoading  from 'expo-app-loading';
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

// https://docs.expo.io/push-notifications/overview/
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// ios 上传push密钥到expo服务器 https://docs.expo.io/push-notifications/push-notifications-setup/#credentials
// 设置push notify accessToken   https://expo.io/settings/access-tokens

/*class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            expoPushToken: '',
            notification: '',
            notificationListener: useRef(),
            responseListener: useRef(),
        }
    }
    componentDidMount() {
        let {updateAppUserInfo} = this.props;

        registerForPushNotificationsAsync().then(token => {
            updateAppUserInfo({pushToken: token, platform: Platform.OS});
            this.setState({
                expoPushToken : token
            })
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        this.state.notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            this.setState({
                notification: notification
            })
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        this.state.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
            alert('response Listener')
            alert(response)
        });

        // Notifications.removeNotificationSubscription(this.state.notificationListener);
        // Notifications.removeNotificationSubscription(this.state.responseListener);
    }

    render() {
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
                    <RootSiblingParent>
                        <PersistGate persistor={persistor}>
                            <SafeAreaProvider style={styles.container}>
                                <Navigation colorScheme={colorScheme} />
                                <StatusBar/>
                                {/!*{Platform.OS === 'ios' && <StatusBar
                            animated={true}
                            backgroundColor="#61dafb"
                            barStyle="dark-content"/>}*!/}
                            </SafeAreaProvider>
                        </PersistGate>
                    </RootSiblingParent>
                </Provider>
            );
        }


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    let experienceId = undefined;
    if (!Constants.manifest) {
        // Absence of the manifest means we're in bare workflow
        experienceId = '@mikezhang/react-native-cnn';
    }
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({experienceId})).data;
        console.log(token);
        alert(token)
    } else {
        alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    alert(token)
    console.log('expoPushToken--------------------: ' + token)
    return token;
}

function mapStateToProps(state) {
    return {
        flag: state.userReducer.flag,
        user: state.userReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAppUserInfo(params) {
            dispatch(requestData(params));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);*/



// 函数型组件
export default function App(props) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

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
                <RootSiblingParent>
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
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    let experienceId = undefined;
    if (!Constants.manifest) {
        // Absence of the manifest means we're in bare workflow
        experienceId = '@mikezhang/react-native-cnn';
    }
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({experienceId})).data;
        console.log(token);
        alert(token)
    } else {
        alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    alert(token)
    console.log('expoPushToken--------------------: ' + token)
    return token;
}

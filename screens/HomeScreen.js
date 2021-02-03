import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Platform, Text, View, Button } from 'react-native';
import { styles } from '../style/homeStyle';
import {requestData} from '../redux/actions/userAction';
import ScrollableTabView, {ScrollableTabBar} from '../components/ScrollableTabView';
import TodayRead from "./pages/TodayRead";
import articleApi from "../apis/articleApi";
import CategoryRead from "./pages/CategoryRead";
import NetInfo from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import {updateNetInfoAsync} from "../redux/actions/commonAction";
import AllRead from "./pages/AllRead";

let unsubscribeNet = null;  // 网络监控
// https://docs.expo.io/push-notifications/overview/
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

class HomeScreen extends Component{
    constructor(props) {
        super(props);
        this.state ={
            count: 0,
            categories: [],
        }
    }

    render(){
        // const {navigate} = this.props.navigation;
        let {categories} = this.state;
        // 必须存在categories才能正常渲染scrollView
        if(categories.length !==0) {
            return (
                <ScrollableTabView
                    tabBarInactiveTextColor='#666' // 没有被选中的文字颜色
                    tabBarActiveTextColor='black'       // 选中的文字颜色
                    tabBarBackgroundColor='white'     // 选项卡背景颜色
                    tabBarUnderlineStyle={{backgroundColor:'#ffba40',height:2}}   //下划线的样式
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth:0, elevation:2}} tabStyle={{height: 37}}
                                                          underlineHeight={3}/>}>
                    <TodayRead tabLabel='Today Read' navigation={this.props.navigation}/>
                    <AllRead tabLabel='All' navigation={this.props.navigation}/>
                    {categories.map((item,index) => <CategoryRead key={index} tabLabel={item.category_name} navigation={this.props.navigation} category={item}/>)}
                </ScrollableTabView>
            );
        }else {
            return null
        }


    }
    componentDidUpdate(){
        console.log("componentDidUpdate1111---组件更新完毕");
    }
    shouldComponentUpdate(nextProps, nextState){
        if (this.state.categories !== nextState.categories) {
            console.log("shouldComponentUpdate---组件需要更新");
            return true;
        }
        return false;
    }
    async componentDidMount(){
        let { setNetInfoData, user, internetReachable, flag} = this.props;
        let {expoPushToken} = this.state;
        // 分类信息
        let response = await articleApi.allCategoryList();
        this.setState((prevState, pros) => ({
            categories: response.data
        }));
        unsubscribeNet =  NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            console.log('Is InternetReachable?', state.isInternetReachable);
            setNetInfoData(state.isConnected);
            if(state.isConnected){
                //有网络可达
                // this._onRefresh();
            }else{
                // EasyLoading.show('Network unavailable...', -1, 'type');
                this.toast.show('Network unavailable, check the network...', 3000);
                /*Alert.alert(
                    "Note",
                    "Network unavailable,check the network!",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );*/
            }
        });


    }
    async registerForPushNotificationsAsync() {
        let token;
        let experienceId = undefined;
        if (Constants.manifest !== null) {
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
            try {
                token = (await Notifications.getExpoPushTokenAsync({
                    experienceId,
                })).data;
                return new Promise((resolve, reject) => {
                    if(token) {
                        resolve(token)
                    }else{
                        reject(null)
                    }
                })
                // this.setState({ expoPushToken: token });
            } catch (e) {
                console.log(e)
            }

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
    };
}


class Blink extends Component {
    // 声明state对象
    state = { isShowingText: true };

    componentDidMount() {
        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({
                isShowingText: !this.state.isShowingText
            });
        }, 1000);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        if (!this.state.isShowingText) {
            return null;
        }

        return (
            <Text>{this.props.text}</Text>
        );
    }
}



function mapStateToProps(state){
    return {
        flag: state.userReducer.flag,
        user: state.userReducer.user,
        internetReachable: state.commonReducer.internetReachable,
    };
}
function mapDispatchToProps(dispatch){
    return {
        updateData: function(){
            dispatch(requestData());
        },
        setNetInfoData(params) {
            dispatch(updateNetInfoAsync(params))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}


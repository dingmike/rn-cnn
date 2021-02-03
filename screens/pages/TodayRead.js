import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import React, {Component, useRef} from 'react';
import {connect} from 'react-redux';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Alert,
    ImageBackground,
    FlatList,
    SectionList,
    StatusBar, Dimensions, SafeAreaView
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import MyButton from '../../components/MyButton';
import CardArticle from '../../components/CardArticle';
import LineCardArticle from '../../components/LineCardArticle';
import {ScrollView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import {MonoText} from '../../components/StyledText';

import {styles} from '../../style/homeScreenNewStyle';
import Constants from 'expo-constants';   // 常量

import userApi from "../../apis/userApi";
import articleApi from "../../apis/articleApi";

import HomeDetail from "../HomeDetail";

import {requestData} from '../../redux/actions/userAction';
import {requestData as getShowAdData, updateNetInfoAsync} from '../../redux/actions/commonAction';
import {ImageBackground as WebImageBackground} from "react-native-web";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync, isAvailableAsync,
} from 'expo-ads-admob';
// import * as SecureStore from 'expo-secure-store';
import SkeletonContent from 'react-native-skeleton-content';
import HomeLoadMoreFooter, {LOAD_MORE_STATE} from "../../components/HomeLoadMoreFooter";
import ToastExample from '../../components/ToastExample';
import * as Updates from 'expo-updates';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import {EasyLoading} from "../../components/EasyLoading";
import Toast, {DURATION} from "../../components/EasyToast";
import {color} from "../../style/common";
import myUtils from "../../utils/myUtils";

const adUnitID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-3940256099942544/2934735716',
    // https://developers.google.com/admob/android/test-ads
    // android: 'ca-app-pub-3940256099942544/6300978111',
    // android: 'ca-app-pub-8394017801211473/2911783388', // my unitID
    android: 'ca-app-pub-8394017801211473/9802994365', // my unitID EnglishAbility
});

class TodayRead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: 'top',
            toastPosition: 'bottom',
            style: {},
            expoPushToken: '',
            notification: '',
            notificationListener: '',
            responseListener:'',
            enableAdMod: false,
            loading: true,
            isRefreshing: false,            //控制下拉刷新
            isLoadMore: false,               //控制上拉加载
            currentPage: 1,             //当前请求的页数
            totalCount: 0,              //数据总条数
            sourceData: [],             //列表数据
            showFooter: LOAD_MORE_STATE.CANCEL,
            noMoreData:false,
            cardFontcolor: '',
        };
        this.bannerError = 'Ad error'
    }

    // get the first new article
    async getDataList() {
        // const {dispatch, goBack, navigate, setParams} = this.props.navigation;
        try {
            let response = await articleApi.allArticleList({
                page: this.state.currentPage,
                limit: 1,
                sortNum: -1,
                articleCate: []
            });
            console.log(response)
            this.setState({
                sourceData: response.data.docs,
                totalCount: response.data.total,
                loading: false,
                isRefreshing: false                 //有可能是下拉刷新
            })
        } catch (err) {
            // Alert.alert(err.message)
            this.setState({showFooter: LOAD_MORE_STATE.CANCEL});
        }
    }

    _goToDetail(item) {
        this.props.navigation.navigate('ArticleDetail', {...item})
    }

    componentWillUnmount(){
        // 我们不能在组件销毁后设置state，防止出现内存泄漏的情况
        // 在卸载的时候对所有的操作进行清除（例如：abort你的ajax请求或者清除定时器）
        this.setState = (state,callback)=>{
            return;
        };
        // unsubscribeNet(); // 不再监控网络
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*alert(JSON.stringify(this.props))
        // 网络可用的时候刷新数据
        if(this.props.internetReachable){
            this._onRefresh();
        }*/
    }

    async componentDidMount() {
        let {updateAppUserInfo, getShowAdStatus, setNetInfoData, user, showAd, internetReachable, flag} = this.props;
        let {expoPushToken} = this.state;
        await getShowAdStatus({activityName: 'showAd'}); // ad 状态
        // Set global test device ID
        // await setTestDeviceIDAsync('EMULATOR'); // test use admod
        // adMode 是否可用
        let enableAdMod = await isAvailableAsync();
        this.setState({
            loading: true,
            enableAdMod: enableAdMod && showAd
        });
        await this.getDataList();
    }
    render() {
        // const {navigate} = this.props.navigation;
        const {sourceData, loading} = this.state;
        console.log(this.state.sourceData)
        const shadowOpt = {
            width:160,
            height:170,
            color:"#00000",
            border:2,
            radius:3,
            opacity:0.2,
            x:0,
            y:3,
            style:{marginVertical:5}
        };
        return (
            <SafeAreaView style={styles.container}>

                     <View style={styles.headView}>
                        <View>
                            <Text key={Math.random()} selectable={true} style={styles.headerDes}>Read more, Learn more.</Text>
                        </View>
                    </View>

                    <View style={styles.articleList}>
                        <SkeletonContent
                            containerStyle={{
                                flex: 1,
                                width: '100%'}}
                            isLoading={loading}
                            animationType="shiver"
                            animationDirection="horizontalLeft"
                            boneColor="#dedede"
                            highlightColor="#f7f7f7"
                            layout={[
                                // {key: 'someId', width: Dimensions.get('window').width-40, height: 30, marginBottom: 10, marginLeft: 20, marginRight: 20},
                                {key: 'someOtherId1', width: Dimensions.get('window').width-40, height: 500, marginBottom: 18, marginLeft: 20, marginRight: 20, marginTop: 20},
                            ]}>
                            {sourceData.length>0 ?
                                <ScrollView style={{ flex:1,}}>
                                    <TouchableOpacity onPress={() => this._goToDetail(sourceData[0])} style={{flex:1, height: 500,width: Dimensions.get('window').width-40, marginLeft: 20, marginRight: 20, borderRadius: 8,}}>
                                        <ImageBackground style={{ flex: 1, justifyContent: 'space-between' }} imageStyle={{borderRadius: 8}}
                                                         source={{uri: sourceData[0].articleImg}}>
                                            <View style={{width: Dimensions.get('window').width-40, backgroundColor: '#2222226b', borderTopLeftRadius: 8, borderTopRightRadius: 8}} >
                                                <Text style={{ color: 'white',fontSize: 22,textAlign: 'left',paddingVertical: 10, paddingHorizontal: 20, fontWeight: "bold"}}>{sourceData[0].chinese_title}</Text>
                                            </View>
                                            <View>
                                                <View style={{
                                                    flexDirection: "row",
                                                    justifyContent: 'space-between',
                                                    paddingRight: 20,
                                                    marginTop: 50,
                                                    backgroundColor: '#2222226b',
                                                    borderBottomLeftRadius: 8,
                                                    borderBottomRightRadius: 8
                                                    // opacity: 0.7
                                                }}>
                                                    <View style={{
                                                        fontSize: 12,
                                                        padding: 10,
                                                        fontFamily: 'NotoSerif_400Regular'}}>
                                                        <Text style={{color: 'white'}}>{sourceData[0].articleCate.category_name} |
                                                            词数：{sourceData[0].wordNum}</Text>
                                                    </View>
                                                    <View style={{color: 'white',
                                                        fontSize: 12,
                                                        padding: 10,
                                                        fontFamily: 'NotoSerif_400Regular'}}>
                                                        <Text style={{ color: 'white',
                                                            fontFamily: 'NotoSerif_400Regular'}}>{myUtils.getEngDateTime(sourceData[0].deploy_time)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                  </TouchableOpacity>
                                </ScrollView>: null}
                        </SkeletonContent>
                    </View>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    return {
        flag: state.userReducer.flag,
        user: state.userReducer.user,
        showAd: state.commonReducer.showAd,
        internetReachable: state.commonReducer.internetReachable,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAppUserInfo(params) {
            dispatch(requestData(params));
        },
        getShowAdStatus(params) {
            dispatch(getShowAdData(params));
        },
        setNetInfoData(params) {
            dispatch(updateNetInfoAsync(params))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayRead);

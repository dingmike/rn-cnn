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

const adUnitID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-3940256099942544/2934735716',
    // https://developers.google.com/admob/android/test-ads
    // android: 'ca-app-pub-3940256099942544/6300978111',
    // android: 'ca-app-pub-8394017801211473/2911783388', // my unitID
    android: 'ca-app-pub-8394017801211473/9802994365', // my unitID EnglishAbility
});

class AllRead extends Component {

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
        };
        this.bannerError = 'Ad error'
    }

    async getDataList() {
        // const {dispatch, goBack, navigate, setParams} = this.props.navigation;
        try {
            // 请求接口，参数不用管；这里只需要主要  currentPage 和 pageSize即可 {page: 1, count: 2, type: 'video'}
            let response = await articleApi.allArticleList({
                page: this.state.currentPage,
                limit: 6,
                sortNum: -1,
                articleCate: []
            });
            if (0 === response.data.docs.length) {
                // 全部数据加载完成,显示没有更多数据
                this.setState({showFooter: LOAD_MORE_STATE.NO_MORE_DATA, noMoreData: true});
            } else {
                this.setState({showFooter: LOAD_MORE_STATE.CANCEL});
            }

            if (this.state.currentPage == 1) {
                this.setState({
                    sourceData: response.data.docs,
                    totalCount: response.data.total,
                    loading: false,
                    isRefreshing: false                 //有可能是下拉刷新
                })
            } else {
                this.setState({
                    sourceData: this.state.sourceData.concat(response.data.docs),
                    // loading: false,
                    isLoadMore: false               //关闭正在加载更多
                })
            }

            // 总数据量小于请求数据量
            if(response.data.total <= 5) {
                this.setState({showFooter: LOAD_MORE_STATE.CANCEL});
            }

        } catch (err) {
            // Alert.alert(err.message)
            this.setState({showFooter: LOAD_MORE_STATE.CANCEL});
        }
    }

    _onRefresh() {             // 下拉刷新
        // 正在上拉刷新，请求第一页
        this.setState({isRefreshing: true, currentPage: 1}, () => {
            this.getDataList();
            //利用setState的第二个参数，以便获取最新的state
        });
    }

    _goToDetail(item) {
        this.props.navigation.navigate('ArticleDetail', {...item})
    }

    // 渲染卡片
    renderItem = ({item,index}) => {
        if((index+1) % 4 === 0) {
            return (
                <View style={{
                    height: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                    backgroundColor: '#f3f4f6',
                }}>
                    {/*<Text style={{fontSize: 14, color: '#666666'}}>记得多多阅读哦！</Text>*/}
                    {this.state.enableAdMod ? <AdMobBanner
                        bannerSize="banner"
                        adUnitID={adUnitID} // ca-app-pub-3940256099942544/6300978111 Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds={false} // true or false
                        onDidFailToReceiveAdWithError={this.bannerError} /> : null}
                </View>
            )
        }else {
            return (
                <CardArticle articleItem={item} goToDetail={() => this._goToDetail(item)}
                             articleTotal={this.state.totalCount}
                             articleTitle={item.chinese_title}/>
            )
        }

    };

    _onEndReached() {//上拉加载更多
        if (this.state.showFooter !== LOAD_MORE_STATE.CANCEL || this.state.noMoreData) {
            return;
        }
        //正在加载中
        this.setState({showFooter: LOAD_MORE_STATE.REFRESHING});
        const {currentPage, totalCount, sourceData, isLoadMore} = this.state;
        if (sourceData.length < totalCount && !isLoadMore) {     //还有数据没有加载完，并且不是正在上拉加载更多
            this.setState({
                currentPage: currentPage + 1,             //加载下一页
                isLoadMore: true                        //正在加载更多
            }, () => {
                this.getDataList();          //利用setState的第二个参数，以便获取最新的state
            })
        }
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
        // 自定义android原生组件
       /* if(Platform.OS === 'android') {
            ToastExample.show('It\'s Awesome!', ToastExample.SHORT);
        }*/
        // this.toastWithStyle.show('It\'s Awesome!', 2000);
    }
    renderFooter = () => {
        return <HomeLoadMoreFooter state={this.state.showFooter}/>;
    };
    render() {
        // const {navigate} = this.props.navigation;
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
                    <View style={styles.articleList}>
                        <SkeletonContent
                            containerStyle={{
                                flex: 1,
                                width: '100%'}}
                            isLoading={this.state.loading}
                            animationType="shiver"
                            animationDirection="horizontalLeft"
                            boneColor="#dedede"
                            highlightColor="#f7f7f7"
                            layout={[
                                // {key: 'someId', width: Dimensions.get('window').width-40, height: 30, marginBottom: 10, marginLeft: 20, marginRight: 20},
                                {key: 'someOtherId1', width: Dimensions.get('window').width-40, height: 200, marginBottom: 18, marginLeft: 20, marginRight: 20, marginTop: 20},
                                {key: 'someOtherId2', width: Dimensions.get('window').width-40, height: 200, marginBottom: 18, marginLeft: 20, marginRight: 20},
                                {key: 'someOtherId3', width: Dimensions.get('window').width-40, height: 200, marginBottom: 18, marginLeft: 20, marginRight: 20}
                            ]}>
                            <FlatList
                                data={this.state.sourceData}
                                keyExtractor={(item, index) => item.id}
                                renderItem={this.renderItem}
                                ListFooterComponent={this.renderFooter}
                                ListEmptyComponent={<Text style={{
                                    textAlign: 'center',
                                    marginTop: 40,}}>暂无内容</Text>}
                                onEndReachedThreshold={0.5}
                                onEndReached={() => {
                                    this._onEndReached()
                                }}
                                ListHeaderComponent={
                                    <View style={{
                                        height: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // paddingLeft: 60,
                                        backgroundColor: '#f3f4f6',
                                    }}>
                                    </View>
                                }
                                onRefresh={() => {
                                    this._onRefresh()
                                }}
                                refreshing={this.state.isRefreshing}
                            />
                        </SkeletonContent>
                    </View>
                <Toast ref={toast => this.toast = toast} useNativeAnimation={true} position={this.state.position}/>
                <Toast ref={toast => this.toastWithStyle = toast} useNativeAnimation={true} style={{backgroundColor: '#a8a8a8'}} position={this.state.toastPosition}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllRead);

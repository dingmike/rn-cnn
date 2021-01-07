import {Ionicons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    Dimensions,
    Modal,
    Alert, TouchableHighlight, Appearance, SafeAreaView, Vibration, Platform
} from 'react-native';
import {WebView} from 'react-native-webview';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {requestData} from "../../redux/actions/userAction";
import {connect} from "react-redux";
import RNGeolocationView from '../../components/RNGeolocationView'
import OwnCamera from '../../components/OwnCamera'

import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import HTML from 'react-native-render-html';
import {Asset} from 'expo-asset';
import {Loading, EasyLoading} from '../../components/EasyLoading'
import SkeletonContent from 'react-native-skeleton-content';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
    isAvailableAsync,
} from 'expo-ads-admob';
import FacebookTabBar from '../../components/FacebookTabBar';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabView from '../../components/ScrollableTabView/index';
import {AntDesign, MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {voiceOfArticle} from '../../utils/wordToVoice'
import Dialog from '../../components/Dialog/index';
import { Audio } from 'expo-av';

import {
    Accelerometer,
    Barometer,
    Gyroscope,
    Magnetometer,
    MagnetometerUncalibrated,
    Pedometer,
} from 'expo-sensors';
import articleApi from "../../apis/articleApi";
import wordApi from "../../apis/word";
import useColorScheme from "../../hooks/useColorScheme";

/*function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}*/


/*
* 禁用webview中的文字选择
* 1.Use injectedJavascript to disable text selection
* const INJECTEDJAVASCRIPT = "document.body.style.userSelect = 'none'";
<WebView
  ...
  injectedJavaScript={INJECTEDJAVASCRIPT}
  ...
/>
* 2.Another way is just wrapping your webview in View Tag
* <View pointerEvents="none">
  <WebView
    source={{ uri: webviewUrl }}
    scrollEnabled={false}
  />
</View>
*
* */

const html = `
      <html>
      <head>
       <meta charset="utf-8">
       <meta name="color-scheme" content="light dark">
       <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1,user-scalable=0,viewport-fit=cover">
      </head>
      <style>
      .article-content-in {
                    width: 100%;
                    color: #000;
                    padding: 1vw 0;
                    font-size: 4.8vw;
                    line-height: 8vw;
                    font-family: nyt-cheltenham, georgia, 'times new roman', times, serif;
                    /*font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;*/
                    /*border-radius: 2vw;*/
                    /*padding: 1vw 2vw;*/
                    /*border: 1px solid #1cb5cc;*/

                }
              .article-content-in:first-letter {
                        float: left;
                        font-size: 17vw;
                        font-weight: bolder;
                        padding-right: 4px;
                        margin: 3.8vw 0 0 0;
                        /*text-transform: uppercase;*/
                        /*-webkit-text-transform: uppercase;*/
                    }

      </style>
      <body>
<!--        <h1>这是H5页面</h1>-->
<!--        <button onclick="sayHelloToApp()">sayHelloToApp</button>-->
        
           <p id="articleContentIn" class="article-content-in"
                               style="white-space: pre-line;">
                
           </p>
        <script>

            window.onload = function() {

                let u = navigator.userAgent; 
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                let isIOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
      
                    //这个是安卓操作系统
                    document.addEventListener("message", function(event) {
                         initArticle(event.data)          
                      });
                }
                if (isIOS) {
                　　//这个是ios操作系统
                 window.addEventListener("message", function(event) {
                      initArticle(event.data)     
                  });
                }
                
                
                function initArticle(data) {
                        data = data.replace(/\\b(\\w+?)\\b/g, '<span class="word" data-word="$1" onclick="queryWord(\\'$1\\', this)">$1</span>');
                        // 渲染article_content
                        document.getElementById('articleContentIn').innerHTML = data;    
                }
                // invoke the app method    
               window.queryWord = (word, dom) => {
                   // alert(word)
                    let data = {};
                    data.params={
                        word: word,
                    };
                    // 传递事件和数据到APP端
                   dom.style.color = 'red';
                   window.postMessage.queryWord(JSON.stringify(data));
               }
            
            }    
          
        </script>
      </body>
      </html>
    `;
/**
 * APP端注入JS脚本到H5端，供H5页面调用。
 * @type {string}
 */
const H5AppBridge = `
(function() {  
  document.body.style.userSelect = 'none';
  window.postMessage = {
      sayHello:function(data){
                let objData = {};
                // 声明事件类型。
                objData.type='sayHello';
                objData.data = JSON.parse(data);
                // 这里注意要把data转化为JSON字符串，postMessage()只接受字符串参数。
                window.ReactNativeWebView.postMessage(JSON.stringify(objData));
            },
      queryWord: function(data) {
                let objData = {};
                objData.type='queryWord';
                objData.data = JSON.parse(data);
                window.ReactNativeWebView.postMessage(JSON.stringify(objData));
          },      
      setHeight: function(data) {
                let objData = {};
                objData.type='setHeight';
                objData.data = JSON.parse(data);
                 window.ReactNativeWebView.postMessage(JSON.stringify(objData));
          }      
  }
  //高度获取
   var height = null;
  function changeHeight() {
    if (document.body.scrollHeight != height) {
      height = document.body.scrollHeight;
     if (window.postMessage.setHeight) {
            let data = {};
            data.params={
               height: height,
            };        
        window.postMessage.setHeight(JSON.stringify(data))
      }
    }
  }
  setInterval(changeHeight, 200);

})();
`;

const bannerAdUnitID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-3940256099942544/2934735716',
    // https://developers.google.com/admob/android/test-ads
    // android: 'ca-app-pub-3940256099942544/6300978111',
    android: 'ca-app-pub-8394017801211473/2911783388', // my unitID
});

const rewardAdUnitID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-3940256099942544/1712485313',
    // https://developers.google.com/admob/android/test-ads
    // android: 'ca-app-pub-3940256099942544/5224354917',
    android: 'ca-app-pub-8394017801211473/1901954049',  // my rewardID
});
class ArticleDetail extends Component {

// 对props 进行类型检测，如果使用typeScript有内置的
    static propTypes = {
        // eventListeners: PropTypes.arrayOf(PropTypes.object),
        // articleDetail: PropTypes.object.isRequired,
        // articleId: PropTypes.string.isRequired,
        // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // isStopped: PropTypes.bool,
        // isPaused: PropTypes.bool,
        // speed: PropTypes.number,
        // segments: PropTypes.arrayOf(PropTypes.number),
        // direction: PropTypes.number,
        // ariaRole: PropTypes.string,
        // ariaLabel: PropTypes.string,
        // isClickToPauseDisabled: PropTypes.bool,
        // title: PropTypes.string,
        // style: PropTypes.string,
    };

    constructor(props) {
        super(props);
        let {flag, user, jokerVideo, route} = this.props;
        this.state = {
            articleHeight: 60,
            photos: [],
            enableAdMod: false,
            wordDetail: {},
            articleId: route.params.id,
            articleDetail: {},
            modalVisible: false,
            alertModalVisible: false,
            resume: false,
            loading: true,
            playStatus: 'pause',
            checked: '1',
            sourceCheckedColor: {
                backgroundColor: 'green',
                color: 'white'
            },
            translateCheckedColor: {
                backgroundColor: 'white',
                color: 'black'
            },
            audio: [],
            showedAd: false,
        };
        this.bannerError = 'Ad error';
    }
    async componentWillUnmount() {
        if(this.state.audio.length !== 0) {
            await this.state.audio[this.state.audio.length - 1].stopAsync();
        }
        Dialog.hide(this.wordDialog);
    }
    async componentDidMount() {
        let {getShowAdStatus, showAd } = this.props;
        // adMode 是否可用
        let enableAdMod = await isAvailableAsync();

        // await setTestDeviceIDAsync('EMULATOR');
        // await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
        // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        // await AdMobInterstitial.showAdAsync();


        // let right = await SecureStore.isAvailableAsync()
        // alert(right)
        // SecureStore.setItemAsync('_ok', '2342234', {})
        // alert(ok)
        /*   SecureStore.getItemAsync('_ok', {}).then(res => {
               alert(res)
           })*/
        // let oknow =await SecureStore.getItemAsync('_ok', {})
        // alert(oknow)

        // EasyLoading.show('Loading...', -1, 'type');

        // EasyLoading.show('Loading...', -1, 'type'); // loading model
        this.setState({
            loading: true,
            enableAdMod: enableAdMod && showAd,
        })
        let response = await articleApi.articleDetail({
            id: this.state.articleId,
        });
        // EasyLoading.dismiss()
        this.setState({
            loading: false
        })

        this.setState({
            articleDetail: response.data
        })
        console.log(this.state.articleDetail.article_brief, '00000000000000000000000000000000000000000')
    }

    componentDidUpdate() {
    }

    // query word by dic
    async queryWordByNet(word) {
        let response = await wordApi.queryWord({
            word: word,
            source: 'own',
        });
        console.log(response.data)
        if (typeof (response.data) === 'string') {
            response.data = JSON.parse(response.data)
        }
        return response.data
        // this.setState({
        //     wordDetail: response.data
        // })
    }
    async speak(playStatus, content) {
        if (playStatus === 'play') {
            if (this.state.audio.length === 0) {
                voiceOfArticle(content, this.state.audio);
            } else {
                await this.state.audio[this.state.audio.length - 1].playAsync();
            }
            this.setState({playStatus: playStatus});
        } else if (playStatus === 'pause') {
            await this.state.audio[this.state.audio.length - 1].pauseAsync();
            this.setState({playStatus: playStatus});
        }
    }

    speakOld(playStatus, content) {
        // let thingToSay = 'hello world welcome to my home!';
        this.setState({playStatus: playStatus});
        if (playStatus === 'play') {
            if (!this.state.resume) {
                Speech.stop();
                Speech.speak(content);
            } else {
                Speech.resume();
            }
        } else if (playStatus === 'pause') {
            Speech.pause();
            this.setState({
                resume: true,
            })
        } else if (playStatus === 'refresh') {
            Speech.stop();
            Speech.speak(content);
            this.setState({playStatus: 'play', resume: false,});
        }
    }

    async changeTab({i, ref}) {
        // 暂时通过pay_person_num == 1 强制ad
        if (i === 1 && this.state.articleDetail.pay_person_num == 1) {
            this.setModalVisible(true)
        }
    }

    adMobEvent() {
      console.log('adMod event now!')
    }
    async _rewardVideo() {
        // reward ad
        // await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
        await AdMobRewarded.setAdUnitID(rewardAdUnitID); // My ID, Replace with your-admob-unit-id
        await AdMobRewarded.requestAdAsync({servePersonalizedAds: true});

        // rewardedVideoDidLoad rewardedVideoDidOpen rewardedVideoDidStart
        AdMobRewarded.addEventListener('rewardedVideoDidOpen', () => {
                // alert('You can close it! Press the top right close button!')
        });
        AdMobRewarded.addEventListener('rewardedVideoDidComplete', () => {
            this.setAlertModalVisible(true)
        });
        AdMobRewarded.addEventListener('rewardedVideoDidClose', () => {
            this.setAlertModalVisible(true)
        });
        await AdMobRewarded.showAdAsync();
    }
    setAlertModalVisible(visible) {
        this.setState((prevState, pros) => ({
            alertModalVisible: visible,
            showedAd: true // play reward video once
        }));
    }
    setModalVisible(visible) {
        // watch the ad video
        if (!visible && !this.state.showedAd && this.state.enableAdMod) {
            this._rewardVideo().then(res => {
                // android cannot callback
                this.setState({
                    showedAd: true
                })
            })
        }
        this.setState((prevState, pros) => ({
            modalVisible: visible
        }));
    }
    /**
     * h5 event to react-native with data
     * @param event
     * @private
     */
    _handleMessage(event) {
        const ONE_SECOND_IN_MS = 200;
        console.log("event.nativeEvent", event.nativeEvent);
        const message = event.nativeEvent;
        try {
            let objData = JSON.parse(message.data);
            let data = objData.data;
            // let data = JSON.parse(objData.data);
            console.log("data", data);
            switch (objData.type) {
                case 'sayHello':
                    let params = data.params;
                    if (params) {
                        alert("sayHello:" + params.msg);
                    }
                    break;
                case 'queryWord':
                    let word = data.params.word;
                    // Vibration.vibrate(1*ONE_SECOND_IN_MS);
                    if (word) {
                        this.queryWordByNet(word).then(res => {
                            // alert("queryWord:" + word);
                           this.wordDialog = Dialog.show(
                                {
                                    canPressShadow: true,
                                    msg:'查询单词',
                                    content: res,
                                    sureText: 'Close',
                                    sure: () => {
                                        console.log('sure')
                                    },
                                    cancel:() =>{
                                        console.log('cancel')
                                    },
                                }
                            );
                        })

                    }

                    break;
                case 'setHeight':
                    let height = data.params.height;
                    this.setState({
                        articleHeight: parseInt(height)
                    })
                    break;
                default:
                    break;
            }
        } catch (e) {
            // alert("调用APP方法参数错误！参数为：" + message.data);
            alert(JSON.stringify(e));
        }
    };
    /**
     * h5 web load end handle
     * @param null
     * @private
     */
    _handleOnloadEndWeb() {
        this.webview.postMessage(this.state.articleDetail.article_content);
    }
    _handleLoadError() {
        Alert.alert(
            "Tips",
            "load article error!",
            [
                { text: "Retry", onPress: () => this.props.navigation.goBack()}
            ]
        );
    }
    render() {
        const colorScheme = Appearance.getColorScheme();
        const {navigate} = this.props.navigation;
        const {articleDetail, checked, playStatus, modalVisible, showedAd, alertModalVisible, articleHeight} = this.state;
        // let {flag, user, jokerVideo, route} = this.props;
        // console.log(route.params.article_title)
        console.log(articleDetail.article_brief,'-----------------------')
        return (
            <SkeletonContent
                containerStyle={{
                    flex: 1,
                    width: Dimensions.get('window').width
                }}
                isLoading={this.state.loading}
                animationType="shiver"
                animationDirection="horizontalLeft"
                boneColor="#dedede"
                highlightColor="#f7f7f7"
                layout={[
                    {
                        key: 'tabs',
                        width: Dimensions.get('window').width - 20,
                        height: 40,
                        marginBottom: 16,
                        marginLeft: 10,
                        marginTop: 10,
                        marginRight: 10
                    },
                    {
                        key: 'title',
                        width: Dimensions.get('window').width - 20,
                        height: 50,
                        marginBottom: 18,
                        marginLeft: 10,
                        marginRight: 10
                    },
                    {
                        key: 'articlePlugin',
                        width: Dimensions.get('window').width - 20,
                        height: 65,
                        marginBottom: 18,
                        marginLeft: 10,
                        marginRight: 10
                    },
                    {
                        key: 'articlePhoto',
                        width: Dimensions.get('window').width - 20,
                        height: 200,
                        marginBottom: 18,
                        marginLeft: 10,
                        marginRight: 10
                    },
                    {
                        key: 'article',
                        width: Dimensions.get('window').width - 20,
                        height: 300,
                        marginBottom: 18,
                        marginLeft: 10,
                        marginRight: 10
                    },
                ]}>
                <ScrollableTabView
                    style={{marginTop: 2}}
                    initialPage={0}
                    onChangeTab={this.changeTab.bind(this)}
                    renderTabBar={() => <FacebookTabBar
                        style={{backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff'}}/>}
                >
                    <ScrollView tabLabel="Source" style={styles.tabView}>
                        <View style={{
                            ...styles.card,
                            backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff'
                        }}>

                            <View style={styles.articleTitle}>
                                <Text selectable={true} key={Math.random()} style={{
                                    ...styles.articleTitle,
                                    color: colorScheme === 'dark' ? '#a5a5a5' : 'black'
                                }}>{articleDetail.article_title}</Text>
                            </View>

                            <View style={styles.articlePlugin}>
                                <View style={styles.pluginBox}>
                                    <Text style={styles.articlePluginText}>Words: {articleDetail.wordNum}</Text>
                                </View>
                                <View style={styles.pluginBox}>
                                    <Text
                                        style={styles.articlePluginText}>Level: {articleDetail.article_grade + 1}</Text>
                                </View>

                                <View style={styles.pluginBox}>
                                    <Text style={styles.articlePluginText}>Tag: {articleDetail.articleTag}</Text>
                                </View>

                                <View style={styles.pluginBox}>
                                    <Text style={styles.articlePluginText}>Source: {articleDetail.article_author}</Text>
                                </View>
                                <View style={{
                                    ...styles.articleAudio,
                                    ...styles.pluginBox
                                }}>
                                    {playStatus === 'play' ?
                                        <TouchableOpacity style={styles.playAudio}
                                                          onPress={() => this.speak('pause', articleDetail.article_content)}>
                                            <AntDesign name="pausecircleo" size={28} color="green"/>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.playAudio}
                                                          onPress={() => this.speak('play', articleDetail.article_content)}>
                                            <AntDesign name="playcircleo" size={28} color="green"/>
                                        </TouchableOpacity>}
                                </View>
                            </View>

                            <View style={styles.articleBrief}>
                                <Text key={Math.random()} selectable={true} style={{
                                    fontSize: 14,
                                    fontFamily: 'NotoSerif_700Bold',
                                    // color: '#9a9a9a',
                                }}>
                                    {articleDetail.article_brief}
                                </Text>
                            </View>

                            <View style={styles.articleImageView}>
                                <Image
                                    style={styles.articleImg}
                                    source={{uri: articleDetail.articleImg}}
                                />
                            </View>

                            <View style={styles.articleContent}>
                                {/*<Text key={Math.random()} selectable={true} style={{
                                    fontSize: 18,
                                    // fontFamily: 'nyt-cheltenham',
                                    fontFamily: 'NotoSerif_400Regular',
                                    color: colorScheme === 'dark' ? '#a5a5a5' : 'black'
                                }}>
                                    {articleDetail.article_content}
                                </Text>*/}

                                <View style={{flex: 1}} >
                                    {/*<TouchableOpacity
                                        style={{
                                            height: 40,
                                            borderRadius: 20,
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#2988ff'
                                        }}
                                        onPress={() => {
                                            const webView = this.refs['webview_ref'];
                                            let params = {
                                                msg: '这是从RN端传来的消息'
                                            };
                                            // 注意：APP端传递参数到H5页面，要将对象转为JSON字符串
                                            // let jsCode = `window.sayHello && window.sayHello(${JSON.stringify(params)});`;
                                            let jsCode = `window.sayHello && window.sayHello(${JSON.stringify(articleDetail.article_content)});`;
                                            // 调用H5端的方法，并传递数据
                                            webView.injectJavaScript(jsCode);
                                        }}
                                    >
                                        <Text>
                                            sayHello
                                        </Text>
                                    </TouchableOpacity>*/}
                                    <WebView
                                        style={{ height: articleHeight, width: '100%'}}
                                        // ref={'webview_ref'}
                                        ref={webview => this.webview = webview}
                                        source={{html: html}}
                                        // 初始化webview注入全局代码
                                        injectedJavaScript={H5AppBridge}
                                        domStorageEnabled={true}
                                        scrollEnabled={false}
                                        scalesPageToFit={false}
                                        javaScriptEnabled={true}
                                        onLoadEnd={() => this._handleOnloadEndWeb()}
                                        onError={() => this._handleLoadError()}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        onNavigationStateChange={() => {}}
                                        onMessage={event => this._handleMessage(event)}
                                    />
                                </View>

                                <View style={{
                                    height: 52,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    marginBottom: 20,
                                    color: 'white',
                                    // backgroundColor: '#f3f4f6',
                                }}>
                                    {this.state.enableAdMod ? <PublisherBanner
                                        bannerSize="banner"
                                        adUnitID={bannerAdUnitID} // Test ID, Replace with your-admob-unit-id
                                        onDidFailToReceiveAdWithError={this.bannerError}
                                        onAdMobDispatchAppEvent={this.adMobEvent}/> : null}

                                </View>
                                {/*favour it!*/}
                                {/*<TouchableHighlight
                                    style={styles.openButton}
                                    onPress={() => {

                                    }}>
                                    <Text style={styles.textStyle}>Like it!</Text>
                                </TouchableHighlight>*/}

                            </View>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="Translation" style={styles.tabView}>
                        <View style={{
                            ...styles.card,
                            backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff'
                        }}>
                            <View>
                                <Text key={Math.random()} textSelectable={true} style={styles.articleTitle}>{articleDetail.article_title}</Text>
                            </View>
                            <HTML html={articleDetail.article_translate} textSelectable={true}
                                  imagesMaxWidth={Dimensions.get('window').width}/>
                            <View style={{
                                height: 52,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                                marginBottom: 20,
                                backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff'
                            }}>
                                {this.state.enableAdMod ? <PublisherBanner
                                    bannerSize="banner"
                                    adUnitID={bannerAdUnitID} // Test ID, Replace with your-admob-unit-id
                                    onDidFailToReceiveAdWithError={this.bannerError}
                                    onAdMobDispatchAppEvent={this.adMobEvent}/> : null}
                            </View>
                        </View>
                        {/* you should watch the reward vide first!*/}
                        <Modal
                            animationType="fade"
                            transparent={true}
                            hardwareAccelerated={true}
                            visible={modalVisible && !showedAd}
                            onRequestClose={() => {
                                this.setModalVisible(!modalVisible); // android back button close the modal.
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text key={Math.random()} style={styles.modalText}>Get the reward first, then back to
                                        translation!</Text>
                                    <TouchableHighlight
                                        style={{
                                            ...styles.openButton,
                                            backgroundColor: '#2196F3'
                                        }}
                                        onPress={() => {
                                            this.setModalVisible(!modalVisible);
                                        }}>
                                        <Text key={Math.random()} style={styles.textStyle}>Ok</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            hardwareAccelerated={true}
                            visible={alertModalVisible}
                            onRequestClose={() => {
                                 this.setAlertModalVisible(false)
                            }}>
                            <View style={styles.centeredView}>

                                <View style={styles.modalView}>
                                    <Text key={Math.random()} style={styles.modalText}>Thank you!</Text>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton,
                                            backgroundColor: '#2196F3' }}
                                        onPress={() => {
                                            this.setAlertModalVisible(false);
                                        }}>
                                        <Text key={Math.random()} style={styles.textStyle}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
                </ScrollableTabView>
            </SkeletonContent>
        );
    }
}

function mapStateToProps(state) {
    return {
        flag: state.userReducer.flag,
        user: state.userReducer.user,
        showAd: state.commonReducer.showAd,
        // jokerVideo: state.userReducer.jokerVideo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateData: function () {
            dispatch(requestData());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column', // 主轴Y
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
        // padding: 8,
    },
    header: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        height: 56,
        // borderColor: 'black',
        // borderWidth: 1,
        marginTop: 10,
        width: Dimensions.get('window').width,
        shadowOffset: {
            width: -2,
            height: 1
        },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    headerSource: {
        height: 46,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 10,
        // paddingBottom: 10,
        paddingHorizontal: 22,
        paddingVertical: 10,
        // padding: 12,
        // lineHeight: 46,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600'
    },
    headerTrans: {
        height: 46,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 10,
        // paddingBottom: 10,
        paddingHorizontal: 22,
        paddingVertical: 10,
        // padding: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10
    },
    refreshAudio: {
        // position: 'relative',
        // left: Dimensions.get('window').width / 2 - 90,
        // top: 10,
    },
    stopAudio: {
        // position: 'relative',
        // left: Dimensions.get('window').width / 2 - 120,
        // top: 10,
    },
    playAudio: {
        // position: 'relative',
        // left: Dimensions.get('window').width / 2 - 120,
        // top: 10,
    },
    content: {
        // flex: 12,
        height: 400,
        padding: 8,
        width: Dimensions.get('window').width
    },
    articleTitle: {
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
        fontWeight: 'bold',
        lineHeight: 26,
    },
    articlePlugin: {
        // height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center', // 属性定义项目在交叉轴上如何对齐
    },
    pluginBox: {
        paddingRight: 20,
    },
    articlePluginText: {
        fontSize: 14,
        color: '#9a9a9a',
        fontFamily: 'NotoSerif_400Regular',
    },
    articleAudio: {},
    articleBrief: {
        marginVertical: 10,
    },
    articleImageView: {
        // width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    articleImg: {
        width: '100%',
        height: '100%',
        // borderBottomLeftRadius: 8,
        // borderTopLeftRadius: 8,
        borderRadius: 8,
    },
    articleContent: {
        marginTop: 10,
        marginBottom: 40,
        // backgroundColor: '#f3f4f6',
    },


    tabView: {
        flex: 1,
        // padding: 10,
        // backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        // borderWidth: 1,
        // backgroundColor: '#fff',
        // borderColor: 'rgba(0,0,0,0.1)',
        // margin: 5,
        // height: 150,
        padding: 15,
        // shadowColor: '#ccc',
        // shadowOffset: { width: 2, height: 2, },
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
        // backgroundColor: '#000'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#f38624',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 100,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

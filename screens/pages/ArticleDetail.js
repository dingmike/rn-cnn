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
    Alert, TouchableHighlight, Appearance
} from 'react-native';
import {WebView} from 'react-native-webview';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {requestData} from "../../redux/actions/userAction";
import {connect} from "react-redux";
import RNGeolocationView from '../../components/RNGeolocationView'
import OwnCamera from '../../components/OwnCamera'
import {Video, Audio} from 'expo-av';
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


import {
    Accelerometer,
    Barometer,
    Gyroscope,
    Magnetometer,
    MagnetometerUncalibrated,
    Pedometer,
} from 'expo-sensors';
import articleApi from "../../apis/articleApi";
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
            photos: [],
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
        }
        this.bannerError = 'Ad error';
    }
    async componentWillUnmount() {
        await this.state.audio[this.state.audio.length - 1].stopAsync();
    }
    async componentDidMount() {
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
            enableAdMod: enableAdMod,
        })
        let response = await articleApi.articleDetail({
            id: this.state.articleId,
        });
        // EasyLoading.dismiss()
        this.setState({
            loading: false
        })
        console.log(response, 100)
        this.setState({
            articleDetail: response.data
        })
    }

    componentDidUpdate() {
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
        if (i === 1) {
            this.setModalVisible(true)
        }
    }

    adMobEvent() {
      console.log('adMod event now!')
    }
    async _rewardVideo() {
        // reward ad
        // await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
        await AdMobRewarded.setAdUnitID('ca-app-pub-8394017801211473/9105006274'); // My ID, Replace with your-admob-unit-id
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
        if (!visible && !this.state.showedAd) {
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

    render() {
        const colorScheme = Appearance.getColorScheme();
        const {navigate} = this.props.navigation;
        const {articleDetail, checked, playStatus, modalVisible, showedAd, alertModalVisible} = this.state;
        // let {flag, user, jokerVideo, route} = this.props;
        // console.log(route.params.article_title)
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
                                <Text style={{
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
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: 'nyt-cheltenham',
                                    color: '#9a9a9a',
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
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: 'nyt-cheltenham',
                                    color: colorScheme === 'dark' ? '#a5a5a5' : 'black'
                                }}>
                                    {articleDetail.article_content}
                                </Text>
                                <View style={{
                                    height: 52,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    marginBottom: 20,
                                    color: 'white',
                                    // backgroundColor: '#f3f4f6',
                                }}>
                                    <PublisherBanner
                                        bannerSize="banner"
                                        adUnitID="ca-app-pub-8394017801211473/9802994365" // Test ID, Replace with your-admob-unit-id
                                        onDidFailToReceiveAdWithError={this.bannerError}
                                        onAdMobDispatchAppEvent={this.adMobEvent}/>
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
                                <Text style={styles.articleTitle}>{articleDetail.article_title}</Text>
                            </View>
                            <HTML html={articleDetail.article_translate}
                                  imagesMaxWidth={Dimensions.get('window').width}/>
                            <View style={{
                                height: 52,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                                marginBottom: 20,
                                backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff'
                            }}>
                                <PublisherBanner
                                    bannerSize="banner"
                                    adUnitID="ca-app-pub-8394017801211473/9802994365" // Test ID, Replace with your-admob-unit-id
                                    onDidFailToReceiveAdWithError={this.bannerError}
                                    onAdMobDispatchAppEvent={this.adMobEvent}/>
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
                                    <Text style={styles.modalText}>Watch the Ad Video first, then back to
                                        translation,Thank you!</Text>
                                    <TouchableHighlight
                                        style={{
                                            ...styles.openButton,
                                            backgroundColor: '#2196F3'
                                        }}
                                        onPress={() => {
                                            this.setModalVisible(!modalVisible);
                                        }}>
                                        <Text style={styles.textStyle}>Ok</Text>
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
                                    <Text style={styles.modalText}>Thank you for your help!</Text>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton,
                                            backgroundColor: '#2196F3' }}
                                        onPress={() => {
                                            this.setAlertModalVisible(false);
                                        }}>
                                        <Text style={styles.textStyle}>Close</Text>
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
        jokerVideo: state.userReducer.jokerVideo
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
        fontFamily: 'nyt-cheltenham',
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

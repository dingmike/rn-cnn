import {Ionicons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {requestData} from "../../redux/actions/userAction";
import {connect} from "react-redux";
import RNGeolocationView from '../../components/RNGeolocationView'
import OwnCamera from '../../components/OwnCamera'
import {Video} from 'expo-av';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import HTML from 'react-native-render-html';
import {Asset} from 'expo-asset';
import {Loading, EasyLoading} from '../../components/EasyLoading'
import SkeletonContent from 'react-native-skeleton-content';
import {AntDesign, MaterialIcons, FontAwesome5} from '@expo/vector-icons';

import {
    Accelerometer,
    Barometer,
    Gyroscope,
    Magnetometer,
    MagnetometerUncalibrated,
    Pedometer,
} from 'expo-sensors';
import articleApi from "../../apis/articleApi"; // 手机传感器

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
        articleDetail: PropTypes.object.isRequired,
        articleId: PropTypes.string.isRequired,
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
        alert(JSON.stringify(route.params))
        this.state = {
            photos: [],
            articleId: route.params.id,
            articleDetail: {},
            resume: false,
            loading: false,
            playStatus: 'pause',
            checked: '1',
            sourceCheckedColor: {
                backgroundColor: 'green',
                color: 'white'
            },
            translateCheckedColor: {
                backgroundColor: 'white',
                color: 'black'
            }
        }
    }

    async componentDidMount() {
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
            loading: true
        })
        alert(JSON.stringify(this.state.articleId))
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

    speak(playStatus, content) {
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
            this.setState({playStatus: 'play',  resume: false,});
        }
    }

    onPressSource(check) {
        if (check === '1') {
            this.setState({
                checked: '1',
                sourceCheckedColor: {
                    backgroundColor: 'green',
                    color: 'white'
                },
                translateCheckedColor: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            })
            this.scrollView.scrollTo({x:0,y: 0,animated:true});
        } else {
            this.setState({
                checked: '2',
                translateCheckedColor: {
                    backgroundColor: 'green',
                    color: 'white'
                },
                sourceCheckedColor: {
                    backgroundColor: 'white',
                    color: 'black'
                },
            })
            this.scrollView.scrollTo({x:0,y: 0,animated:true});
        }

    }

    render() {
        const {navigate} = this.props.navigation;
        const {articleDetail, checked, playStatus} = this.state;
        console.log('article Detail page!')
        console.log(navigate)
        // let {flag, user, jokerVideo, route} = this.props;
        // console.log(route.params.article_title)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.headerSource, this.state.sourceCheckedColor]}>
                        <TouchableOpacity onPress={() => this.onPressSource('1')}>
                            <Text style={[styles.headerText, this.state.sourceCheckedColor]}>Source</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.headerTrans, this.state.translateCheckedColor]}>
                        <TouchableOpacity onPress={() => this.onPressSource('2')}>
                            <Text style={[styles.headerText, this.state.translateCheckedColor]}>Translate</Text>
                        </TouchableOpacity>
                    </View>

                    {playStatus === 'play' ?
                        <TouchableOpacity onPress={() => this.speak('pause', articleDetail.article_content)}>
                            <AntDesign style={styles.playAudio} name="pausecircleo" size={28} color="black"/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.speak('play', articleDetail.article_content)}>
                            <AntDesign style={styles.playAudio} name="playcircleo" size={28} color="black"/>
                        </TouchableOpacity>}

                   {/* <TouchableOpacity onPress={() => this.speak('stop', articleDetail.article_content)}>
                        <FontAwesome5 style={styles.stopAudio} name="stop-circle" size={28} color="black" />
                    </TouchableOpacity>*/}

                    <TouchableOpacity onPress={() => this.speak('refresh', articleDetail.article_content)}>
                        <MaterialIcons style={styles.refreshAudio} name="replay" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.container}>
                    <Button title="Press to hear some words" onPress={() => this.speak()} />
                </View>*/}
                {/*<WebView
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    javaScriptEnabled={true} // 仅限Android平台。iOS平台JavaScript是默认开启的。
                    domStorageEnabled={true} // 适用于安卓a
                    scrollEnabled={true}
                    automaticallyAdjustContentInsets={true}
                    source={{ html: articleDetail.article_translate }}
                    style={{ marginTop: 20}}
                />*/}

                <SkeletonContent
                    containerStyle={{flex: 1, width: Dimensions.get('window').width}}
                    isLoading={this.state.loading}
                    animationType="pulse"
                    layout={[
                        {
                            key: 'title',
                            width: Dimensions.get('window').width - 20,
                            height: 50,
                            marginBottom: 16,
                            marginLeft: 10,
                            marginTop: 10,
                            marginRight: 10
                        },
                        {
                            key: 'article',
                            width: Dimensions.get('window').width - 20,
                            height: 620,
                            marginBottom: 18,
                            marginLeft: 10,
                            marginRight: 10
                        },
                        // {key: 'someOtherId2', width: Dimensions.get('window').width-40, height: 420, marginBottom: 18, marginLeft: 20, marginRight: 20}
                    ]}>

                    {checked === '1' ? <ScrollView style={styles.content}
                                                   ref={(r) => this.scrollView = r}>
                        <View style={styles.articleTitle}>
                            <Text style={styles.articleTitle}>{articleDetail.article_title}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize: 18}}>
                                {articleDetail.article_content}
                            </Text>
                        </View>

                        {/*<HTML html={articleDetail.article_content} imagesMaxWidth={Dimensions.get('window').width}/>*/}
                    </ScrollView> : <ScrollView style={styles.content}>
                        <View>
                            <Text style={styles.articleTitle}>{articleDetail.article_title}</Text>
                        </View>
                        <HTML html={articleDetail.article_translate} imagesMaxWidth={Dimensions.get('window').width}/>
                    </ScrollView>}


                </SkeletonContent>


                <Loading type={"type"} loadingStyle={{backgroundColor: "#ccc"}}/>
            </View>
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
        padding: 12,
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
        padding: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10
    },
    refreshAudio: {
        position: 'relative',
        left: Dimensions.get('window').width / 2 - 90,
        top: 10,
    },
    stopAudio: {
        position: 'relative',
        left: Dimensions.get('window').width / 2 - 120,
        top: 10,
    },
    playAudio: {
        position: 'relative',
        left: Dimensions.get('window').width / 2 - 120,
        top: 10,
    },
    content: {
        // flex: 6,
        padding: 8,
        width: Dimensions.get('window').width
    },
    articleTitle: {
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
        fontWeight: 'bold',
    },


    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        height: 40,
        marginLeft: 50
    },
});

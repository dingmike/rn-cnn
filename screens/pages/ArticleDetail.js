import {Ionicons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
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
import { Asset } from 'expo-asset';
import {Loading, EasyLoading} from '../../components/EasyLoading'

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
        this.state = {
            photos: [],
            articleId: route.params.id,
            articleDetail: {},
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

       EasyLoading.show('Loading...', -1, 'type');

       let response = await articleApi.articleDetail({
           id: this.state.articleId,
       });
       EasyLoading.dismiss()
       console.log(response,100)
       this.setState({
           articleDetail: response.data
       })


    }
    componentDidUpdate() {
    }
    speak() {
        let thingToSay = 'hello world welcome to my home!';
        Speech.speak(thingToSay);
    }

    render() {
        const {navigate} = this.props.navigation;
        const {articleDetail} =  this.state;
        console.log('article Detail page!')
        console.log(navigate)
        // let {flag, user, jokerVideo, route} = this.props;
        // console.log(route.params.article_title)
        return (
            <View style={styles.container}>
                <View >

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
                <ScrollView style={styles.content}>
                    <View>
                        <Text style={styles.articleTitle}>{articleDetail.article_title}</Text>
                    </View>
                    <HTML html={articleDetail.article_translate} imagesMaxWidth={Dimensions.get('window').width} />
                </ScrollView>
                <Loading type={"type"} loadingStyle={{ backgroundColor: "#ccc" }}/>
            </View>
        );}
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
        paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
        padding: 8,
    },
    content: {
        flex: 1,

    },
    articleTitle: {
      fontSize: 20,
      textAlign: 'left'
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

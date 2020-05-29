import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import React, {Component} from 'react';
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
    StatusBar, Dimensions
} from 'react-native';
import MyButton from '../components/MyButton'
import CardArticle from '../components/CardArticle'
import LineCardArticle from '../components/LineCardArticle'
import {ScrollView} from 'react-native-gesture-handler';

import {MonoText} from '../components/StyledText';

import {styles} from '../style/homeScreenNewStyle';
import Constants from 'expo-constants';   // 常量


import HomeDetail from "./HomeDetail";

import {requestData} from '../redux/actions/userAction';
import {ImageBackground as WebImageBackground} from "react-native-web";
// import {BoxShadow} from 'react-native-shadow'


class HomeScreenNew extends Component {

    render() {
        return (<ScrollView style={styles.container}>
            {/* header title */}
            <View style={styles.headView}>
                <View>
                    <Text style={styles.headerTitle}>Today Reading!</Text>
                </View>
                <View>
                    <Text style={styles.headerDes}>Read more, Learn more.</Text>
                </View>
            </View>
                <CardArticle/>
                <LineCardArticle/>
                <LineCardArticle/>
        </ScrollView>
       )

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenNew);

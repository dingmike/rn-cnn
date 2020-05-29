import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {MonoText} from '../components/StyledText';

import {styles} from '../style/homeScreenNewStyle';

import HomeDetail from "./HomeDetail";

import {requestData} from '../redux/actions/userAction';
import {ImageBackground} from "react-native-web";
const image = { uri: "https://reactjs.org/logo-og.png" };

class HomeScreenNew extends Component {

    render() {

        return <ScrollView style={styles.container}>
                 {/* header title */}
                 <View style={styles.headView}>
                     <View>
                        <Text style={styles.headerTitle}>Today Reading!</Text>
                     </View>
                     <View>
                         <Text style={styles.headerDes}>Read more, Learn more.</Text>
                     </View>
                 </View>

                 {/* first article image */}
                 <View style={styles.firstArticleImg} >
                     <ImageBackground source={image} style={styles.insideImg} >
                         <Text>Inside</Text>
                     </ImageBackground>
                 </View>

               </ScrollView>

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

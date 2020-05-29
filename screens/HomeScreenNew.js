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
    ImageBackground,
    StatusBar, Dimensions
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {MonoText} from '../components/StyledText';

import {styles} from '../style/homeScreenNewStyle';

import HomeDetail from "./HomeDetail";

import {requestData} from '../redux/actions/userAction';
import {ImageBackground as WebImageBackground} from "react-native-web";
// import {BoxShadow} from 'react-native-shadow'

const image = {uri: "https://reactjs.org/logo-og.png"};

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

            {/* first article image */}
                 <View style={styles.firstArticleImg}>
                    {Platform.OS === 'web' ? (<WebImageBackground source={image} style={styles.insideImg}>
                        <Text style={styles.insideTitleFirst}>No.209 | Hot News</Text>
                        <Text style={styles.insideMainTitle}>Inside the home land ok now hello world!</Text>
                        <View style={{
                            flexDirection: "row",
                            height: 100,
                            padding: 20
                        }}>
                            <View style={{backgroundColor: "blue", flex: 0.4}}></View>
                            <View style={{backgroundColor: "red", flex: 0.4}}></View>
                        </View>
                    </WebImageBackground>) : (<ImageBackground source={image} style={styles.insideImg}>
                        <Text style={styles.insideTitleFirst}>No.209 | Hot News</Text>
                        <Text style={styles.insideMainTitle}>Inside the home land ok now hello world!</Text>
                        <View style={{
                            flexDirection: "row",
                            height: 100,
                            padding: 20
                        }}>
                            <View style={{backgroundColor: "blue", flex: 0.4}}></View>
                            <View style={{backgroundColor: "red", flex: 0.4}}></View>
                        </View>
                    </ImageBackground>)}

                    {/*<ImageBackground source={image} style={styles.insideImg}>
                         <Text style={styles.insideTitleFirst}>No.209 | Hot News</Text>
                         <Text style={styles.insideMainTitle}>Inside the home land ok now hello world!</Text>
                        <View style={{
                            flexDirection: "row",
                            height: 100,
                            padding: 20
                        }}>
                            <View style={{ backgroundColor: "blue", flex: 0.4 }}></View>
                            <View style={{ backgroundColor: "red", flex: 0.4 }}></View>
                        </View>
                     </ImageBackground>*/}
                </View>

        </ScrollView>)

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

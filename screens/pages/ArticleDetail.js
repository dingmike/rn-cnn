import {Ionicons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity} from 'react-native';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {requestData} from "../../redux/actions/userAction";
import {connect} from "react-redux";
import RNGeolocationView from '../../components/RNGeolocationView'
import OwnCamera from '../../components/OwnCamera'
import {Video} from 'expo-av';
import * as SecureStore from 'expo-secure-store';
import {
    Accelerometer,
    Barometer,
    Gyroscope,
    Magnetometer,
    MagnetometerUncalibrated,
    Pedometer,
} from 'expo-sensors'; // 手机传感器

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

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            text2: '',
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
       let oknow =await SecureStore.getItemAsync('_ok', {})
       alert(oknow)
    }

    componentDidUpdate() {
    }

    render() {
        const {navigate} = this.props.navigation;
        console.log('article Detail page!')
        console.log(navigate)
        let {flag, user, jokerVideo, route} = this.props;
        console.log(route.params.article_title)
        return (
        <ScrollView>
            {/*<View>*/}
            {/*</View>*/}
            {/*<Text>Article details... </Text>*/}
            {/*<Text>{route.params.article_title}</Text>*/}
            <View>
                <Text></Text>
            </View>
            <View style={{height: 500}}>

            </View>
        </ScrollView>
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
        backgroundColor: '#fafafa',
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

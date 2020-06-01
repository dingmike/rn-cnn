import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {requestData} from "../../redux/actions/userAction";
import {connect} from "react-redux";
import { Video } from 'expo-av';

class ArticleDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {navigate } = this.props.navigation;
        console.log('article Detail page!')
        console.log(navigate)
        let {flag,user, jokerVideo,route} = this.props;
        return (
            <ScrollView>
                <View>

                </View>
                <Text>Article details... </Text>
                <Text>{route.params.article_title}</Text>
            </ScrollView>
        );
    }
}
function mapStateToProps(state){
    return {
        flag: state.userReducer.flag,
        user: state.userReducer.user,
        jokerVideo: state.userReducer.jokerVideo
    };
}
function mapDispatchToProps(dispatch){
    return {
        updateData: function(){
            dispatch(requestData());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);


function OptionButton({ icon, label, onPress, isLastOption }) {
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
}

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
});

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
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,            //控制下拉刷新
            isLoadMore: false,               //控制上拉加载
            currentPage: 1,             //当前请求的页数
            totalCount: 0,              //数据总条数
            sourceData: [],             //列表数据
        };
    }
    _onEndReached() {         //上拉加载更多
        const {currentPage, totalCount, sourceData, isLoadMore} = this.state;
debugger
        if(sourceData.length < totalCount && !isLoadMore){     //还有数据没有加载完，并且不是正在上拉加载更多
            this.setState({
                currentPage: currentPage+1,             //加载下一页
                isLoadMore: true                        //正在加载更多
            }, () => {
                // this.getDataList();          //利用setState的第二个参数，以便获取最新的state
                Alert.alert('Right button pressed')
            })
        }
    }
    render() {

        return (<View style={styles.container}>
            {/* header title */}
            <View style={styles.headView}>
                <View>
                    <Text style={styles.headerTitle}>Today Reading!</Text>
                </View>
                <View>
                    <Text style={styles.headerDes}>Read more, Learn more.</Text>
                </View>
            </View>

              {/*  <CardArticle/>
                <LineCardArticle/>
                <LineCardArticle/>*/}
                <View style={styles.articleList}>
                    <FlatList
                        data={[
                            { key: 'Devin' },
                            { key: 'Dan' },
                            { key: 'Dominic' },
                            { key: 'Jackson' },
                            { key: 'James' },
                            { key: 'Joel' },
                            { key: 'John' },
                            { key: 'Jillian' },
                            { key: 'Jimmy' },
                            { key: 'Julie' },
                        ]}
                        renderItem={({ item }) => item.key === 'Devin' ? <CardArticle/> : <LineCardArticle/>}
                        onEndReached={()=>this._onEndReached()}
                        refreshing={true}
                    />
                </View>
        </View>



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

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

import userApi from "../apis/userApi";
import articleApi from "../apis/articleApi";

import HomeDetail from "./HomeDetail";

import {requestData} from '../redux/actions/userAction';
import {ImageBackground as WebImageBackground} from "react-native-web";

// import {BoxShadow} from 'react-native-shadow'
import * as SecureStore from 'expo-secure-store';

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

    async getDataList() {
        // const {dispatch, goBack, navigate, setParams} = this.props.navigation;
        /*userApi.getMovieData().then(data => {

            if(this.state.currentPage == 1){
                this.setState({
                    sourceData: data.result,
                    totalCount: data.result.length,
                    isRefreshing: false                 //有可能是下拉刷新
                })
            }else{
                this.setState({
                    sourceData: this.state.sourceData.concat(data.result),
                    isLoadMore: false               //关闭正在加载更多
                })
            }

        })*/

        try {

            /*
            * {
                type: 'video',
                page: this.state.currentPage,
                count: 10
            }*/
            // 请求接口，参数不用管；这里只需要主要  currentPage 和 pageSize即可 {page: 1, count: 2, type: 'video'}
            let response = await articleApi.allArticleList({
                page: this.state.currentPage,
                limit: 5,
                sortNum: -1,
                articleCate: []
            }); //
            console.log(response.data)
            if (this.state.currentPage == 1) {
                this.setState({
                    sourceData: response.data.docs,
                    totalCount: response.data.total,
                    isRefreshing: false                 //有可能是下拉刷新
                })
            } else {
                this.setState({
                    sourceData: this.state.sourceData.concat(response.data.docs),
                    isLoadMore: false               //关闭正在加载更多
                })
            }

        } catch (err) {
            Alert.alert(err.message)
        }
    }

    _onRefresh() {             // 下拉刷新
        // 正在上拉刷新，请求第一页
        this.setState({isRefreshing: true, currentPage: 1}, () => {
            this.getDataList();
            //利用setState的第二个参数，以便获取最新的state
        });
    }

    _goToDetail(item) {
        console.log(item)
        this.props.navigation.navigate('ArticleDetail', { ...item })
    }

    // 渲染卡片
    _renderItem = ({item}) => {
     return <CardArticle articleItem={item} goToDetail={() => this._goToDetail(item)} articleTotal={this.state.totalCount}
                     articleTitle={item.chinese_title}/>
        /*<MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />*/
    };

    _onEndReached() {         //上拉加载更多
        const {currentPage, totalCount, sourceData, isLoadMore} = this.state;
        if (sourceData.length < totalCount && !isLoadMore) {     //还有数据没有加载完，并且不是正在上拉加载更多
            this.setState({
                currentPage: currentPage + 1,             //加载下一页
                isLoadMore: true                        //正在加载更多
            }, () => {
                this.getDataList();          //利用setState的第二个参数，以便获取最新的state
            })
        }
    }

    async componentDidMount() {
        await this.getDataList();
        let right = await SecureStore.isAvailableAsync()
        alert(right)
        SecureStore.setItemAsync('_ok', '2342234', {})
    }

    render() {
        // const {navigate} = this.props.navigation;
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
                        data={this.state.sourceData}
                        keyExtractor={(item, index) => index.toString()}       //不重复的key
                        renderItem={this._renderItem}
                        ListEmptyComponent={<Text style={{textAlign: 'center'}}>暂无内容</Text>}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            this._onEndReached()
                        }}
                        onRefresh={() => {
                            this._onRefresh()
                        }}
                        refreshing={this.state.isRefreshing}
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

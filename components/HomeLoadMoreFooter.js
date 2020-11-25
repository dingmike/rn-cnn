/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-25 09:36
 */

import React, {PureComponent, Component} from "react";
import {ActivityIndicator, Text, View} from "react-native";

export const LOAD_MORE_STATE = {
    CANCEL:0,   //无需加载更多
    REFRESHING:1, //正在加载更多数据
    NO_MORE_DATA:2, //没有更多数据
};

class HomeLoadMoreFooter extends PureComponent {
    render() {
        let {state, loadMoreTxt = '正在加载更多...', noMoreData = '没有更多了'} = this.props;
        return (
            <View>
                {
                    state === LOAD_MORE_STATE.CANCEL && <View style={{height: 0}}/>
                }
                {
                    state === LOAD_MORE_STATE.REFRESHING && <View style={{
                        flexDirection: 'row',
                        height: 34,
                        justifyContent: 'center',
                        backgroundColor:'#fff',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator animating={true}
                                                    color='red'
                                                    size="small"/>
                        <Text style={{
                            color: '#999999',
                            fontSize: 13}}>{loadMoreTxt}</Text>
                    </View>
                }
                {
                    state === LOAD_MORE_STATE.NO_MORE_DATA &&
                    <View style={{
                        height: 34,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:'#fff'}}>
                        <Text style={{
                            color: '#999999',
                            fontSize: 13}}>{noMoreData}</Text>
                    </View>
                }
            </View>

        )
    }
}

export default HomeLoadMoreFooter;
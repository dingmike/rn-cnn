/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-20 17:11
 * type (String) - 用来区分不同Loading组件。
 * color (String) - 转圈的颜色，默认:"#FFF"。
 * textStyle (Object) - 提示字样式。
 * loadingStyle (Object) - 外层盒子样式。
 * show(text:string = 'Loading...',timeout:number = -1,key:string = 'default') - 显示Loading...
 * dismis(key:string = 'default') - 关闭
 */

import React from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';

let lo;
const defaultTimeOut = -1;//设置显示时间标识

export class EasyLoading {

    /**
     * 显示Loading
     * @param text  Loading显示文本，默认为'加载中'
     * @param timeout Loading显示时间，为-1时会一只显示，需要手动关闭
     */
    static show(text = '加载中...', timeout = defaultTimeOut) {
        console.log(timeout);
        lo.setState({"isShow": true, "text": text, "timeout": timeout});
    }

    /**
     * 关闭Loading
     */
    static dismiss() {
        lo.setState({"isShow": false});
    }
}

export class Loading extends React.Component {

    static propTypes = {
        color: PropTypes.string,
        textStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.handle = 0;
        this.state = {
            isShow: false,
            timeout: defaultTimeOut,
            text: "加载中..."
        };
        lo = this;
    }

    componentWillUnmount() {
        clearTimeout(this.handle);
    }

    render() {
        clearTimeout(this.handle);

        (this.state.timeout !== defaultTimeOut) && (this.handle = setTimeout(() => {
            EasyLoading.dismiss();
        }, this.state.timeout));

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {
                    alert("Modal has been closed.")
                }}>
                <View style={styles.container}>
                    <View style={[styles.load_box, this.props.loadingStyle]}>
                        <ActivityIndicator animating={true} color={this.props.color || '#FFF'} size={'large'}
                                           style={styles.load_progress}/>
                        <Text style={[styles.load_text, this.props.textStyle]}>{this.state.text}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    load_box: {
        width: 100,
        height: 100,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    load_progress: {
        width: 50,
        height: 50
    },
    //默认字体颜色
    load_text: {
        color: '#FFF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(178,178,178,0.8)',
    },
});


/*
import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Dimensions, Text, View, Modal, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;




export class EasyLoading {
    constructor() {
    }
    static bind(loading, key = 'default') {
        loading && (this.map[key] = loading);
    }
    static unBind(key = 'default') {
        this.map[key] = null
        delete this.map[key];
    }
    static show(text = 'Loading...', timeout = -1, key = 'default') {
        this.map[key] && this.map[key].setState({ "isShow": true, "text": text, "timeout": timeout });
    }
    static dismis(text = 'Loading...', key = 'default') {
        this.map[key] && this.map[key].setState({ text: text, isShow: false });
    }
}

EasyLoading.map = {};



export class Loading extends React.Component {

    static propTypes = {
        type: PropTypes.string,
        color: PropTypes.string,
        textStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
    };

    constructor(props) {
        super(props);
        let handle = 0;
        this.state = {
            isShow: false,
            timeout: -1,
            text: "Loading..."
        }
        EasyLoading.bind(this, this.props.type || 'default');
    }
    componentWillUnmount() {
        clearTimeout(this.handle);
        EasyLoading.unBind(this.props.type || 'default');
    }
    render() {
        clearTimeout(this.handle);
        (this.state.timeout != -1) && (this.handle = setTimeout(() => {
            EasyLoading.dismis(this.props.type || 'default');
        }, this.state.timeout));
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => { alert("Modal has been closed.") } }>
                <View style={[styles.load_box, this.props.loadingStyle]}>
                    <ActivityIndicator animating={true} color={this.props.color || '#FFF'} size={'large'} style={styles.load_progress} />
                    <Text style={[styles.load_text, this.props.textStyle]}>{this.state.text}</Text>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    load_box: {
        width: 100,
        height: 100,
        backgroundColor: '#0008',
        alignItems: 'center',
        marginLeft: SCREEN_WIDTH / 2 - 50,
        marginTop: SCREEN_HEIGHT / 2 - 50,
        borderRadius: 10
    },
    load_progress: {
        position: 'absolute',
        width: 100,
        height: 90
    },
    load_text: {
        marginTop: 70,
        color: '#FFF',
    }
});*/

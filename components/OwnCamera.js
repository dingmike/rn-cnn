/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-20 11:42
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {Camera} from 'expo-camera';


export default class OwnCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            type: Camera.Constants.Type.back
        }
    }

    _setType() {
        if (this.state.type === Camera.Constants.Type.back) {
            this.setState({
                type: Camera.Constants.Type.front
            })
        } else {
            this.setState({
                type: Camera.Constants.Type.back
            })
        }
    }
    render() {
        if (this.state.hasPermission === null) {
            return <View><Text></Text></View>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        let {flag, user, jokerVideo, route} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{flex: 1}} type={this.state.type}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this._setType()}>
                            <Text style={{fontSize: 20, marginBottom: 10, paddingVertical: 20, color: 'white'}}> Flip </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
    );
    }

    componentDidMount() {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            this.setState({
                hasPermission: status === 'granted'
            })
        })();
    }

    componentDidUpdate() {
    }
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
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
});

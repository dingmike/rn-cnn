import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
} from 'react-native';

export default class RNGeolocationView extends Component {

    _watchID;

    constructor(props) {
        super(props);
        this.state = {
            initialPosition: '',
            lastPosition: ''
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let initialPosition = JSON.stringify(position);
                this.setState({
                    initialPosition: initialPosition
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this._watchID = navigator.geolocation.watchPosition((position)=> {
            let lastPosition = JSON.stringify(position);
            this.setState({
                lastPosition: lastPosition
            });
        }, (error)=> {
            alert(error.message)
        })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this._watchID);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffaaff', alignItems: 'center', justifyContent: 'center'}}>
                <Text>{this.state.initialPosition}</Text>
                <Text>{this.state.lastPosition}</Text>
            </View>
        )
    }
}
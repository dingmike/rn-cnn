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
import MyButton from './MyButton'
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from "../style/homeScreenNewStyle";
import {ImageBackground as WebImageBackground} from "react-native-web";
const image = {uri: "https://reactjs.org/logo-og.png"};

export default class CardArticle extends Component {
    render() {
        return (<View style={styles.firstArticleImg}>
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
                    justifyContent: 'space-between',
                    height: 100,
                    lineHeight: 100,
                    position: 'relative',
                    top: 260,
                    left: -20,
                    padding: 20
                }}>
                    <View style={styles.cardTimeStyle}>
                        <Text style={{color: 'white', }}>May.29th.2020</Text>
                    </View>
                    {/*<Button title="Start Read" color="white" onPress={() => Alert.alert('Right button pressed')} />*/}
                    <MyButton
                        text={'Read Now'}
                        onPress={() => Alert.alert('Right button pressed')}
                        bgColor={'green'}
                        fColor={'white'}
                        style={{borderRadius: 4}}
                        size={20}
                    />
                </View>

            </ImageBackground>)}
        </View>)
    }
}



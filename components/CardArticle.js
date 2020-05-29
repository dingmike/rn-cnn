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
    StatusBar, Dimensions,Vibration
} from 'react-native';
import MyButton from './MyButton'
import {ScrollView} from 'react-native-gesture-handler';
// import {styles} from "../style/homeScreenNewStyle";
import {ImageBackground as WebImageBackground} from "react-native-web";
import {color} from "../style/common";
const image = {uri: "https://reactjs.org/logo-og.png"};

export default class CardArticle extends Component {
    render() {
        const DURATION = 10000;
        const PATTERN = [1000, 2000, 3000];
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
                        onPress={() => {
                            Vibration.vibrate(PATTERN);
                            Alert.alert('Right button pressed')
                        }}
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
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headView: {
        paddingLeft: 18,
        paddingRight: 18,
        paddingBottom: 10,
        marginTop: 16
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20,
        textAlign: 'left',
        fontWeight: '600'
    },
    headerDes: {
        fontSize: 16,
        lineHeight: 16,
        marginTop: 4
    },
    firstArticleImg: {
        marginBottom: 20,
        height: 440,
        marginLeft: 18,
        marginRight: 18,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                width: null,
                shadowColor: "rgba(195, 60, 17, 0.5)",
                shadowOffset: {h:10,w:10},
                shadowRadius: 20,
                shadowOpacity: 1,
                elevation: 10,
                borderRadius: 8,
                overflow: 'hidden'
            },
            android: {
                width: null,
                shadowColor: 'gray',
                shadowOffset: {h:10,w:10},
                shadowRadius: 3,
                shadowOpacity: 0.8,
                borderRadius: 8
            },
            web: {
                height: 360,
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                shadowColor: 'black',
                shadowOpacity: 0.3,
                shadowRadius: 1,
                borderRadius: 8,
            }
        }),
    },
    insideImg: {
        // flex: 1,
        width: '100%',
        height: '100%',
    },


    insideTitleFirst: {
        color: color.whiteFont,
        fontSize: 12,
        padding: 10,
    },
    insideMainTitle: {
        color: color.whiteFont,
        fontSize: 20,
        fontWeight: '600',
        padding: 10,
    },
    cardTimeStyle:{
        height: 36,
        paddingLeft: 10,
        textAlign:'left',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        ...Platform.select({
            ios:{
                lineHeight: 36,
            },
            android:{

            }
        }),
    },






    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: color.redFont,
    },

    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});



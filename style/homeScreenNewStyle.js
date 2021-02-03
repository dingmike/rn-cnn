import {Platform, StyleSheet, Dimensions} from 'react-native';
import {color, size, layout} from './common'


const win = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    articleList: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        // marginTop: 20,
        // marginLeft: 10,
        // marginRight: 10
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        // height: null,
        // width: null,
        zIndex: -1,
        width: '100%',
        height: '100%',
        // borderBottomLeftRadius: 8,
        // borderTopLeftRadius: 8,
        borderRadius: 8,
    },
    headView: {
        paddingLeft: 18,
        paddingRight: 18,
        height: 30,
        // paddingBottom: 10,
        marginTop: 10,
        // marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 24,
        height: 24,
        textAlign: 'left',
        fontWeight: '600'
    },
    headerDes: {
      fontSize: 16,
      height: 16,
      lineHeight: 16,
      marginTop: 4
    },
    adBanner: {
        // paddingLeft: 18,
        // paddingRight: 18,
        // paddingBottom: 10,
        width: Dimensions.get('window').width-40,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 16
    },
    firstArticleImg: {
        ...Platform.select({
            ios: {
                width: null,
                height: 440,
                marginLeft: 18,
                marginRight: 18,
                backgroundColor: 'white',
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
                height: 440,
                marginLeft: 18,
                marginRight: 18,
                backgroundColor: 'white',
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

export {
    styles
}

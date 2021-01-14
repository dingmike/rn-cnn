import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import MyButton from './MyButton'
// import {ScrollView} from 'react-native-gesture-handler';
import {ImageBackground as WebImageBackground} from "react-native-web";
import {color} from "../style/common";

const image = {uri: "https://reactjs.org/logo-og.png"};
import myUtils from '../utils/myUtils'

export default class CardArticle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {
        bgColor: '#000',
        fColor: '#fff',
        size: 10
    };
    static propTypes = {
        //文章数据
        articleItem: PropTypes.object,
        articleTitle: PropTypes.string.isRequired,
        articleTotal: PropTypes.number.isRequired,
        goToDetail: PropTypes.func.isRequired,
    }

    render() {
        // const {navigate} = this.props.navigation;
        let {articleTitle, articleItem, articleTotal, goToDetail} = this.props;
        const DURATION = 10000;
        const PATTERN = [1000, 2000, 3000];
        console.log(articleItem)
        debugger
        return (<TouchableOpacity style={styles.firstArticleImg} onPress={goToDetail}>
            {articleItem.articleImg !== '' ?
                <View style={{height: 200, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.leftContent}>
                        <Image
                            style={styles.articleImg}
                            source={{uri: articleItem.articleImg}}
                        />
                    </View>
                    <View style={styles.rightContent}>
                        <View>
                            <Text style={styles.insideTitleFirst}>{articleItem.articleCate.category_name} |
                                词数：{articleItem.wordNum}</Text>
                            <View style={styles.insideMainTitleView}>
                                <Text numberOfLines={2}
                                      style={styles.insideMainTitle}>{articleItem.chinese_title}</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'flex-end',
                            // height: 60,
                            // lineHeight: 60,
                            paddingRight: 20,
                            marginTop: 50,
                        }}>
                            <View style={styles.cardTimeStyle}>
                                <Text style={styles.updateTimeStyle}>{myUtils.getEngDateTime(articleItem.deploy_time)}</Text>
                            </View>
                            {/*<MyButton
                               text={'Read Now'}
                               onPress={goToDetail}
                               bgColor={'green'}
                               fColor={'white'}
                               style={{borderRadius: 4}}
                               size={20}
                           />*/}
                        </View>
                    </View>
                </View> : <View style={{height: 140, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.rightContent}>
                        <View>
                            <Text style={styles.insideTitleFirst}>{articleItem.articleCate.category_name} |
                                词数：{articleItem.wordNum}</Text>
                            <View style={styles.insideMainTitleView}>
                                <Text numberOfLines={2}
                                      style={styles.insideMainTitle}>{articleItem.chinese_title}</Text>
                            </View>
                        </View>

                        <View style={styles.bottomTime}>
                            <View style={styles.cardTimeStyle}>
                                <Text style={styles.updateTimeStyle}>{myUtils.getEngDate(articleItem.meta.updateAt)}</Text>
                            </View>
                            {/*<MyButton
                               text={'Read Now'}
                               onPress={goToDetail}
                               bgColor={'green'}
                               fColor={'white'}
                               style={{borderRadius: 4}}
                               size={20}
                           />*/}
                        </View>
                    </View>
                </View>}

        </TouchableOpacity>)
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
        // height: 200,
        // flexDirection: 'column',  justifyContent: 'space-between',
        marginLeft: 18,
        marginRight: 18,
        backgroundColor: color.backgroundGray,
        ...Platform.select({
            ios: {
                width: null,
                shadowColor: "rgba(195, 60, 17, 0.5)",
                shadowOffset: {h: 10, w: 10},
                shadowRadius: 20,
                shadowOpacity: 1,
                elevation: 10,
                borderRadius: 8,
                overflow: 'hidden'
            },
            android: {
                width: null,
                shadowColor: 'gray',
                shadowOffset: {h: 20, w: 20},
                shadowRadius: 10,
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
    rightContent: {
        flex: 6
    },
    leftContent: {
        flex: 4
    },
    articleImg: {
        width: '100%',
        height: '100%',
        // borderBottomLeftRadius: 8,
        // borderTopLeftRadius: 8,
        borderRadius: 8,
    },
    insideImg: {
        // flex: 1,
        width: '100%',
        height: '100%',
    },


    insideTitleFirst: {
        color: color.blackFont,
        fontSize: 12,
        padding: 10,
        fontFamily: 'NotoSerif_400Regular'
    },
    insideMainTitleView: {
        width: '100%',
        height: 80
    },
    insideMainTitle: {
        color: color.blackFont,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 26,
        padding: 10,
    },
    bottomTime: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        // height: 60,
        // lineHeight: 60,
        paddingRight: 20,
        // marginTop: 50,
    },
    cardTimeStyle: {
        // flex: 1,
        // height: 36,
        // paddingLeft: 10,
        color: color.blackFont,
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: {
                // lineHeight: 36,
            },
            android: {}
        }),
    },
    updateTimeStyle:{
        color: color.blackFont,
        fontFamily: 'NotoSerif_400Regular'
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



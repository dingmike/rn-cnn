/**
 * @file  filename / ES module
 * @module module name
 * @author Zdj <https://github.com/dingmike> 2020/12/10
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback, ScrollView,
} from 'react-native';
import {styles as s} from './styles';
import RootSiblings from 'react-native-root-siblings';
import {pTd} from './size';
import {AntDesign, MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {Audio} from "expo-av";
import word from "../../apis/word";

let lastPopView;

class CommentDialog extends Component {
    static show = options => {
        options = Object.assign(
            {},
            {
                msg: "啥玩意儿！",
                cancelText: "取消",
                sureText: "确定",
                content: "无",
                canPressShadow: false, //点击弹窗外面是否关闭
                haveCancel: false,
                cancel: () => {
                },
                sure: () => {
                }
            },
            options
        );
        if (lastPopView !== undefined) {
            CommentDialog.hide(lastPopView);
        }
        lastPopView = new RootSiblings((<DialogContainer {...options} />));
    };

    static hide = instance => {
        instance.destroy();
    };

    render() {
        return null;
    }
}

class DialogContainer extends Component {

    sure = () => {
        const {sure} = this.props;
        sure();
        this.close();
    };
    cancel = () => {
        const {cancel} = this.props;
        cancel();
        this.close();
    };

    close = () => {
        CommentDialog.hide(lastPopView);
    };
    /**
     * play word speech
     * @param audio url
     * @private
     */
    async wordAudioPlay(audioUrl) {
        audioUrl = 'https://dict.youdao.com/dictvoice?audio=' + audioUrl;
        try {
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync(
                { uri: audioUrl },
                { shouldPlay: true });
            let res = await soundObject.playAsync();
            return res
        }catch (e) {
            // An error occurred!
            return await Promise.reject(error);
        }
    }

    render() {
        const {
            msg,
            sureText,
            cancelText,
            content, // word
            canPressShadow, //点击弹窗外面是否关闭
            haveCancel
        } = this.props;
        // alert(sureText)
        console.log(content, 'wordsss')
        if (content && content.content) {
            let wordHead = content.content.word.wordHead;
            let wordDetail = content.content.word.content;
            console.log(JSON.stringify(content.content.word.content), 'wordcontent');
            let test = {
                "sentence": {
                    "sentences": [{
                        "sContent": "a political controversy",
                        "sCn": "政治争议"
                    }, {"sContent": "the controversy surrounding Skinner’s theories", "sCn": "围绕斯金纳的理论的争议"}],
                    "desc": "例句"
                },
                "realExamSentence": {
                    "sentences": [{
                        "sContent": "...A recent article in The Harvard Crimson noted the shocking growth of Harvard's public relations arm in the last five years and it questioned whether a focus on risk management and avoiding controversy was really the best outward-looking face of this great institution...",
                        "sourceInfo": {"paper": "第一套", "level": "CET6", "year": "2014.6", "type": "阅读理解"}
                    }, {
                        "sContent": "...Too much of our current immigration controversy is conducted in terms of abstract ideals...",
                        "sourceInfo": {"paper": "第三套", "level": "CET6", "year": "2014.6", "type": "阅读理解"}
                    }], "desc": "真题例句"
                },
                "usphone": "ˈkɑːntrəvɜːrsi",
                "ukspeech": "controversy&type=1",
                "star": 0,
                "usspeech": "controversy&type=2",
                "syno": {
                    "synos": [{
                        "pos": "n",
                        "tran": "争论；论战；辩论",
                        "hwds": [{"w": "combat"}, {"w": "debate"}, {"w": "dispute"}]
                    }], "desc": "同近"
                },
                "ukphone": "'kɒntrəvɜːsɪ; kən'trɒvəsɪ",
                "phone": "'kɔntrə,və:si",
                "speech": "controversy",
                "remMethod": {"val": "contro(相反) ＋ vers( 转) ＋ y → 意见转向相反的方向 → 争论", "desc": "记忆"},
                "relWord": {
                    "desc": "同根",
                    "rels": [{"pos": "adj", "words": [{"hwd": "controversial", "tran": "有争议的；有争论的"}]}, {
                        "pos": "adv",
                        "words": [{"hwd": "controversially", "tran": "颇有争议地；引起争议 地"}]
                    }, {"pos": "vi", "words": [{"hwd": "controvert", "tran": "争论；辩论"}]}, {
                        "pos": "vt",
                        "words": [{"hwd": "controvert", "tran": "驳斥；就…展开争论"}]
                    }]
                },
                "trans": [{
                    "tranCn": "争论，辩论，争吵",
                    "descOther": "英释",
                    "pos": "n",
                    "descCn": "中释",
                    "tranOther": "a serious argument about something that involves many people and continues for a long time"
                }]
            }
            let trans = [];
            for(let i = 0 ; i < wordDetail.trans.length; i++) {
                if(wordDetail.trans[i].descCn) {
                    trans.push(
                        <View key={i}>
                            {/*<Text>{wordDetail.trans[i].descCn}</Text>*/}
                            <Text style={{color: 'black'}}><Text style={{fontWeight: '600',color: 'grey'}}>{wordDetail.trans[i].pos}.</Text> {wordDetail.trans[i].tranCn}</Text>
                            {wordDetail.trans[i].tranOther ? <Text style={{color: 'black'}}><Text style={{fontWeight: '600',color: 'grey'}}>{wordDetail.trans[i].pos}.</Text> {wordDetail.trans[i].tranOther}</Text> : null}
                        </View>
                    )
                }
            }


            // console.log(sureText)
            return (
                <View style={s.popViewWrapper}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            canPressShadow && this.close();
                        }}
                        style={s.popViewBackDrop}
                    >
                        <View style={s.popViewBackDropView}/>
                    </TouchableWithoutFeedback>

                    <View style={s.main}>
                        <View style={s.topMain}>
                            <Text style={{color: "#343434", fontSize: pTd(18), fontWeight: '500'}}>
                                {wordHead}
                            </Text>
                        </View>

                        <View style={s.viewLine}/>

                        {/*content word*/}
                        <ScrollView>
                            {/*speech*/}
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                               {wordDetail.usphone ?
                                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                    <Text>[{wordDetail.usphone}]</Text>
                                    <View style={{paddingHorizontal: 10}}>
                                        <TouchableOpacity onPress={() => this.wordAudioPlay(wordDetail.usspeech)}>
                                            <AntDesign name="sound" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                </View> : null}
                                {wordDetail.ukphone ?
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text>[{wordDetail.usphone}]</Text>
                                        <View style={{paddingHorizontal: 10}}>
                                            <TouchableOpacity onPress={() => this.wordAudioPlay(wordDetail.ukspeech)}>
                                                <AntDesign name="sound" size={20} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View> : null}
                            </View>

                            {/*translation*/}
                            {trans}
                            {/*remember method*/}
                            {wordDetail.remMethod && wordDetail.remMethod.val !== undefined ?  <View style={s.left}>
                                {/*<Text style={s.message}>{msg}</Text>*/}
                                <Text>
                                    {wordDetail.remMethod.desc}:  <Text style={{color: 'red'}}>{wordDetail.remMethod.val}</Text>
                                </Text>
                            </View> : null}
                        </ScrollView>


                        <View style={s.viewLine}/>

                        <View style={s.bottom}>
                            {haveCancel ? (
                                <View>
                                    <TouchableOpacity style={[s.submitBtn]} onPress={this.cancel}>
                                        <Text style={s.cancleText}>{cancelText}</Text>
                                    </TouchableOpacity>
                                    <View style={s.viewLine2}/>
                                </View>
                            ) : null}

                            <TouchableOpacity style={s.submitBtn} onPress={this.sure}>
                                <Text style={s.submitText}>{sureText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            let wordDetail = 'No result';
            return (
                <View style={s.popViewWrapper}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            canPressShadow && this.close();
                        }}
                        style={s.popViewBackDrop}
                    >
                        <View style={s.popViewBackDropView}/>
                    </TouchableWithoutFeedback>

                    <View style={s.main}>
                        <View style={s.topMain}>
                            <Text style={{color: "#343434", fontSize: pTd(18)}}>
                                未查到该单词
                            </Text>
                        </View>

                        <View style={s.viewLine}/>

                        <View style={s.center}>
                            <Text style={s.message}>{msg}</Text>
                        </View>

                        <View style={s.viewLine}/>

                        <View style={s.bottom}>
                            {haveCancel ? (
                                <>
                                    <TouchableOpacity style={[s.submitBtn]} onPress={this.cancel}>
                                        <Text style={s.cancleText}>{cancelText}</Text>
                                    </TouchableOpacity>

                                    <View style={s.viewLine2}/>
                                </>
                            ) : null}

                            <TouchableOpacity style={s.submitBtn} onPress={this.sure}>
                                <Text style={s.submitText}>{sureText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

    }
}

export default CommentDialog;

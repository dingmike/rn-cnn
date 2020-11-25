/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-25 14:03
 */
/**
 * @file  filename / ES module
 * @module module name
 * @author Zdj <https://github.com/dingmike> 2020/4/30
 */
import myUtils from './myUtils'
import { Audio } from 'expo-av';
// @params context 阅读文本
export function voiceOfArticle(context, audioArr) {
    // context = context.replace(/\n[^a-zA-Z_0-9]*/g, '\n')
    // context = context.replace(/\s*\n/g, '\n')
    /*    let contextArray = context.split(/\n/)
        // let contextArray = context
        contextArray.forEach(function(item, index){
            if (item == ''){
                contextArray.splice(index,1)
            }
        })*/
    // contextArray = contextArray.join(' ')
    // console.log(contextArray)
    // contextArray = contextArray.match(/(\w+[\s]*){1,6}/g)
    // console.log(contextArray)
    // playAudio(contextArray, 0)

    let contextArray = context
    console.log(contextArray)
    // contextArray = contextArray.match(/(\w+[\s]*){1,20}/g)   // 1-20个字符分隔开
    contextArray = contextArray.split(/[.?:!`]/g)   // 使用符號分割开
    console.log(contextArray)
    contextArray = contextArray.filter(item => {
        return item !== ''
    })
    playAudio(contextArray, 0, audioArr).then(soundObject => {

    }).catch(error => {
        alert(error)
    })
}


export async function playAudio(contextArray, index, audioArr){
    let audioUrl = makeAudioUrl(contextArray.length, contextArray[index], index)
    console.log(audioUrl)
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(
            { uri: audioUrl },
            { shouldPlay: true });
        let res = await soundObject.playAsync();
        // alert(JSON.stringify(res))
        // Your sound is playing!
        audioArr.push(soundObject)

        // 添加状态回调
        soundObject.setOnPlaybackStatusUpdate((playbackStatus) => {
            if (playbackStatus.didJustFinish) { // 结束后继续播放下一节
                // Don't forget to unload the sound from memory
                // when you are done using the Sound object
                soundObject.unloadAsync();
                if (index < contextArray.length - 1){
                    playAudio(contextArray, index + 1, audioArr)
                }
            }
        });
       return soundObject ;
    } catch (error) {
        // An error occurred!
        return Promise.reject(error);
    }
}

export function makeAudioUrl(total, context, index){
    context = context.replace(/\s*$/g, '')
    context = context.replace(/[^a-zA-Z_0-9]/g, ' ')
    context = context.toLowerCase()
    let es_context = encodeURIComponent(context)
    let url="https://dict.youdao.com/dictvoice?audio=" + es_context
    // var url = "http://translate.google.cn/translate_tts?ie=UTF-8&q="+ es_context +"&tl=en&total="+ total +"&idx="+ index +"&textlen=" + es_context.length + "&client=t&prev=input"
    return url
}

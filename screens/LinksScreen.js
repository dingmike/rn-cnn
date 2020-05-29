import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {requestData} from "../redux/actions/userAction";
import {connect} from "react-redux";
import { Video } from 'expo-av';

class LinksScreen extends Component{
  render() {
    let {flag,user, jokerVideo} = this.props;
    console.log(jokerVideo)
    return (
        <View>
          <Text>{jokerVideo[0].text}</Text>
          <Image
              style={{width: 100, height: 80}}
              source={{url: jokerVideo[0].thumbnail}}
          />
          <Video
              source={{ uri: jokerVideo[0].video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ width: 420, height: 640 }}
          />
        </View>
    );
  }
}
function mapStateToProps(state){
  return {
    flag: state.userReducer.flag,
    user: state.userReducer.user,
    jokerVideo: state.userReducer.jokerVideo
  };
}
function mapDispatchToProps(dispatch){
  return {
    updateData: function(){
      dispatch(requestData());
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);

/*export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-school"
        label="Read the Expo documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />
    </ScrollView>
  );
}*/

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
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
});

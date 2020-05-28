import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

import { styles } from '../style/homeStyle';

import HomeDetail from "./HomeDetail";

import {requestData} from '../redux/actions/userAction';
import userReducer from "../redux/reducers/userReducer";


/*export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              (!__DEV__)
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />
          <HomeDetail/>
          <Text style={styles.getStartedText}>Open up the code for this screen ok:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>
          <Button
              title="Go to HomeDetail---->"
              onPress={() => navigation.navigate('HomeDetail')}
          />
          <Text style={styles.getStartedText}>
            Change any of the text, save the file, and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
        <Text style={styles.red}>just red</Text>
        <Text style={{
          color: 'blue',
          fontWeight: 'bold',
          fontSize: 30,
        }}>just bigblue</Text>
        <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
        <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View>
    </View>
  );
}*/


class HomeScreen extends Component{

  /*render() {
      return (
          <View>
              <Blink text='I love to blink'/>
              <Blink text='Yes blinking is so great'/>
              <Blink text='Why did they ever take this out of HTML'/>
              <Blink text='Look at me look at me look at me'/>
          </View>
      );

  }*/

    render(){
        const {navigate} = this.props.navigation;
        let {flag,user, jokerVideo} = this.props;
        //user
        let userView = null;
        if (jokerVideo) {
            userView = (<View>
                {/*<Text>姓名：{user.name}</Text>*/}
                {/*<Text>年龄：{user.age}</Text>*/}
                {/*<Text>工作：{user.job}</Text>*/}
                <Text>工作：{jokerVideo[0].text}</Text>

                <Button
                    title="Go to HomeDetail---->"
                    onPress={() => navigate('HomeDetail')}
                />
            </View>);
        }

        return (
            <View>
                {userView}
            </View>
        );
    }
    componentDidMount(){
        console.log(this.props)
        let {updateData} = this.props;
        updateData();
    }
}


class Blink extends Component {
    // 声明state对象
    state = { isShowingText: true };

    componentDidMount() {
        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({
                isShowingText: !this.state.isShowingText
            });
        }, 1000);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        if (!this.state.isShowingText) {
            return null;
        }

        return (
            <Text>{this.props.text}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

/*const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
        shadowOffset: { width: 0, height: -3 },
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
});*/

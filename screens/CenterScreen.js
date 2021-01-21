import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import {Component} from "react";
import { ListItem, Avatar, Icon, ThemeProvider, Button, Badge, Card  } from '../components/react-native-element/index.js'
import {connect} from "react-redux";
import {requestData} from "../redux/actions/userAction";
import {requestData as getShowAdData, updateNetInfoAsync} from "../redux/actions/commonAction";
const theme = {
 /* colors: {
    divider: 'black',
    white: 'white'
  },
  Button: {
    titleStyle: {
      // color: 'white',
    },
  },*/
};


const list = [
  {
    title: 'About',
    icon: 'av-timer'
  },
  {
    title: 'feedBack',
    icon: 'flight-takeoff'
  }
]
const list2 = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]
const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
]
class CenterScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  goAboutPage(){
    this.props.navigation.navigate('About')
  }
  render() {
    const {navigation} =  this.props;
    return (
        <View>

          <ThemeProvider theme={theme}>
            <Card>
              <Card.Title>CARD WITH DIVIDER</Card.Title>
              <Card.Divider/>
              {
                users.map((u, i) => {
                  return (
                      <View key={i} style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: u.avatar }}
                        />
                        <Text style={styles.name}>{u.name}</Text>
                      </View>
                  );
                })
              }
            </Card>
          <ListItem key={0} onPress={() => this.goAboutPage()} bottomDivider>
            <Icon
                  name='rss'
                  type='font-awesome'
                  color='#000'/>
            <ListItem.Content>
              <ListItem.Title>
                feedBack
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="black" />
          </ListItem>
            <ListItem key={1} onPress={() => this.goAboutPage()} bottomDivider>
              <Icon name='arrow-alt-circle-up' type='font-awesome-5' color='#000'/>
              <ListItem.Content>
                <ListItem.Title>
                  Update
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem>
            <ListItem key={2} onPress={() => this.goAboutPage()} bottomDivider>
              <Icon name='info-circle' type='font-awesome-5' color='#000'/>
              <ListItem.Content>
                <ListItem.Title>
                  About
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem>
          </ThemeProvider>

        </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    flag: state.userReducer.flag,
    user: state.userReducer.user,
    showAd: state.commonReducer.showAd,
    internetReachable: state.commonReducer.internetReachable,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateAppUserInfo(params) {
      dispatch(requestData(params));
    },
    getShowAdStatus(params) {
      dispatch(getShowAdData(params));
    },
    setNetInfoData(params) {
      dispatch(updateNetInfoAsync(params))
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CenterScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // paddingVertical: 20,
  },
  contentDes: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e78b7',
  },
});

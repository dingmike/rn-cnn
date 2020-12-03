import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Component} from "react";

class AboutScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {navigation} =  this.props;
    return (
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Welcome to English Ability</Text>
          <Text style={styles.title}>Let's learn English in the simplest way!</Text>
          <Text style={styles.contentDes}>
            Read an English article every day to understand the world in the simplest way!
          </Text>
          <Text style={styles.contentDes}>
            Come on! read more learn more!
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.link}>
            <Text style={styles.linkText}>Go to read!</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

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
export default AboutScreen;

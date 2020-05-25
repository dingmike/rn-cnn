import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  connect
} from 'react-redux';
import {
  Button,
  Carousel,
} from 'antd-mobile-rn';
import {
  syncSetCarouselIndex,
} from '../actions/Actions';

class MineScreen extends React.Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showText: 0
  //   };

    // 每1000毫秒对showText状态做一次取反操作
    // setInterval(() => {
    //   this.setState({
    //     showText: !this.state.showText
    //   });
    // }, 1000);
  // }

  componentDidMount() { //组件加载完成
    // console.log(this.props.children);
  }
  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index);
    // console.log(this)
    // this.props.setCarouselIndex;
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('vertical change to', index);
  }

  // onChange = (value) => {
  //   this.setState({
  //     value
  //   });
  //   console.log(`日期${new Date(value).getFullYear()}`)
  // }
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Text>horizontal</Text>
          <Carousel
            style={styles.wrapper}
            selectedIndex={ this.props.carouselIndex }
            autoplay
            infinite
            afterChange={(index) => this.onHorizontalSelectedIndexChange(this.props.setCarouselIndex(index))}
          >
            <View style={[styles.containerHorizontal, { backgroundColor: 'red' }]}>
              <Text>Carousel 1</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}>
              <Text>Carousel 2</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}>
              <Text>Carousel 3</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'aqua' }]}>
              <Text>Carousel 4</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'fuchsia' }]}>
              <Text>Carousel 5</Text>
            </View>
          </Carousel>
          <Text onPress={ () => this.props.setCarouselIndex(113) }>Carousel will adjust height based on content</Text>
          <Text>{ this.props.carouselIndex }</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  carouselIndex: state.getIn(['mineState', 'carouselIndex']),
})

const mapDispatchToProps = (dispatch) => ({
  setCarouselIndex: (index) => dispatch(syncSetCarouselIndex(index)),
})

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MineScreen);

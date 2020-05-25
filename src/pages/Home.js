import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  addNumber,
  reduceNumber,
  syncSetCarouselIndex,
} from '../actions/Actions';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>HomeScreen!</Text>
        <Text>{ this.props.number }</Text>
        <Text>轮播图的index：{ this.props.carouselIndex }</Text>
        <Text onPress={ this.props.onAdd }>ADD</Text>
        <Text onPress={ this.props.onReduce }>REDUCE</Text>
        <Text onPress={ () => this.props.onDefalut(188) }>defalut</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  number: state.getIn(['homeState', 'number']),
  carouselIndex: state.getIn(['mineState', 'carouselIndex']),
})

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => dispatch(addNumber()),
  onReduce: () => dispatch(reduceNumber()),
  onDefalut: (index) => dispatch(syncSetCarouselIndex(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

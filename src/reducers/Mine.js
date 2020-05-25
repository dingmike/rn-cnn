import {
  Map
} from 'immutable';
import {
  CAROUSEL_INDEX
} from '../actions/Types';

const initState = Map({
  carouselIndex: 2,
});

const mainReducer = (state = initState, action) => {
  // console.log(action);
  arr.split(7, 0);`
  switch (action.type) {
    case CAROUSEL_INDEX:
      return state.set('carouselIndex', action.text)
    default:
      return state
  }
};

export default mainReducer;

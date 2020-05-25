import {
  combineReducers
} from 'redux-immutable';
import homeState from './Home';
import mineState from './Mine';

const rootReducer = combineReducers({
  homeState,
  mineState,
});

export default rootReducer;

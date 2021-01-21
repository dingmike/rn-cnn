import { moderateScale } from '../../react-native-size/index.js';

function normalize(number, factor = 0.25) {
  return moderateScale(number, factor);
}

export default normalize;

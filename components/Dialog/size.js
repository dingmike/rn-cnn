import { Dimensions } from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
console.log('deviceWidthDp', deviceWidthDp, deviceHeightDp);

let uiWidthPx = 375;
console.log('转化比率222', deviceWidthDp / uiWidthPx);
let uiHeightPx = 750;

// 设计图的尺寸是iphone6尺寸 750*1334 dp就是667*375  竖版手机以宽为基准进行转换，横版应该以高为基准开发

export const pTd = uiElePx => {
  return (uiElePx * deviceHeightDp) / uiHeightPx;
};

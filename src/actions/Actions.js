import * as types from './Types';

// export const addNumber = () => {
//   return {
//     type: types.ADD_NUMBER
//   }
// }
// export const reduceNumber = () => {
//   return {
//     type: types.REDUCE_NUMBER
//   }
// }
export const addNumber = () => ({ type: types.ADD_NUMBER });

export const reduceNumber = () => ({ type: types.REDUCE_NUMBER });

export const syncSetCarouselIndex = (text) => ({
  type: types.CAROUSEL_INDEX,
  text
});


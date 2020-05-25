import {
  createBottomTabNavigator
} from 'react-navigation';

import HomeScreen from '../pages/Home';
import MineScreen from '../pages/Mine';

export default createBottomTabNavigator({
  Home: HomeScreen,
  Mine: MineScreen,
});

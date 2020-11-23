import { Ionicons } from '@expo/vector-icons'; // https://icons.expo.fyi/  字体图标源代码 https://ionicons.com/ https://docs.expo.io/guides/icons/#expovector-icons
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      // color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      color={props.color}
    />
  );
}

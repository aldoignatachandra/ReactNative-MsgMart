import React from 'react';
import {
  Image,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

//Content
import Order from './Order';
import History from './History';
import DataCategory from './DataCategory';
import DataProduct from './DataProduct';

const TabNavigator = createBottomTabNavigator({
  Order: {
    screen: Order,
    navigationOptions: {
      tabBarLabel: 'Order',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{width: 25, height: 25}} color={tintColor} source={require('../images/ImageOrder.png')} />
      ),
    }
  },
  DataProduct: {
    screen: DataProduct,
    navigationOptions: {
      tabBarLabel: 'Product',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{width: 25, height: 25}} color={tintColor} source={require('../images/ImageProduct.png')} />
      ),
    }
  },
  DataCategory: {
    screen: DataCategory,
    navigationOptions: {
      tabBarLabel: 'Category',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{width: 25, height: 25}} color={tintColor} source={require('../images/ImageCategory.png')} />
      ),
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{width: 25, height: 25}} color={tintColor} source={require('../images/ImageBill.png')} />
      ),
    }
  }
},{//router config
  initialRouteName: 'Order',
  order: ['Order','DataProduct','DataCategory','History'],
  //navigation for complete tab navigator
  navigationOptions: {
    tabBarVisible: false
  },
  tabBarOptions: {
    activeTintColor: '#ffce1e',
    inactiveTintColor: 'grey',
  },
})

const TabNavigation = createAppContainer(TabNavigator);
export default TabNavigation;
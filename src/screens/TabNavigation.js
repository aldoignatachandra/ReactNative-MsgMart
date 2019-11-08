import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

//Content
import Order from './Order';
import History from './History';
import DataCategory from './DataCategory';
import DataProduct from './DataProduct';
import Profile from './Profile';

const TabNavigator = createBottomTabNavigator({
  Order: {
    screen: Order,
    navigationOptions: {
      tabBarLabel: 'Order'
    }
  },
  DataProduct: {
    screen: DataProduct,
    navigationOptions: {
      tabBarLabel: 'Product',
    }
  },
  DataCategory: {
    screen: DataCategory,
    navigationOptions: {
      tabBarLabel: 'Category',
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
    }
  }
},{
  //router config
  initialRouteName: 'Order',
  order: ['Order','DataProduct','DataCategory','History','Profile'],
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({focused}) => {
      const { routeName } = navigation.state;
      let focus = focused ? {width: 27, height: 27} : {width: 22, height: 22};
      let sourceImage;
      
      if (routeName === 'Order') {
        sourceImage = focused ? require('../images/ImageOrderSelected.png') : require('../images/ImageOrder.png');
      } else if (routeName === 'DataProduct') {
        sourceImage = focused ? require('../images/ImageProductSelected.png') : require('../images/ImageProduct.png');
      } else if (routeName === 'DataCategory') {
        sourceImage = focused ? require('../images/ImageCategorySelected.png') : require('../images/ImageCategory.png');
      } else if (routeName === 'History') {
        sourceImage = focused ? require('../images/ImageBillSelected.png') : require('../images/ImageBill.png');
      } else {
        sourceImage = focused ? require('../images/ImageUserSelected.png') : require('../images/ImageUser.png');
      }
      
      return <Image style={focus} source={sourceImage} />;
    },
    tabBarOptions: {
      activeTintColor: '#ffce1e',
      inactiveTintColor: 'grey',
      style: {
        borderTopWidth: 0,
      }
    },   
  }),
})

const TabNavigation = createAppContainer(TabNavigator);
export default TabNavigation;
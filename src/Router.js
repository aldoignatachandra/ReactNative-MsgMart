import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from './screens/Login';
import Register from './screens/SignUp';
import TabNavigation from './screens/TabNavigation';

const StackAuth = createStackNavigator(
    {
      Login,
      Register,
    },
    {
      initialRouteName: 'Login',
      headerMode: 'none',
    }
);
  
const StackHome = createStackNavigator(
    {
        TabNavigation,
    },
    {
      initialRouteName: 'TabNavigation',
      headerMode: 'none',
    }
);
  
const Router = createStackNavigator(
    {
      StackAuth,
      StackHome,
    },
    {
      initialRouteName: 'StackAuth',
      headerMode: 'none',
    }
);

export default createAppContainer(Router);
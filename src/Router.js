import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from './screens/Login';
import Register from './screens/SignUp';
import TabNavigation from './screens/TabNavigation';
import AddProduct from '../src/screens/AddProduct';
import EditProduct from '../src/screens/EditProduct';
import AddCategory from '../src/screens/AddCategory';
import EditCategory from '../src/screens/EditCategory';

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
        AddProduct,
        AddCategory,
        EditProduct,
        EditCategory
    },
    {
      initialRouteName: 'TabNavigation',
      headerMode: 'none',
    }
);
  
const Router = createSwitchNavigator(
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
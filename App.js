import React, { useEffect } from 'react';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import Router from "./src/Router";
import store from "./src/Redux/Store";
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {

    const timeOut = setTimeout(() => { 
      SplashScreen.hide();
    }, 2000);

    return () => {
      clearTimeout(timeOut)
    }
  });

  return (
    <Root>
      <Provider store={store}>
        <Router/>
      </Provider>
    </Root>  
  )
}

export default App;
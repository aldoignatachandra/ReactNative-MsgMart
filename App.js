import React from 'react';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import Router from "./src/Router";
import store from "./src/Redux/Store";

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <Router/>
      </Provider>
    </Root>  
  )
}

export default App;
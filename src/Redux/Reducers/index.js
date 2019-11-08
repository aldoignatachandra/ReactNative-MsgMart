import product from './product';
import categories from './categories';
import auth from './auth';
import {combineReducers} from "redux";

export default combineReducers({
  auth,
  product,
  categories
})
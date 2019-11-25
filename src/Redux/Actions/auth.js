import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const register = (input) => {
  return {
    type: 'REGISTER',
    payload: axios.post('https://pointofsalesapp.herokuapp.com/api/user/register/',input)
  };
};

export const login = (input) => {
  return {
    type: 'LOGIN',
    payload: axios.post('https://pointofsalesapp.herokuapp.com/api/user/login/',input)
  };
};

export const getItem = () => {
  return {
    type: 'ITEM',
    payload: AsyncStorage.getItem('user')
  }
}
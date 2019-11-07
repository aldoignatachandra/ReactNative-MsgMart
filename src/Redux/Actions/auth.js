import axios from 'axios';

export const register = (input) => {
  console.log(input);
  return {
    type: 'REGISTER',
    payload: axios.post('http://192.168.100.104:4000/api/user/register/',input)
  };
};

export const login = (input) => {
  return {
    type: 'LOGIN',
    payload: axios.post('http://192.168.100.104:4000/api/user/login/',input)
  };
};
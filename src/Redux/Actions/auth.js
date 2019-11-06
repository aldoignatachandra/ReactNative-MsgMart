import axios from 'axios';

export const register = (input) => {
  return {
    type: 'REGISTER',
    payload: axios.post(`${process.env.BASE_URL}/user/register`, input)
  };
};

export const login = (input) => {
  return {
    type: 'LOGIN',
    payload: axios.post(`${process.env.BASE_URL}/user/login`, input)
  };
};
import axios from 'axios';

const appApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default appApi;

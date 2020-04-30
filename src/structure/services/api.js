import axios from 'axios';

const Marvel = axios.create({
  baseURL: 'https://gateway.marvel.com:443'
});

export default Marvel;
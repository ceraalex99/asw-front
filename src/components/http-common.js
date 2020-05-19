import axios from 'axios';

export const HTTP = axios.create({
    baseURL: 'https://asw-practica.herokuapp.com/api',
    headers: {
        'Authorization': '116657711548273130761',
        'Accept':'application/json'
    }
});

delete axios.defaults.headers.common.Accept;

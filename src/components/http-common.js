import axios from 'axios';

export const HTTP = axios.create({
    baseURL: 'https://asw-practica.herokuapp.com/api',
    headers: {
        'Accept':'application/json'
    }
});

delete axios.defaults.headers.common.Accept;

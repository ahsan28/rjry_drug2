import axios from 'axios';
import authHeader from './auth.header';

const api = 'http://localhost:5000/';

const getAll = () => {
    return axios.get(api+'getAll', { headers: authHeader() });
}

const read = (title) => {
    return axios.get(api+title, { headers: authHeader() });
}

const createAll = () => {
    return axios.get(`${api}createAll`, { headers: authHeader() });
}

const functions = {
    read,
    createAll,
    getAll,
}

export default functions


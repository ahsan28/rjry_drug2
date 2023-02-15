import axios from 'axios';
import authHeader from './auth.header';

const api = 'http://localhost:5000/'; //'http://localhost:5000/'||"https://rjrydrug.herokuapp.com/"


const getAll = () => {
    return axios.get(api+'getAll', { headers: authHeader() });
}

const read = (title) => {
    return axios.get(api+title, { headers: authHeader() });
}

const createAll = () => {
    return axios.get(`${api}createAll`, { headers: authHeader() });
}

const save = (data) => {
    return axios.put(api+data.title, data, { headers: authHeader() });
}

const functions = {
    read,
    createAll,
    getAll,
    save,
}

export default functions


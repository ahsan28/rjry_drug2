import axios from 'axios';

const api = 'http://localhost:5000/';

const getAll = () => {
    return axios.get(api+'getAll');
}

const read = (title) => {
    return axios.get(api+title);
}

const createAll = () => {
    return axios.get(`${api}createAll`);
}

const functions = {
    read,
    createAll,
    getAll,
}

export default functions


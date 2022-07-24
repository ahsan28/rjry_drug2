import axios from 'axios';

const api = 'http://localhost:5000/entries';

const getAll = () => {
    return axios.get(api+'/getAll');
}

const create = (entry) => {
    return axios.post(api+'/new', entry);
}

const update = (entry) => {
    return axios.put(api+'/update', entry);
}

const functions = {
    getAll,
    create,
    update,
}

export default functions


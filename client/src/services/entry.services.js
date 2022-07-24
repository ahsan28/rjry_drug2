import axios from 'axios';

const api = 'http://localhost:5000/entries';

const get = (id) => {
    return axios.get(`${api}/get/${id}`);
}

const getAll = () => {
    return axios.get(api+'/getAll');
}

const create = (entry) => {
    return axios.post(api+'/new', entry);
}

const update = (entry) => {
    return axios.put(api+'/update', entry);
}

const remove = (id) => {
    return axios.delete(`${api}/remove/${id}`);
}

const functions = {
    get,
    getAll,
    create,
    update,
    remove,
}

export default functions


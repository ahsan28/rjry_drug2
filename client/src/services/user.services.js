import axios from 'axios';

const api = 'http://localhost:5000/users';

const getAll = () => {
    return axios.get(api+'/getAll');
}

const functions = {
    getAll,
}

export default functions


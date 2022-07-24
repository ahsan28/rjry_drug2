import axios from 'axios';

const api = 'http://localhost:5000/users';

const getAll = () => {
    console.log('UserService.js')
    return axios.get(api+'/getAll');
}

const functions = {
    getAll,
}

export default functions


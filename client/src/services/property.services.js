import axios from 'axios';

const api = 'http://localhost:5000/properties';

const getAll = () => {
    console.log('PropertyService.js')
    return axios.get(api+'/getAll');
}

const functions = {
    getAll,
}

export default functions


import axios from 'axios';
import authHeader from './auth.header';

const api = 'http://localhost:5000/media';

const getAll = () => {
    console.log('MediaService.js')
    return axios.get(api+'/getAll', { headers: authHeader() });
}

const functions = {
    getAll,
}

export default functions


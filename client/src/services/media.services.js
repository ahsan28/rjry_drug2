import axios from 'axios';

const api = 'http://localhost:5000/media';

const getAll = () => {
    console.log('MediaService.js')
    return axios.get(api+'/getAll');
}

const functions = {
    getAll,
}

export default functions


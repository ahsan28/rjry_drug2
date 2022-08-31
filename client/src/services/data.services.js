import axios from 'axios';

const api = 'http://localhost:5000/';

const getAll = () => {
    console.log('MediaService.js')  
    return axios.get(api+'getAll');
}

const createAll = () => {
    return axios.get(`${api}createAll`);
}

const functions = {
    createAll,
    getAll,
}

export default functions


import axios from 'axios';
import authHeader from './auth.header';



const api = 'https://x.sekolahbebasdadah.tel/data/'; 
// const api = 'http://localhost:5000/data/'  // "https://rjrydrug.herokuapp.com/data/"


const getAll = () => {
    return axios.get(api+'getAll', { headers: authHeader() });
}

const read = (name) => {
    return axios.get(api+name, { headers: authHeader() });
}

const createAll = () => {
    return axios.get(`${api}createAll`, { headers: authHeader() });
}

const save = (data, page) => {
    return axios.put(api+page, data, { headers: authHeader() });
}

const upload = (data) => {
    return axios.post(api+'upload', data, { headers: authHeader() })
}

const functions = {
    read,
    createAll,
    getAll,
    save,
    upload,
}

export default functions

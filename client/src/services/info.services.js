import axios from 'axios';
import authHeader from './auth.header';



const api = 'https://back.sekolahbebasdadah.tel/info/'; 
// const api = 'http://localhost:5000/info/'  // "https://rjrydrug.herokuapp.com/info/"


const read = (id) => {
    return axios.get(api+id, { headers: authHeader() });
}

const readAll = () => {
    return axios.get(api+'readAll', { headers: authHeader() });
}

const create = (data) => {
    return axios.post(api+'create', data, { headers: authHeader() });
}

const update = (data) => {
    return axios.put(api+'update', data, { headers: authHeader() });
}

const remove = (id) => {
    return axios.delete(api+'remove/'+id, { headers: authHeader() });
}

const functions = {
    read,
    readAll,
    create,
    update,
    remove,
    
}

export default functions

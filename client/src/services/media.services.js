import axios from 'axios';
import authHeader from './auth.header';

const api = 'https://x.sekolahbebasdadah.tel/media/'; 
// const api = 'http://localhost:5000/media/'  // "https://rjrydrug.herokuapp.com/"

const read = (id) => {
    return axios.get(api+id, { headers: authHeader() });
}

const loadImage = (id) => {
    return axios.get(`${api}loadImage/${id}`, { responseType: "blob" })
}

const loadFile = (id) => {
    return axios.get(`${api}loadFile/${id}`, { responseType: "blob" })
}

const updateFile = (data) => {
    return axios.put(api+'update', data, { headers: authHeader() });
}


const functions = {
    read,
    loadImage,
    loadFile,
    updateFile
}

export default functions
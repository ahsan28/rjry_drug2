import axios from 'axios';
import authHeader from './auth.header';

// const api = 'https://back.sekolahbebasdadah.tel/media/'; 
const api = 'http://localhost:5000/media/'  // "https://rjrydrug.herokuapp.com/"

const read = (id) => {
    return axios.get(api+id, { headers: authHeader() });
}

const loadImage = (id) => {
    return axios.get(`${api}loadImage/${id}`, { responseType: "blob" })
}


const functions = {
    read,
    loadImage,
}

export default functions
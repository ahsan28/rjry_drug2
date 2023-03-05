import axios from 'axios';
import authHeader from './auth.header';

// const api = 'https://back.sekolahbebasdadah.site/media/'; 
const api = 'http://localhost:5000/media/'  // "https://rjrydrug.herokuapp.com/"

const read = (id) => {
    console.log('MediaService.js')
    return axios.get(api+id, { headers: authHeader() });
}

const functions = {
    read,
}

export default functions


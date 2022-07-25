import axios from 'axios';

const api = 'http://localhost:5000/';

const getStats = (year) => {
    return axios.get(`${api}stats/${year}`);
}


const functions = {
    getStats,
}

export default functions


import axios from 'axios';

const api = 'http://localhost:5000/contracts';

const getAll = () => {
    console.log('ContractService.js')
    return axios.get(api+'/getAll');
}

const functions = {
    getAll,
}

export default functions


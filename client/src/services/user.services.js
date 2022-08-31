import axios from 'axios';

const api = 'http://localhost:5000/users';

const read = (username) => {
    return axios.get(`${api}/${username}`);
}

const signup = (user) => {
    return axios.post(`${api}/signup`, user);
}

const login = (user) => {
    return axios.post(`${api}/login`, user);
}

const functions = {
    read,
    signup,
    login,
}

export default functions


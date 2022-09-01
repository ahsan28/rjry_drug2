import axios from 'axios';
import authHeader from './auth.header';

const api = 'http://localhost:5000/users';

const get = (username) => {
    return axios.get(`${api}/${username}`);
}

const register = (user) => {
    return axios.post(`${api}/signup`, user, { headers: authHeader() });
}

const login = (user) => {
    return axios.post(`${api}/login`, user, { headers: authHeader() })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/";
}


const functions = {
    get,
    register,
    login,
    getCurrentUser,
    logout,
}

export default functions


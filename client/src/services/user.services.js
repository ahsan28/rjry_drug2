import axios from 'axios';
import authHeader from './auth.header';

// const api = 'https://back.sekolahbebasdadah.site/users/'; 
const api = 'http://localhost:5000/users/' // "https://rjrydrug.herokuapp.com/"

const get = (username) => {
    return axios.get(`${api}${username}`);
}

const updateLinks = (data,username) => {
    return axios.put(`${api}updateLinks/${username}`, data, { headers: authHeader() });
}

const updateProfile = (data,username) => {
    return axios.put(`${api}updateProfile/${username}`, data, { headers: authHeader() });
}

const register = (user) => {
    return axios.post(`${api}signup`, user, { headers: authHeader() });
}

const login = (user) => {
    return axios.put(`${api}login`, user, { headers: authHeader() })
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

const sendEmail = (email) => {
    return axios.post(`${api}send`, email, { headers: authHeader() });
}


const functions = {
    get,
    updateLinks,
    updateProfile,
    register,
    login,
    getCurrentUser,
    logout,
    sendEmail,
}

export default functions


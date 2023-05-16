import axios from 'axios';
import authHeader from './auth.header';

const api = 'https://back.sekolahbebasdadah.tel/users/'; 
// const api = 'http://localhost:5000/users/' // "https://rjrydrug.herokuapp.com/"

const get = (uid) => {
    return axios.get(`${api}read/${uid}`);
}

const readAll = () => {
    return axios.get(`${api}readAll`, { headers: authHeader() });
}

const updateLinks = (data,username) => {
    return axios.put(`${api}updateLinks/${username}`, data, { headers: authHeader() });
}

const updateProfile = (data,username) => {
    return axios.put(`${api}updateprofile/${username}`, data, { headers: authHeader() });
}

const createMember = (data) => {
    return axios.post(`${api}createmember`, data, { headers: authHeader() });
}

const updateMember = (data) => {
    return axios.put(`${api}updatemember`, data, { headers: authHeader() });
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

const getSettings = (id=null) => {
    if (!id) return axios.get(`${api}settings`, { headers: authHeader() });
    else return axios.get(`${api}settings/${id}`, { headers: authHeader() });
}

const updateSettings = (userid,data) => {
    return axios.put(`${api}settings/${userid}`, data, { headers: authHeader() });
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
    readAll,
    updateLinks,
    updateProfile,
    createMember,
    updateMember,
    register,
    login,
    getCurrentUser,
    getSettings,
    updateSettings,
    logout,
    sendEmail,
}

export default functions


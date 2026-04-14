import axios from 'axios';

const API = axios.create({
    // Ab ye local se hat kar Vercel ke live server par connect hoga
    baseURL: 'https://tutorhub-backend.vercel.app/api' 
});

export default API;
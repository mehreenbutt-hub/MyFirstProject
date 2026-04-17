import axios from 'axios';

const API = axios.create({
    // Ab ye local se hat kar Vercel ke live server par connect hoga
    baseURL: 'https://tutorhub-backend-production.up.railway.app/api' 
});

export default API;
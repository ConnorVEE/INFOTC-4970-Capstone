// src/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
    // Our backend
    baseURL: 'http://localhost:5000/api', 
    // Tells Axios to send cookies with every request
    withCredentials: true, 
});

export default axiosInstance;

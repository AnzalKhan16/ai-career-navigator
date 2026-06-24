import axios from 'axios';

// Create an Axios instance with base URL pointing to our backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this if your backend runs on a different port in production
});

// Add a request interceptor to automatically attach the JWT token
API.interceptors.request.use(
  (config) => {
    // Check if there is a user stored in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // If a user with a token exists, attach it to the Authorization header
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

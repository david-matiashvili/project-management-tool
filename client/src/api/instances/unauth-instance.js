import axios from 'axios';
export const axiosUnauthInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

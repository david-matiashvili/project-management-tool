import axios from 'axios';
import {Cookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';


// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout: 10000,
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const cookies = new Cookies();
        const token = cookies.get('accessToken'); // Retrieve token from cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors, especially 401
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const cookies = new Cookies();
            const navigate = useNavigate();

            // Clear token and other user-related cookies
            cookies.remove('token', {path: '/'});

            navigate('/login');
            console.error('Unauthorized access - logging out...');
        }

        return Promise.reject(error);
    }
);

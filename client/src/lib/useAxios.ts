import axios from 'axios';

export const baseAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.BACKEND_API_DEV : process.env.BACKEND_API_PROD,
    withCredentials: true
});

const useAxios = () => {

    // baseAxios.interceptors.request.use((config) => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    // });

    // baseAxios.interceptors.response.use((response) => {
    //     return response;
    // }, (error) => {
    //     if (error.response.status === 401 || error.response.status === 403) {
    //         localStorage.removeItem('token');
    //         window.location.href = '/login';
    //     }
    //     return Promise.reject(error);
    // });

    return baseAxios;

};

export default useAxios;
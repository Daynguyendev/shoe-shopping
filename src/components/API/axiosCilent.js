import axios from "axios";


const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: { // các header của request
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
    },

});

// axiosClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosClient.interceptors.request.use(
//     async config => {
//         const token = localStorage.getItem('token');
//         config.headers = {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//         return config;
//     },
//     error => {
//         Promise.reject(error)
//     });



export default axiosClient;
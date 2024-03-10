import axios from "axios";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

const handleRefreshToken = async () => {
    // const res = await instance.get('/api/v1/auth/refresh')
    // if (res && res.data) return res.data.access_token
    // else null

    return await mutex.runExclusive(async () => {
        const res = await instance.get('/api/v1/auth/refresh');
        if (res && res.data) return res.data.access_token;
        else return null;
    });
}

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (typeof window !== "undefined" && window && window.localStorage &&
        window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

const NO_RETRY_HEADER = 'x-no-retry'

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.config && error.response
        && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        const access_token = await handleRefreshToken()
        error.config.headers[NO_RETRY_HEADER] = 'true'
        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`
            localStorage.setItem('access_token', access_token)
            return instance.request(error.config);
        }
    }
    if (error.config && error.response
        && +error.response.status === 400
        && error.config.url === '/api/v1/auth/refresh'
    ) {
        window.location.href = '/login'
    }

    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance
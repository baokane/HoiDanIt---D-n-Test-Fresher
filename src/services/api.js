import axios from "../ultils/axios-customize";

const postRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {
        fullName, email, password, phone
    })
}

const postLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', {
        username, password
    })
}

const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

const postLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

const getFetchListUser = (current, pageSize) => {
    return axios.get(`/api/v1/user?current=${current}&pageSize=${pageSize}`)
}

export { postRegister, postLogin, callFetchAccount, postLogout, getFetchListUser }
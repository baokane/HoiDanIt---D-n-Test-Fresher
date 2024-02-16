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

const getFetchListUser = (query) => {
    return axios.get(`/api/v1/user?${query}`)
}

const postCreateUserAdmin = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', { fullName, password, email, phone })
}

const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data)
}

const putUpdateUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone })
}

export {
    postRegister, postLogin, callFetchAccount, postLogout,
    getFetchListUser, postCreateUserAdmin, callBulkCreateUser,
    putUpdateUser
}
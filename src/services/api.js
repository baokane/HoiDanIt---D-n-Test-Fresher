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

const deleteUserAdmin = (id) => {
    return axios.delete(`/api/v1/user/${id}`)
}


const getListBookWithPaginate = (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

const getCategoryBook = () => {
    return axios.get(`/api/v1/database/category`)
}

const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}

const postCreateBook = (query) => {
    return axios.post(`/api/v1/book`, query)
}

const putUpdateBook = (id, mainText, author, price, category, quantity, sold, thumbnail, slider) => {
    return axios.put(`/api/v1/book/${id}`, {
        mainText, author, price, category, quantity, sold, thumbnail, slider
    })
}

const deleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`)
}

export {
    postRegister, postLogin, callFetchAccount, postLogout,
    getFetchListUser, postCreateUserAdmin, callBulkCreateUser,
    putUpdateUser, deleteUserAdmin, getListBookWithPaginate,
    getCategoryBook, callUploadBookImg, postCreateBook,
    putUpdateBook, deleteBook
}
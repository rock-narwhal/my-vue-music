import axios from 'axios'

const base_url = 'http://localhost:3000'

function handleError(err) {
    if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        Promise.reject({
            data: err.response.data,
            code: 11,
            msg: '请求错误'
        })
    } else if (err.request) {
        console.log(err.request)
        Promise.reject({
            data: null,
            code: 22,
            msg: '无响应'
        })
    } else {
        console.log('error : ', err.message)
        Promise.reject({
            data: null,
            code: 33,
            msg: err.message
        })
    }
}

export const get = (url, params) => {
    params = params || {}
    return axios.get(
        base_url + url, { params }
    ).then(res => res.data)
        .catch(err => handleError(err))
}

export const post = (url, data, headers, params) => {
    params = params || {}
    return axios.post(
        base_url + url, data, { headers, params }
    ).then(res => res.data)
        .catch(err => handleError(err))
}

export const getBlob = (url, params, headers) => {
    axios.get(base_url + url, { params, headers, responseType: 'blob' })
        .then(res => res.data)
        .catch(err => handleError)
}
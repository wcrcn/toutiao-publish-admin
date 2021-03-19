import axios from 'axios'
import JsonBig from 'json-bigint'
const requst = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JsonBig.parse(data)
    } catch (error) {
      console.log(error)
    }
    return data
  }]
})
// Add a request interceptor
requst.interceptors.request.use(function (config) {
  const user = window.localStorage.getItem('user')
  config.headers.Authorization = `Bearer ${user}`
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default requst

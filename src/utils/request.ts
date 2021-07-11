import axios from 'axios'

const service = axios.create({
  timeout: 5000
})

//-- request interceptors
service.interceptors.request.use( 
  config => {
  return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

//-- response interceptors
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code !== 200){
      return Promise.reject(res.error || '网络请求错误')
    }
    return res
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service;
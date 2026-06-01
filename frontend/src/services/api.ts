
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

api.interceptors.response.use(
  res => res,
  err => {
    alert(err.response?.data?.message || 'Something went wrong')
    return Promise.reject(err)
  }
)

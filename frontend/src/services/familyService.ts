
import { api } from './api'
export const getFamilies = () => api.get('/families')
export const addFamily = (data: any) => api.post('/families', data)

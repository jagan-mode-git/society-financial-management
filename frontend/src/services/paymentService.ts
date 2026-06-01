
import { api } from './api'
export const getPayments = () => api.get('/payments')
export const addPayment = (data: any) => api.post('/payments', data)

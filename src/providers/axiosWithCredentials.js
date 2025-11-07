import axios from 'axios'
import { getCookie } from '../redux/cookies'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const axiosWithCredentials = axios.create({
  baseURL: BASE_URL,
})

axiosWithCredentials.interceptors.request.use((config) => {
  try {
    const token = getCookie('auth.token')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } catch (_e) {}
  return config
})

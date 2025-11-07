import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL

export const login = async (payload) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, payload)
    return response.data
}

export const register = async (payload) => {
    const response = await axios.post(`${BASE_URL}/auth/signup`, payload)
    return response.data
}


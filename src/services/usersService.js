import { axiosWithCredentials } from "../providers/axiosWithCredentials"
const BASE_URL = import.meta.env.VITE_BASE_URL
import axios from "axios"

export const getUserProfile = async () => {
    const response = await axiosWithCredentials.get(`${BASE_URL}/user/profile/`)
    return response.data
}

export const getUserStats = async () => {
    const response = await axiosWithCredentials.get(`${BASE_URL}/user/stats/`)
    return response.data
}

export const updateUserProfile = async (userId, payload) => {
  const response = await axiosWithCredentials.patch(
    `${BASE_URL}/user/edit-profile/${userId}`,
    payload
  );
  return response.data;
};


export const changePassword = async (payload) => {
    const response = await axiosWithCredentials.post(`${BASE_URL}/users/change-password/`, payload)
    return response.data
}

export const forgotPassword = async (payload) => {
    const response = await axios.post(`${BASE_URL}/users/forgot-password/`, payload)
    return response.data
}
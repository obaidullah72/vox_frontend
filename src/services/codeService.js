import { axiosWithCredentials } from "../providers/axiosWithCredentials"
const BASE_URL = import.meta.env.VITE_BASE_URL
import axios from "axios"

export const generateCode = async (payload) => {
    const response = await axiosWithCredentials.post(`${BASE_URL}/LLM/generate-code`, payload)
    return response.data
}

export const getGists = async () => {
    const response = await axiosWithCredentials.get(`${BASE_URL}/user/my-gists`)
    return response.data
}
// UPDATED: Fetch saved codes with userId in path
export const getSavedCodes = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const response = await axiosWithCredentials.get(
    `${BASE_URL}/user/my-saved-codes/${userId}`
  );
  return response.data; // { message, data: [...] }
};
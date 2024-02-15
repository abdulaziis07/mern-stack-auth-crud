import axios from 'axios';

export const instance = axios.create({
  baseUrl: import.meta.env.VITE_LOCAL_API_BASE_URL
})
import axios from 'axios'
import { getUserLocalStorage, LogoutRequest, setUserLocalStorage } from '../context/AuthProvider/util'
import { useAuth } from '../context/AuthProvider/useAuth'


export const api = axios.create({
  baseURL: "http://localhost:8080/",
})

let lastRefresh = 0
const fifteenMinutes = 15 * 60 * 1000

api.interceptors.request.use(
  async (config) => {
    const user = getUserLocalStorage()
    if (user) {
      const now = new Date().getTime()
      if (now - lastRefresh > fifteenMinutes) {
        try {          
          lastRefresh = now
          const response = await api.post('/auth/refresh', {
            refreshToken: user.refreshToken,
          })
          const { accessToken, refreshToken } = response.data
          setUserLocalStorage({
            ...user,
            accessToken,
            refreshToken,
          })
        } catch {
          console.log('error')	
        }
      }
      config.headers!.Authorization = `Bearer ${user.accessToken}`
      return config
    }
    const token = user?.access_token
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
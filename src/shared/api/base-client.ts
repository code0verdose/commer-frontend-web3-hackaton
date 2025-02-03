import { Constants } from '@shared/lib'
import { Stores } from '@shared/service'
import { AuthTokens, BaseApiResponse } from '@shared/types'
import axios from 'axios'
import toast from 'react-hot-toast'

const instance = axios.create({
  baseURL: Constants.BASE_API_URL,
})

instance.interceptors.request.use((config) => {
  const { accessToken } = Stores.useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

const refreshTokens = async () => {
  const { data } = await instance.post<BaseApiResponse<AuthTokens>>('/auth/refresh')
  return data.data
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      try {
        const tokens = await refreshTokens()
        Stores.useAuthStore.getState().setTokens({ ...tokens })
        instance.request({ ...error.config })
      } catch {
        toast.error('User not authorized')
        Stores.useAuthStore.getState().resetTokens()
      }
    }
    throw error
  },
)

export { instance as baseClient }

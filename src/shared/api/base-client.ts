import { Constants } from '@shared/lib'
import { Stores } from '@shared/service'
import { AuthTokens, BaseApiResponse } from '@shared/types'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { SharedLib } from '..'

export const queryClient = new QueryClient()

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
  const payload = {
    refreshToken: localStorage.getItem(SharedLib.Enums.LocalStorageKey.RefreshToken),
    accessToken: localStorage.getItem(SharedLib.Enums.LocalStorageKey.AccessToken),
  }
  const { data } = await instance.post<BaseApiResponse<AuthTokens>>(
    '/auth/refresh',
    payload,
  )
  return data.data
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
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

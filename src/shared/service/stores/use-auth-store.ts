import { Enums } from '@shared/lib'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

type AuthStore = {
  accessToken: string | null
  refreshToken: string | null
  isAuth: boolean
  setupTokens: () => void
  setTokens: (payload: { accessToken?: string; refreshToken?: string }) => void
  resetTokens: () => void
  checkIsAuth: () => boolean
  setIsAuth: (param: boolean) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuth: false,

  checkIsAuth: () => {
    const { accessToken } = useAuthStore.getState()
    if (!accessToken) return false

    try {
      const decoded: { exp: number } = jwtDecode(accessToken)
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp > currentTime
    } catch (e) {
      return false
    }
  },
  setIsAuth: (isAuth) => set(() => ({ isAuth })),
  setupTokens: () =>
    set(() => {
      const accessToken = window.localStorage.getItem(Enums.LocalStorageKey.AccessToken)
      const refreshToken = window.localStorage.getItem(Enums.LocalStorageKey.RefreshToken)
      return { accessToken, refreshToken }
    }),
  setTokens: (payload) =>
    set((state) => {
      const newAccessToken = payload.accessToken ?? state.accessToken
      const newRefreshToken = payload.refreshToken ?? state.refreshToken

      if (payload.accessToken) {
        window.localStorage.setItem(
          Enums.LocalStorageKey.AccessToken,
          payload.accessToken,
        )
      }
      if (payload.refreshToken) {
        window.localStorage.setItem(
          Enums.LocalStorageKey.RefreshToken,
          payload.refreshToken,
        )
      }

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    }),
  resetTokens: () =>
    set(() => {
      window.localStorage.clear()
      return { accessToken: null, refreshToken: null }
    }),
}))

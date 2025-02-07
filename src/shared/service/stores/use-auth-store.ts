import { Enums } from '@shared/lib'
import { create } from 'zustand'

type AuthStore = {
  accessToken: string | null
  refreshToken: string | null
  setupTokens: () => void
  setTokens: (payload: { accessToken?: string; refreshToken?: string }) => void
  resetTokens: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  accessToken: null,
  refreshToken: null,
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

import { Enums } from '@shared/lib'
import { create } from 'zustand'

type TAuthStore = {
  accessToken: string | null
  refreshToken: string | null
  setupTokens: () => void
  setTokens: (payload: { accessToken?: string; refreshToken?: string }) => void
  resetTokens: () => void
}

export const useAuthStore = create<TAuthStore>()((set) => ({
  accessToken: null,
  refreshToken: null,
  setupTokens: () =>
    set(() => {
      const accessToken = window.localStorage.getItem(Enums.LocalStorageKey.AccessToken)
      const refreshToken = window.localStorage.getItem(Enums.LocalStorageKey.RefreshToken)
      return { accessToken, refreshToken }
    }),
  setTokens: (payload) =>
    set((state) => ({
      accessToken: payload.accessToken ?? state.accessToken,
      refreshToken: payload.refreshToken ?? state.refreshToken,
    })),
  resetTokens: () =>
    set(() => {
      window.localStorage.clear()
      return { accessToken: null, refreshToken: null }
    }),
}))

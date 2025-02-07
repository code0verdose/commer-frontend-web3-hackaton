import { SharedService } from '@shared/index'
import { AccountService } from '@units/account'

export const useAccount = () => {
  const handleGetNonce = async (address: `0x${string}`) => {
    const nonce = await AccountService.Queries.getNonce(address)
    return nonce
  }

  const handleSignIn = async (address: `0x${string}`, signature: string) => {
    const { data: tokensData } = await AccountService.Mutations.signIn(address, signature)
    if (tokensData.accessToken && tokensData.refreshToken) {
      SharedService.Stores.useAuthStore.getState().setTokens(tokensData)
      SharedService.Stores.useAuthStore.getState().setIsAuth(true)
    }
    return tokensData
  }

  return { handleGetNonce, handleSignIn }
}

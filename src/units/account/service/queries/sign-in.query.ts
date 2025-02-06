import { SharedApi, SharedLib } from '@shared/index'
import { AuthControllerApi } from '@units/account/api'
import toast from 'react-hot-toast'

export const signIn = async (address: `0x${string}`, signature: string) => {
  try {
    const authController = AuthControllerApi.getInstance(SharedApi.baseClient)
    return await authController.signIn({ walletAddress: address, signature })
  } catch (error) {
    toast.error(SharedLib.Utils.responseErrorParser(error) || 'Failed to sign in')
    throw error
  }
}

import { SharedApi, SharedLib } from '@shared/index'
import { AuthControllerApi } from '@units/account/api'
import toast from 'react-hot-toast'

export const getNonce = async (walletAddress: string) => {
  try {
    const authController = AuthControllerApi.getInstance(SharedApi.baseClient)
    return await authController.getNonce(walletAddress)
  } catch (error) {
    toast.error(SharedLib.Utils.responseErrorParser(error) || 'Failed to get nonce')
    throw error
  }
}

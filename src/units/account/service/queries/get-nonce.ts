import { SharedApi } from '@shared/index'
import { AuthControllerApi } from '@units/account/api'

export const getNonce = async (walletAddress: string) => {
  const authController = AuthControllerApi.getInstance(SharedApi.baseClient)

  return authController.getNonce(walletAddress)
}

import { AccountService } from '@units/account'

export const useAccount = () => {
  const handleLogin = async (address: `0x${string}`) => {
    const nonce = await AccountService.Queries.getNonce(address)
    console.log(nonce)
  }

  return { handleLogin }
}

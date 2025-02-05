import { SharedService } from '@shared/index'
import {
  connect,
  Connector,
  CreateConnectorFn,
  disconnect,
  getAccount,
} from '@wagmi/core'
import { Web3Config } from '@web3/index'
import toast from 'react-hot-toast'
import { useAccount, useBalance } from 'wagmi'

interface UseWalletOptions {
  onConnect?: () => void
  onDisconnect?: () => void
}

export const useWallet = (options?: UseWalletOptions) => {
  const { onConnect, onDisconnect } = options ?? {}

  const { address, isConnected, isConnecting, isDisconnected, isReconnecting } =
    useAccount()

  const { data: balance } = useBalance({
    address,
  })

  const disconnectWallet = async () => {
    await disconnect(Web3Config.wagmiConfig)
    onDisconnect?.()
  }

  const disconnectAndSignOut = async () => {
    disconnectWallet()
    SharedService.Stores.useAuthStore.getState().resetTokens()
  }

  const connectWallet = async (connector: Connector<CreateConnectorFn>) => {
    try {
      if (getAccount(Web3Config.wagmiConfig).status === 'connected') {
        await disconnectWallet()
      }
      await connect(Web3Config.wagmiConfig, { connector })
      onConnect?.()
    } catch (error) {
      toast.error('Failed to connect or login')
    }
  }

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
    balance,
    disconnectWallet,
    disconnectAndSignOut,
    connectWallet,
  }
}

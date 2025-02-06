import { SharedLib, SharedUi } from '@shared/index'
import { AccountLib } from '@units/account'
import { Connector, getAccount, signMessage } from '@wagmi/core'
import { Web3Config, Web3Lib, Web3Ui } from '@web3/index'
import { useState } from 'react'
import toast from 'react-hot-toast'

type AuthProcessingStatus =
  | 'Wallet connection'
  | 'Nonce request'
  | 'Signature request'
  | 'Sign in'
  | 'Success'
  | 'Error'

interface Props {
  opened: boolean
  onClose: () => void
}

export function ConnectWalletModal(props: Props) {
  const { opened, onClose } = props
  const [processingStatus, setProcessingStatus] = useState<AuthProcessingStatus | null>(
    null,
  )

  const { connectWallet } = Web3Lib.Hooks.useWallet()
  const { handleGetNonce, handleSignIn } = AccountLib.Hooks.useAccount()

  const signIn = async (connector: Connector) => {
    setProcessingStatus('Wallet connection')

    try {
      await connectWallet(connector)

      setProcessingStatus('Nonce request')
      const { address } = getAccount(Web3Config.wagmiConfig)

      if (address) {
        const { data } = await handleGetNonce(address)

        setProcessingStatus('Signature request')
        const signature = await signMessage(Web3Config.wagmiConfig, {
          message: data.nonce,
        })

        setProcessingStatus('Sign in')
        await handleSignIn(address, signature)

        setProcessingStatus('Success')
      }
    } catch (error) {
      toast.error(SharedLib.Utils.responseErrorParser(error) || 'Failed to sign in')
      setProcessingStatus('Error')
      throw error
    } finally {
      onClose()
      setProcessingStatus(null)
    }
  }

  return (
    <SharedUi.Modal
      isOpen={opened}
      onClose={onClose}
      contentClassName="relative min-w-96"
    >
      <h3 className="text-2xl font-semibold">Connect wallet</h3>
      {processingStatus && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4 bg-black/90 text-white">
          <SharedUi.Loader className="size-24" />
          <p className="text-lg font-semibold text-white">{processingStatus}</p>
        </div>
      )}
      <Web3Ui.WalletAvailableConnectors className="mt-8" handleConnect={signIn} />
    </SharedUi.Modal>
  )
}

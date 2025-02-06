import { SharedUi } from '@shared/index'
import { AccountLib } from '@units/account'
import { Connector, getAccount } from '@wagmi/core'
import { Web3Config, Web3Lib, Web3Ui } from '@web3/index'

interface Props {
  opened: boolean
  onClose: () => void
}

export function ConnectWalletModal(props: Props) {
  const { opened, onClose } = props

  const { connectWallet, isConnecting } = Web3Lib.Hooks.useWallet({
    onConnect: onClose,
  })
  const { handleLogin } = AccountLib.Hooks.useAccount()

  const signIn = async (connector: Connector) => {
    await connectWallet(connector)
    const { address } = getAccount(Web3Config.wagmiConfig)
    if (address) {
      await handleLogin(address)
    }
  }

  return (
    <SharedUi.Modal
      isOpen={opened}
      onClose={onClose}
      contentClassName="relative min-w-96"
    >
      <h3 className="text-2xl font-semibold">Connect wallet</h3>
      {isConnecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
          <SharedUi.Loader className="size-12" />
        </div>
      )}
      <Web3Ui.WalletAvailableConnectors className="mt-8" handleConnect={signIn} />
    </SharedUi.Modal>
  )
}

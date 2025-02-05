import { SharedUi } from '@shared/index'
import { Web3Lib, Web3Ui } from '@web3/index'

interface Props {
  opened: boolean
  onClose: () => void
}

export function ConnectWalletModal(props: Props) {
  const { opened, onClose } = props

  const { connectWallet, isConnecting } = Web3Lib.Hooks.useWallet({
    onConnect: onClose,
  })
  return (
    <SharedUi.Modal
      isOpen={opened}
      onClose={onClose}
      contentClassName="rounded-3xl relative min-w-96 h-fit bg-ui"
    >
      <h3 className="text-2xl font-semibold">Connect wallet</h3>
      {isConnecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
          <SharedUi.Loader className="size-12" />
        </div>
      )}
      <Web3Ui.WalletAvailableConnectors className="mt-8" handleConnect={connectWallet} />
    </SharedUi.Modal>
  )
}

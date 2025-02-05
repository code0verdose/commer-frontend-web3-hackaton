import { SharedLib, SharedUi } from '@shared/index'
import { Web3Lib, Web3Ui } from '@web3/index'
import { Logo } from '@widgets/logo'
import clsx from 'clsx'

type HeaderProps = React.ComponentPropsWithoutRef<'header'>

export function Header(props: HeaderProps) {
  const { className, ...otherProps } = props

  const { opened, open, close } = SharedLib.Hooks.useDisclosure()

  const { connectWallet, disconnectAndSignOut, isConnected, isConnecting } =
    Web3Lib.Hooks.useWallet({
      onConnect: close,
    })

  return (
    <header
      className={clsx(
        'flex items-center justify-between rounded-3xl bg-ui px-6 py-4',
        className,
      )}
      {...otherProps}
    >
      <Logo />
      <SharedUi.Button
        onClick={isConnected ? disconnectAndSignOut : open}
        className="button-gradient rounded-xl px-4 py-3 leading-tight"
      >
        {isConnected ? 'Disconnect' : 'Connect wallet'}
      </SharedUi.Button>

      {/* WALLETS MODAL */}
      <SharedUi.Modal
        isOpen={opened}
        onClose={close}
        contentClassName="rounded-3xl relative min-w-96 h-fit bg-ui"
      >
        <h3 className="text-2xl font-semibold">Connect wallet</h3>
        {isConnecting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
            <SharedUi.Loader className="size-12" />
          </div>
        )}
        <Web3Ui.WalletAvailableConnectors
          className="mt-8"
          handleConnect={connectWallet}
        />
      </SharedUi.Modal>
    </header>
  )
}

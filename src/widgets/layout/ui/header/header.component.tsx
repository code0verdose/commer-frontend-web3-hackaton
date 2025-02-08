import { SharedUi } from '@shared/index'
import { Web3Lib } from '@web3/index'
import { Logo } from '@widgets/logo'
import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'header'> {
  connect: () => void
  disconnect: () => void
  isConnected: boolean
}

export function Header(props: Props) {
  const { className, connect, disconnect, isConnected, ...otherProps } = props

  const { address } = Web3Lib.Hooks.useWallet()

  return (
    <header
      className={clsx(
        'flex items-center justify-between rounded-3xl bg-ui px-6 py-4',
        className,
      )}
      {...otherProps}
    >
      <Logo />
      <div className="flex items-center gap-x-4">
        <SharedUi.Button
          onClick={isConnected ? disconnect : connect}
          className="button-gradient group min-w-40 rounded-xl px-4 py-3 leading-tight hover:opacity-90"
        >
          {isConnected ? (
            <>
              <span className="block group-hover:hidden">
                {Web3Lib.Utils.shortenAddress(address)}
              </span>
              <span className="hidden group-hover:block">Disconnect</span>
            </>
          ) : (
            'Connect wallet'
          )}
        </SharedUi.Button>
      </div>
    </header>
  )
}

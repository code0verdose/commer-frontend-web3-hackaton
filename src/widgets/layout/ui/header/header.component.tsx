import { SharedUi } from '@shared/index'
import { Logo } from '@widgets/logo'
import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'header'> {
  connect: () => void
  disconnect: () => void
  isConnected: boolean
}

export function Header(props: Props) {
  const { className, connect, disconnect, isConnected, ...otherProps } = props

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
        onClick={isConnected ? disconnect : connect}
        className="button-gradient rounded-xl px-4 py-3 leading-tight"
      >
        {isConnected ? 'Disconnect' : 'Connect wallet'}
      </SharedUi.Button>
    </header>
  )
}

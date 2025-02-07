import { SharedService } from '@shared/index'
import { Web3Lib } from '@web3/index'
import clsx from 'clsx'
import { BotsList, SkeletonList } from './ui'

interface Props extends React.ComponentPropsWithoutRef<'section'> {}

export function BotsSection(props: Props) {
  const { className, ...otherProps } = props

  const { isConnected } = Web3Lib.Hooks.useWallet()
  const { isAuth } = SharedService.Stores.useAuthStore.getState()

  return (
    <section className={clsx('', className)} {...otherProps}>
      <h2 className="text-3xl font-semibold">Your bots</h2>
      {isConnected && isAuth ? (
        <BotsList className="mt-8" />
      ) : (
        <SkeletonList className="mt-8" />
      )}
    </section>
  )
}

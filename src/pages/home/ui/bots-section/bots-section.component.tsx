import { SharedService } from '@shared/index'
import { useInfiniteQuery } from '@tanstack/react-query'
import { BotService } from '@units/bot'
import { Web3Lib } from '@web3/index'
import clsx from 'clsx'
import { BotsList, SkeletonList } from './ui'

interface Props extends React.ComponentPropsWithoutRef<'section'> {}

export function BotsSection(props: Props) {
  const { className, ...otherProps } = props

  const { isConnected } = Web3Lib.Hooks.useWallet()
  const { isAuth } = SharedService.Stores.useAuthStore.getState()

  const botsQuery = useInfiniteQuery(
    BotService.Queries.getBotsInfinityOptions({
      enabled: isConnected && isAuth,
    }),
  )

  return (
    <section className={clsx('', className)} {...otherProps}>
      <h2 className="w-fit text-3xl font-semibold">
        Your bots{' '}
        {botsQuery.data?.totalItems && <span>({botsQuery.data?.totalItems})</span>}
      </h2>
      {isConnected && isAuth ? (
        <BotsList className="mt-8" />
      ) : (
        <SkeletonList className="mt-8" />
      )}
    </section>
  )
}

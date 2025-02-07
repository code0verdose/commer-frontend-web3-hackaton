import { SharedService } from '@shared/index'
import { useInfiniteQuery } from '@tanstack/react-query'
import { BotService, BotUi } from '@units/bot'
import { Web3Lib } from '@web3/index'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'
import { SkeletonList } from './skeleton-list.component'

const BOT_STATUS_MAP = {
  1: 'Active',
  2: 'Stopped',
} as const

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
}

export function BotsList(props: Props) {
  const { className, ...otherProps } = props

  const { isConnected } = Web3Lib.Hooks.useWallet()
  const { isAuth } = SharedService.Stores.useAuthStore.getState()

  const botsQuery = useInfiniteQuery(
    BotService.Queries.getBotsInfinityOptions({
      enabled: isConnected && isAuth,
    }),
  )

  const [ref] = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && !botsQuery.isFetchingNextPage && botsQuery.hasNextPage) {
        botsQuery.fetchNextPage()
      }
    },
  })

  return (
    <div
      className={clsx('scrollbar-hidden flex gap-x-8 overflow-x-auto', className)}
      {...otherProps}
    >
      {botsQuery.isLoading && <SkeletonList />}
      {botsQuery.data?.items.map((card) => (
        <BotUi.Card
          key={card.id}
          title={card.name}
          status={BOT_STATUS_MAP[card.status as keyof typeof BOT_STATUS_MAP]}
          description={card.description}
        />
      ))}
      {botsQuery.hasNextPage && <BotUi.CardSkeleton ref={ref} />}
    </div>
  )
}

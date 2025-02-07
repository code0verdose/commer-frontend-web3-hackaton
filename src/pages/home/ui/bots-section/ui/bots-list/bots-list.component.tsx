import { useInfiniteQuery } from '@tanstack/react-query'
import { BotService, BotUi } from '@units/bot'
import clsx from 'clsx'
import { mockCards } from './mock'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
}

export function BotsList(props: Props) {
  const { className, ...otherProps } = props

  const botsQuery = useInfiniteQuery(BotService.Queries.getBotsInfinityOptions())

  console.log(botsQuery.data)

  return (
    <div
      className={clsx('scrollbar-hidden flex gap-x-8 overflow-x-auto', className)}
      {...otherProps}
    >
      {mockCards.map((card) => (
        <BotUi.Card
          key={card.id}
          title={card.title}
          status={card.status}
          description={card.description}
        />
      ))}
    </div>
  )
}

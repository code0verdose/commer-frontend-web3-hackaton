import { BotUi } from '@units/bot'
import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
}

export function SkeletonList(props: Props) {
  const { className, ...otherProps } = props

  return (
    <div
      className={clsx('scrollbar-hidden flex gap-x-8 overflow-x-auto', className)}
      {...otherProps}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <BotUi.CardSkeleton key={index} />
      ))}
    </div>
  )
}

SkeletonList.displayName = 'SkeletonList'

import clsx from 'clsx'
import { forwardRef } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'article'> {
  className?: string
}

export const CardSkeleton = forwardRef<HTMLElement, Props>(
  ({ className, ...otherProps }, ref) => (
    <article
      ref={ref}
      className={clsx(
        'flex min-w-96 flex-col gap-y-6 overflow-hidden rounded-3xl border border-solid border-transparent bg-ui p-8',
        className,
      )}
      {...otherProps}
    >
      <div className="flex items-center justify-between gap-x-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-700" />
        {/* <div className="h-[34px] w-24 animate-pulse rounded-full border border-solid bg-gray-700" /> */}
      </div>
      <div>
        <div className="flex flex-col gap-y-2">
          <div className="h-5 w-[80%] animate-pulse rounded bg-gray-700" />
          <div className="h-5 w-[60%] animate-pulse rounded bg-gray-700" />
        </div>
      </div>
    </article>
  ),
)

CardSkeleton.displayName = 'CardSkeleton'

import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'article'> {
  title: string
  status: 'Active' | 'Stopped'
  description: string
  isSelected?: boolean
}

export function Card(props: Props) {
  const {
    title,
    status,
    description,
    isSelected = false,
    className,
    ...otherProps
  } = props

  return (
    <article
      className={clsx(
        'hover:bot-card-gradient flex min-w-96 cursor-pointer flex-col gap-y-6 overflow-hidden rounded-3xl border border-solid border-transparent bg-ui p-8',
        isSelected && 'bot-card-gradient hover:bot-card-gradient !border-gradient-3xl',
        className,
      )}
      {...otherProps}
    >
      <div className="flex items-center justify-between gap-x-4">
        <h3
          title={title}
          className="hover:truncate-none group truncate text-2xl font-semibold"
        >
          <span className="left-0 block whitespace-nowrap text-white hover:animate-marquee">
            {title}
          </span>
        </h3>
        <div
          className={clsx(
            'shrink-0 rounded-full border border-solid px-6 py-2 text-base leading-none',
            {
              'border-green bg-green/20 text-green': status === 'Active',
              'border-red bg-red/20 text-red': status === 'Stopped',
            },
          )}
        >
          {status}
        </div>
      </div>
      <div>
        <p title={description} className="line-clamp-2 max-w-[90%] leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  )
}

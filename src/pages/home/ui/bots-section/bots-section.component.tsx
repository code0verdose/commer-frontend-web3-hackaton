import clsx from 'clsx'
import { BotsList } from './ui'

interface Props extends React.ComponentPropsWithoutRef<'section'> {}

export function BotsSection(props: Props) {
  const { className, ...otherProps } = props

  return (
    <section className={clsx('', className)} {...otherProps}>
      <h2 className="text-3xl font-semibold">Your bots</h2>
      <BotsList className="mt-8" />
    </section>
  )
}

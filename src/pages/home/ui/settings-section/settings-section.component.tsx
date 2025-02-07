import { BotSettingsForm } from '@widgets/forms'
import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'section'> {}

export function SettingsSection(props: Props) {
  const { className, ...otherProps } = props

  return (
    <section className={clsx('', className)} {...otherProps}>
      <h2 className="text-3xl font-semibold">Settings</h2>
      <BotSettingsForm className="mt-8" />
    </section>
  )
}

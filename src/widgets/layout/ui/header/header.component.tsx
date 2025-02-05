import { Logo } from '@widgets/logo'
import clsx from 'clsx'

type HeaderProps = React.ComponentPropsWithoutRef<'header'>

export function Header(props: HeaderProps) {
  const { className, ...otherProps } = props

  return (
    <header
      className={clsx('jus flex items-center rounded-3xl bg-ui px-6 py-4', className)}
      {...otherProps}
    >
      <Logo />
    </header>
  )
}

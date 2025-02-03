import clsx from 'clsx'

type HeaderProps = React.ComponentPropsWithoutRef<'header'>

export function Header(props: HeaderProps) {
  const { className, ...otherProps } = props

  return (
    <header className={clsx('', className)} {...otherProps}>
      <p>header</p>
    </header>
  )
}

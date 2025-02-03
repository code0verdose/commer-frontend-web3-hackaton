import clsx from 'clsx'

type MainProps = React.ComponentPropsWithoutRef<'main'>

export function Main(props: MainProps) {
  const { className, children, ...otherProps } = props

  return (
    <main className={clsx('', className)} {...otherProps}>
      {children}
    </main>
  )
}

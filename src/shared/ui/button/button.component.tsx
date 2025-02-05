import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'button'> {}

export function Button(props: Props) {
  const { type = 'button', className, children, ...otherProps } = props

  return (
    <button type={type} className={clsx('cursor-pointer', className)} {...otherProps}>
      {children}
    </button>
  )
}

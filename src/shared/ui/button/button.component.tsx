import clsx from 'clsx'

type TButtonProps = React.ComponentPropsWithoutRef<'button'>

export function Button(props: TButtonProps) {
  const { type = 'button', className, children, ...otherProps } = props

  return (
    <button type={type} className={clsx('cursor-pointer', className)} {...otherProps}>
      {children}
    </button>
  )
}

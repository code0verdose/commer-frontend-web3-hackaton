import clsx from 'clsx'

type FooterProps = React.ComponentPropsWithoutRef<'footer'>

export function Footer(props: FooterProps) {
  const { className, ...otherProps } = props

  return (
    <footer className={clsx('', className)} {...otherProps}>
      <p>footer</p>
    </footer>
  )
}

import clsx from 'clsx'
import { Footer, Header, Main } from './ui'

type LayoutProps = React.ComponentPropsWithoutRef<'div'>

export function Layout(props: LayoutProps) {
  const { className, children, ...otherProps } = props

  return (
    <div className={clsx('min-h-dvh px-16 py-8', className)} {...otherProps}>
      {children}
    </div>
  )
}

Layout.Header = Header
Layout.Main = Main
Layout.Footer = Footer

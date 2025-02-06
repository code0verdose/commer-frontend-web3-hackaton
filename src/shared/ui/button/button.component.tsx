import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  to?: string
}

export function Button(props: Props) {
  const { type = 'button', className, children, to, ...otherProps } = props
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to)
    }

    otherProps.onClick?.(e)
  }

  return (
    <button
      type={type}
      className={clsx('cursor-pointer text-white', className)}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </button>
  )
}

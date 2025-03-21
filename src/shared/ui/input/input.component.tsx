import clsx from 'clsx'
import { InputHTMLAttributes, useId } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  labelClassName?: string
  label?: string
  type?: 'text' | 'number' | 'email' | 'password'
  inputClassName?: string
  error?: string
}

export function Input(props: Props) {
  const { className, label, type, labelClassName, inputClassName, error, ...otherProps } =
    props

  const id = useId()

  return (
    <div className={clsx('flex flex-col', className)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx('text-2xl font-semibold text-white', labelClassName)}
        >
          {label}

          <p className="h-6 text-sm text-red/80">{error || null}</p>
        </label>
      )}
      <input
        className={clsx(
          'rounded-xl border-none bg-[#1d1d1d] px-4 py-3 text-2xl leading-10 text-white placeholder:text-white/40 focus:outline-dashed focus:outline-1 focus:outline-brand',
          error && 'outline-dashed outline-1 outline-red/80',
          inputClassName,
        )}
        {...otherProps}
        id={id}
        type={type}
      />
    </div>
  )
}

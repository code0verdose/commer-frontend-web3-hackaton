import clsx from 'clsx'
import { ChangeEventHandler, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  className?: string
  labelClassName?: string
  label?: string
  type?: 'text' | 'number' | 'email' | 'password'
  inputClassName?: string
}

export function Input(props: Props) {
  const {
    value,
    onChange,
    placeholder,
    className,
    label,
    type,
    labelClassName,
    inputClassName,
    ...otherProps
  } = props

  return (
    <div className={clsx('flex flex-col gap-y-2', className)}>
      {label && (
        <label
          htmlFor="input"
          className={clsx('text-2xl font-semibold text-white', labelClassName)}
        >
          {label}
        </label>
      )}
      <input
        className={clsx(
          'rounded-xl border-none bg-[#1d1d1d] px-4 py-3 text-2xl leading-10 text-white placeholder:text-white/40 focus:outline-dashed focus:outline-2 focus:outline-brand',
          inputClassName,
        )}
        {...otherProps}
        id="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

import clsx from 'clsx'
import { InputHTMLAttributes, useId } from 'react'

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string
  className?: string
  labelClassName?: string
  label?: string
  textareaClassName?: string
  rows?: number
  cols?: number
  minRows?: number
  maxRows?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  autoResize?: boolean
  error?: string
}

export function TextArea(props: Props) {
  const {
    placeholder,
    className,
    label,
    labelClassName,
    textareaClassName,
    rows = 3,
    cols,
    minRows,
    maxRows,
    resize = 'vertical',
    autoResize,
    error,
    ...otherProps
  } = props

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
      <textarea
        className={clsx(
          'rounded-xl border-none bg-[#1d1d1d] px-4 py-3 text-2xl leading-10 text-white placeholder:text-white/40 focus:outline-dashed focus:outline-1 focus:outline-brand',
          textareaClassName,
        )}
        style={{ resize }}
        {...otherProps}
        id={id}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </div>
  )
}

import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextArea } from './text-area.component'

interface TextAreaControlProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  className?: string
  labelClassName?: string
  disabled?: boolean
  textareaClassName?: string
  rows?: number
  cols?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

export function TextAreaControl<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  labelClassName,
  textareaClassName,
  rows,
  cols,
  resize,
  disabled = false,
}: TextAreaControlProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextArea
          value={value}
          onChange={onChange}
          error={error?.message}
          label={label}
          placeholder={placeholder}
          className={className}
          labelClassName={labelClassName}
          textareaClassName={textareaClassName}
          rows={rows}
          cols={cols}
          resize={resize}
          disabled={disabled}
        />
      )}
    />
  )
}

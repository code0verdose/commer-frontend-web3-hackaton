import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Input } from './input.component'

interface InputControlProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  type?: 'text' | 'number' | 'email' | 'password'
}

export function InputControl<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  type = 'text',
}: InputControlProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          value={value}
          onChange={onChange}
          error={error?.message}
          label={label}
          placeholder={placeholder}
          className={className}
          labelClassName={labelClassName}
          inputClassName={inputClassName}
          type={type}
        />
      )}
    />
  )
}

import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { UploadArea } from './upload-area.component'

interface UploadAreaControlProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  acceptedTypes?: string[]
  maxFileSize?: number
  showAcceptedTypes?: boolean
}

export function UploadAreaControl<T extends FieldValues>({
  control,
  name,
  label,
  className,
  acceptedTypes,
  maxFileSize,
  showAcceptedTypes,
}: UploadAreaControlProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <UploadArea
          onFileSelect={onChange}
          error={error?.message}
          label={label}
          className={className}
          acceptedTypes={acceptedTypes}
          maxFileSize={maxFileSize}
          showAcceptedTypes={showAcceptedTypes}
        />
      )}
    />
  )
}

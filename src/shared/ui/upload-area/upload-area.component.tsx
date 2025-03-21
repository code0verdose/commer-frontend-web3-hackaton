import { SharedLib, SharedUi } from '@shared/index'
import clsx from 'clsx'
import { ChangeEvent, DragEvent, useId, useState } from 'react'

const ACCEPTED_FILE_TYPES = {
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  documents: ['.pdf', '.doc', '.docx'],
  maxSize: 5 * 1024 * 1024, // 5MB
}

type FileValidationError = 'size' | 'format' | null

interface UploadAreaProps {
  onFileSelect?: (file: File) => void
  acceptedTypes?: string[]
  maxFileSize?: number
  className?: string
  label?: string
  showAcceptedTypes?: boolean
  error?: string
}

export function UploadArea({
  onFileSelect,
  acceptedTypes = [...ACCEPTED_FILE_TYPES.images, ...ACCEPTED_FILE_TYPES.documents],
  maxFileSize = ACCEPTED_FILE_TYPES.maxSize,
  className,
  label,
  showAcceptedTypes = true,
  error,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [validationError, setValidationError] = useState<FileValidationError>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  const id = useId()

  const validateFile = (file: File): boolean => {
    setValidationError(null)
    setSelectedFileName(file.name)

    // Проверка размера
    if (file.size > maxFileSize) {
      setValidationError('size')
      return false
    }

    // Проверка формата
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!acceptedTypes.includes(fileExtension)) {
      setValidationError('format')
      return false
    }

    return true
  }

  const handleFile = (file: File) => {
    if (validateFile(file) && onFileSelect) {
      onFileSelect(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const clearFile = () => {
    setSelectedFileName(null)
    setValidationError(null)

    const fileInput = document.getElementById(id) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  return (
    <div className="flex flex-col">
      {label && (
        <div className="text-2xl font-semibold text-white">
          {label}
          <p className="h-6 text-sm text-red/80">{error || null}</p>
        </div>
      )}
      <div
        className={clsx(
          'border-gradient flex items-center justify-between rounded-xl p-6',
          isDragging && 'bg-brand/10',
          selectedFileName && 'button-gradient-light',
          className,
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-x-3">
          <SharedUi.Icon className="size-11" name="upload" />
          <div className="overflow-hidden">
            <p>Drag your file to start uploading or choose from computer</p>
            {selectedFileName && (
              <p className="text-sm text-gray-600">
                Selected file:{' '}
                <button
                  type="button"
                  className="cursor-pointer hover:text-red/80 hover:line-through"
                  onClick={clearFile}
                >
                  {SharedLib.Utils.shortenFileName(selectedFileName, 30)}
                </button>
              </p>
            )}
            {validationError === 'size' && (
              <p className="text-sm text-red/80">
                File size exceeds {maxFileSize / 1024 / 1024}MB limit
              </p>
            )}
            {validationError === 'format' && (
              <p className="text-sm text-red/80">
                Unsupported file format. Accepted formats: {acceptedTypes.join(', ')}
              </p>
            )}
          </div>
        </div>
        <label htmlFor={id} className="cursor-pointer">
          <input
            id={id}
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
          />
          <SharedUi.Button
            className="button-gradient-light border-gradient rounded-xl px-4 py-3 hover:bg-brand/20 active:bg-brand"
            type="button"
            onClick={(e) => e.currentTarget?.parentElement?.click()}
          >
            Browse
          </SharedUi.Button>
        </label>
      </div>
      {showAcceptedTypes && (
        <p className="mt-2 text-[#666666]">
          Only support {acceptedTypes.join(', ')} files up to {maxFileSize / 1024 / 1024}
          MB
        </p>
      )}
    </div>
  )
}

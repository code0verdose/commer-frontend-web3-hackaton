/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { useCallback, useEffect } from 'react'
import { Portal } from '../portal'

interface Props {
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
  overlayClassName?: string
  contentClassName?: string
}

const onContentClick = (e: React.MouseEvent) => {
  e.stopPropagation()
}

export function Modal(props: Props) {
  const { children, isOpen, onClose, className, overlayClassName, contentClassName } =
    props

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler],
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  const mods = {
    'pointer-events-auto z-[1000] opacity-100': isOpen,
  }

  return (
    <Portal>
      <div
        className={clsx(
          'pointer-events-none fixed inset-0 -z-10 opacity-0',
          mods,
          className,
        )}
      >
        <div
          className={clsx(
            'flex size-full items-center justify-center bg-black/50',
            overlayClassName,
          )}
          onClick={closeHandler}
        >
          <div
            className={clsx(
              'h-fit overflow-hidden rounded-3xl bg-ui p-8',
              contentClassName,
            )}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

import { useClickOutside } from 'shared/hooks/useClickOutside'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onSave?: () => void
}

export function Modal({ children, isOpen, onClose, onSave }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, onClose)

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          ref={ref}
          className="bg-white min-w-[400px] min-h-[200px] rounded-xl p-4 relative"
        >
          {children}
          {onSave && (
            <button
              className="absolute bottom-4 right-4 bg-blue-500 text-white rounded px-4 py-2"
              onClick={onSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>,
    document.getElementById('modal-root') || document.body,
  )
}

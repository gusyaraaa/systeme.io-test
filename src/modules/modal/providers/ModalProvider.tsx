import React, { createContext, useState } from 'react'

import { Modal } from '../Modal'

interface ModalContextProps {
  isModalOpen: boolean
  modalContent: React.ReactNode
  openModal: (content: React.ReactNode, onSave?: () => void) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined,
)

interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [onSave, setOnSave] = useState<(() => void) | undefined>(undefined)

  const openModal = (content: React.ReactNode, onSaveCallback?: () => void) => {
    setIsModalOpen(true)
    setModalContent(content)
    setOnSave(() => onSaveCallback)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
    setOnSave(undefined)
  }

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}
    >
      {children}
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={onSave}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}

import { useRef } from 'react'

import { useModal } from 'modules/modal'
import { EditModal } from '../EditModal'

interface EditButtonProps<T> {
  item: T
  items: T[]
  setItems: (products: T[]) => void
  textFieldKey: keyof T
}

export function EditButton<T extends { id: number }>({
  item,
  items,
  setItems,
  textFieldKey,
}: EditButtonProps<T>) {
  const { openModal, closeModal } = useModal()
  const textFieldRef = useRef('')

  const handleEdit = (data: T) => () => {
    openModal(
      <EditModal
        placeholder="Name"
        defaultValue={String(data[textFieldKey])}
        onTextFieldChange={(value: string) => (textFieldRef.current = value)}
      />,
      () => {
        setItems(
          items.map(
            (elem): T =>
              elem.id === data.id
                ? { ...elem, [textFieldKey]: textFieldRef.current }
                : elem,
          ),
        )
        closeModal()
      },
    )
  }

  return (
    <button
      className="bg-black rounded text-white px-2 py-1"
      onClick={handleEdit(item)}
    >
      Edit
    </button>
  )
}

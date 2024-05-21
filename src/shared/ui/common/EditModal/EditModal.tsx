import React, { useState } from 'react'

interface EditModalProps {
  title?: string
  placeholder: string
  defaultValue?: string

  onTextFieldChange?: (value: string) => void
}

export function EditModal({
  title,
  placeholder,
  defaultValue,
  onTextFieldChange,
}: EditModalProps) {
  const [value, setValue] = useState(defaultValue || '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onTextFieldChange?.(event.target.value)
  }

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <span className="font-bold text-2xl">{title || 'Edit'}</span>
        <input
          id="textField"
          name="textField"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  )
}

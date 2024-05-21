import { useEffect, useState } from 'react'

interface FiltersProps<T> {
  data: T[]
  setItems: (products: T[]) => void
  textFieldKey: keyof T
  statusFieldKey: keyof T
}

export function Filters<T>({
  data,
  setItems,
  textFieldKey,
  statusFieldKey,
}: FiltersProps<T>) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const handleFilter = () => {
    const filtered = data.filter((product) => {
      const textField = String(product[textFieldKey])
      const statusField = !!product[statusFieldKey]
      const statusValue = status.toLowerCase()

      const isTextFieldMatch = new RegExp(
        Array.from(search).join('.*'),
        'gi',
      ).test(textField)
      const isStatusMatch =
        (statusField && statusValue === 'active') ||
        (!statusField && statusValue === 'inactive') ||
        statusValue === ''

      return isTextFieldMatch && isStatusMatch
    })

    setItems(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [location.pathname])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 rounded px-3 py-2 outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border-2 rounded px-3 py-2 outline-none"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>
    </div>
  )
}

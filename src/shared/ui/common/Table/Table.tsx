import React, { useEffect, useRef, useState } from 'react'

interface ICell<T> {
  minWidth: number
  flexGrow: number
  cellRenderer: (data?: T) => React.ReactNode
}

interface ITable<T> {
  headers: ICell<T>[]
  columns: ICell<T>[]
  data: T[]
  action?: (data: T) => React.ReactNode
  actionMinWidth?: number
}

export function Table<T>({
  headers,
  columns,
  data,
  action,
  actionMinWidth,
}: ITable<T>) {
  const ref = useRef<HTMLDivElement>(null)
  const [calculatedMinWidth, setCalculatedMinWidth] = useState<
    number | undefined
  >(undefined)

  useEffect(() => {
    if (ref.current) {
      setCalculatedMinWidth(ref.current.clientWidth)
    }
  }, [ref.current])

  return (
    <div className="flex flex-col">
      <div className="flex">
        {headers.map((header, index) => (
          <div
            key={index}
            style={{ minWidth: header.minWidth }}
            className={`flex-${header.flexGrow} px-4 py-2`}
          >
            {header.cellRenderer()}
          </div>
        ))}
        {action && (
          <div
            style={{ minWidth: actionMinWidth ?? calculatedMinWidth }}
            className={`flex-0 px-4 py-2`}
          />
        )}
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? 'bg-gray-200' : ''}`}
        >
          {columns.map((column, i) => (
            <div
              key={`${index}_${i}`}
              style={{ minWidth: column.minWidth }}
              className={`flex-${column.flexGrow} border px-4 py-2 overflow-hidden overflow-ellipsis`}
            >
              {column.cellRenderer(item)}
            </div>
          ))}
          {action && (
            <div
              ref={ref}
              style={{ minWidth: actionMinWidth }}
              className={`flex-0 p-2`}
            >
              {action(item)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface ICell<T> {
  minWidth: number
  flexGrow: number
  cellRenderer: (data?: T) => JSX.Element
}

interface ITable<T> {
  headers: ICell<string>[]
  columns: ICell<T>[]
  data: T[]
}

export function Table<T>({ headers, columns, data }: ITable<T>) {
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
              className={`flex-${column.flexGrow} border px-4 py-2`}
            >
              {column.cellRenderer(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

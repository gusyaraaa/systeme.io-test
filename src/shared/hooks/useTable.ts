export function useTable<T>(
  headerKeys: string[],
  columnKeys: (keyof T)[],
  widths: number[],
  flexGrows: (0 | 1)[],
  renderColumn: (
    column: string,
    isHeader?: boolean,
  ) => (data: T) => React.ReactNode,
) {
  const createColumn = (
    minWidth: number,
    flexGrow: 0 | 1,
    key: string,
    isHeader?: boolean,
  ) => ({
    minWidth,
    flexGrow,
    cellRenderer: renderColumn(key, isHeader),
  })

  const headers = headerKeys.map((key, index) =>
    createColumn(widths[index], flexGrows[index], key, true),
  )
  const columns = columnKeys.map((key, index) =>
    createColumn(widths[index], flexGrows[index], key.toString()),
  )

  return {
    headers,
    columns,
  }
}

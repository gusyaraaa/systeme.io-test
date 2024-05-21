import { useTable } from 'shared/hooks/useTable'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Table } from 'shared/ui/common/Table'
import { EditButton } from 'shared/ui/common/EditButton'
import { Filters } from 'shared/ui/common/Filters'
import { formatDate } from 'shared/utils/formatDate'
import { pagesMock } from './mock'

export interface IPage {
  id: number
  title: string
  active: boolean
  updatedAt: string
  publishedAt: string
}

const renderColumn = (column: string, isHeader?: boolean) => (data: IPage) => {
  if (isHeader) {
    return <span className="capitalize font-bold">{column}</span>
  }

  switch (column) {
    case 'title':
      return <span>{String(data[column])}</span>
    case 'active':
      return <span>{data.active ? 'active' : 'inactive'}</span>
    case 'updatedAt':
      const updateDate = new Date(data.updatedAt)
      return <span>{formatDate(updateDate)}</span>
    case 'publishedAt':
      const publishDate = new Date(data.publishedAt)
      return <span>{formatDate(publishDate)}</span>
    default:
      return <span>{column}</span>
  }
}

export function RoutePages() {
  const [pagesData, setPagesData] = useLocalStorage('pagesMock', pagesMock)
  const [pages, setPages] = useLocalStorage('pages', pagesData)
  const { headers, columns } = useTable<IPage>(
    ['title', 'status', 'updated', 'published'],
    ['title', 'active', 'updatedAt', 'publishedAt'],
    [300, 100, 150, 150],
    [1, 0, 0, 0],
    renderColumn,
  )

  return (
    <>
      <Filters
        data={pagesMock}
        setItems={setPages}
        textFieldKey="title"
        statusFieldKey="active"
      />
      <Table
        headers={headers}
        columns={columns}
        data={pages}
        action={(data: IPage) => (
          <EditButton
            item={data}
            items={pages}
            setItems={(items: IPage[]) => {
              setPages(items)
              setPagesData(items)
            }}
            textFieldKey="title"
          />
        )}
        actionMinWidth={60}
      />
    </>
  )
}

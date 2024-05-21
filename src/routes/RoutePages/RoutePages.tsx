import { useModal } from 'modules/modal'
import { useTable } from 'shared/hooks/useTable'
import { Table } from 'shared/ui/common/Table/Table'
import { EditModal } from 'shared/ui/common/EditModal'
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
  const { openModal, closeModal } = useModal()
  const {
    data: pages,
    setData: setPages,
    headers,
    columns,
  } = useTable<IPage>(
    pagesMock,
    ['title', 'status', 'updated', 'published'],
    ['title', 'active', 'updatedAt', 'publishedAt'],
    [300, 100, 150, 150],
    [1, 0, 0, 0],
    renderColumn,
  )

  const handleEdit = (data: IPage) => {
    openModal(<EditModal />, () => {
      setPages(
        pages.map(
          (page): IPage =>
            page.id === data.id ? { ...page, title: 'edited' } : page,
        ),
      )
      closeModal()
    })
  }

  return (
    <Table
      headers={headers}
      columns={columns}
      data={pages}
      action={(data: IPage) => (
        <button
          className="bg-black rounded text-white px-2 py-1"
          onClick={() => handleEdit(data)}
        >
          Edit
        </button>
      )}
      actionMinWidth={60}
    />
  )
}

import { useModal } from 'modules/modal'
import { useTable } from 'shared/hooks/useTable'
import { Table } from 'shared/ui/common/Table/Table'
import { EditModal } from 'shared/ui/common/EditModal'
import { formatDate } from 'shared/utils/formatDate'
import { productsMock } from './mock'

export interface IProduct {
  id: number
  name: string
  options: {
    size: string
    amount: number
  }
  active: boolean
  createdAt: string
}

const renderColumn =
  (column: string, isHeader?: boolean) => (data: IProduct) => {
    if (isHeader) {
      return <span className="capitalize font-bold">{column}</span>
    }

    switch (column) {
      case 'name':
        return <span>{String(data[column])}</span>
      case 'options':
        return (
          <div className="flex space-x-4">
            <span className="flex-1">{data.options.size}</span>
            <span>{data.options.amount}</span>
          </div>
        )
      case 'active':
        return <span>{data.active ? 'active' : 'inactive'}</span>
      case 'createdAt':
        const date = new Date(data.createdAt)
        return <span>{formatDate(date)}</span>
      default:
        return <span>{column}</span>
    }
  }

export function RouteProducts() {
  const { openModal, closeModal } = useModal()
  const {
    data: products,
    setData: setProducts,
    headers,
    columns,
  } = useTable<IProduct>(
    productsMock,
    ['name', 'options', 'status', 'created'],
    ['name', 'options', 'active', 'createdAt'],
    [300, 150, 100, 150],
    [1, 0, 0, 0],
    renderColumn,
  )

  const handleEdit = (data: IProduct) => {
    openModal(<EditModal />, () => {
      setProducts(
        products.map(
          (product): IProduct =>
            product.id === data.id ? { ...product, name: 'edited' } : product,
        ),
      )
      closeModal()
    })
  }

  return (
    <Table
      headers={headers}
      columns={columns}
      data={products}
      action={(data: IProduct) => (
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

import { useTable } from 'shared/hooks/useTable'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Table } from 'shared/ui/common/Table'
import { EditButton } from 'shared/ui/common/EditButton'
import { Filters } from 'shared/ui/common/Filters'
import { formatDate } from 'shared/utils/formatDate'
import { productsMock } from './mock'
import { useEffect } from 'react'

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
  const [productsData, setProductsData] = useLocalStorage(
    'productsMock',
    productsMock,
  )
  const [products, setProducts] = useLocalStorage('products', productsData)
  const { headers, columns } = useTable<IProduct>(
    ['name', 'options', 'status', 'created'],
    ['name', 'options', 'active', 'createdAt'],
    [300, 150, 100, 150],
    [1, 0, 0, 0],
    renderColumn,
  )

  return (
    <>
      <Filters
        data={productsData}
        setItems={setProducts}
        textFieldKey="name"
        statusFieldKey="active"
      />
      <Table
        headers={headers}
        columns={columns}
        data={products}
        action={(data: IProduct) => (
          <EditButton
            item={data}
            items={products}
            setItems={(items: IProduct[]) => {
              setProducts(items)
              setProductsData(items)
            }}
            textFieldKey="name"
          />
        )}
        actionMinWidth={60}
      />
    </>
  )
}

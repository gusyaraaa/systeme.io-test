import { useTable } from 'shared/hooks/useTable'
import { Table } from 'shared/ui/common/Table'
import { EditButton } from 'shared/ui/common/EditButton'
import { formatDate } from 'shared/utils/formatDate'
import { pricePlansMock } from './mock'

export interface IPricePlan {
  id: number
  description: string
  active: boolean
  createdAt: string
  removedAt: string
}

const renderColumn =
  (column: string, isHeader?: boolean) => (data: IPricePlan) => {
    if (isHeader) {
      return <span className="capitalize font-bold">{column}</span>
    }

    switch (column) {
      case 'description':
        return <span>{String(data[column])}</span>
      case 'active':
        return <span>{data.active ? 'active' : 'inactive'}</span>
      case 'createdAt':
        const createDate = new Date(data.createdAt)
        return <span>{formatDate(createDate)}</span>
      case 'removedAt':
        const removeDate = new Date(data.removedAt)
        return <span>{formatDate(removeDate)}</span>
      default:
        return <span>{column}</span>
    }
  }

export function RoutePricePlans() {
  const {
    data: pricePlans,
    setData: setPricePlans,
    headers,
    columns,
  } = useTable<IPricePlan>(
    pricePlansMock,
    ['description', 'status', 'created', 'removed'],
    ['description', 'active', 'createdAt', 'removedAt'],
    [300, 100, 150, 150],
    [1, 0, 0, 0],
    renderColumn,
  )

  return (
    <Table
      headers={headers}
      columns={columns}
      data={pricePlans}
      action={(data: IPricePlan) => (
        <EditButton
          item={data}
          items={pricePlans}
          setItems={setPricePlans}
          textFieldKey="description"
        />
      )}
      actionMinWidth={60}
    />
  )
}

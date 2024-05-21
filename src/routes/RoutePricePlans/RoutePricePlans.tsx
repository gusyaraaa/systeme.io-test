import { useTable } from 'shared/hooks/useTable'
import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { Table } from 'shared/ui/common/Table'
import { EditButton } from 'shared/ui/common/EditButton'
import { Filters } from 'shared/ui/common/Filters'
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
  const [pricePlansData, setPricePlansData] = useLocalStorage(
    'pricePlansMock',
    pricePlansMock,
  )
  const [pricePlans, setPricePlans] = useLocalStorage(
    'pricePlans',
    pricePlansData,
  )
  const { headers, columns } = useTable<IPricePlan>(
    ['description', 'status', 'created', 'removed'],
    ['description', 'active', 'createdAt', 'removedAt'],
    [300, 100, 150, 150],
    [1, 0, 0, 0],
    renderColumn,
  )

  return (
    <>
      <Filters
        data={pricePlansMock}
        setItems={setPricePlans}
        textFieldKey="description"
        statusFieldKey="active"
      />
      <Table
        headers={headers}
        columns={columns}
        data={pricePlans}
        action={(data: IPricePlan) => (
          <EditButton
            item={data}
            items={pricePlans}
            setItems={(items: IPricePlan[]) => {
              setPricePlans(items)
              setPricePlansData(items)
            }}
            textFieldKey="description"
          />
        )}
        actionMinWidth={60}
      />
    </>
  )
}

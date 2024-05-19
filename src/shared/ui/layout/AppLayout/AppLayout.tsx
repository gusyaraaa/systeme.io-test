import { Outlet } from 'react-router-dom'

import { Header } from '../Header'

export function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

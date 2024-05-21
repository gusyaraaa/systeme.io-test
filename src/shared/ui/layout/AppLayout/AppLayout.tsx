import { Outlet } from 'react-router-dom'

import { Header } from '../Header'

export function AppLayout() {
  return (
    <>
      <Header />
      <div className="max-w-[1200px] m-auto">
        <Outlet />
      </div>
    </>
  )
}

import { RouterProvider } from 'react-router-dom'

import { routerConfig } from 'modules/router/routerConfig'

import 'index.css'

export function AppRoot() {
  return <RouterProvider router={routerConfig} />
}

import { RouterProvider } from 'react-router-dom'

import { routerConfig } from 'modules/router/routerConfig'
import { ModalProvider } from 'modules/modal/providers/ModalProvider'

import 'index.css'

export function AppRoot() {
  return (
    <ModalProvider>
      <RouterProvider router={routerConfig} />
    </ModalProvider>
  )
}

import { Outlet, createBrowserRouter } from 'react-router-dom'

import { RouteProducts } from 'routes/RouteProducts'
import { RoutePricePlans } from 'routes/RoutePricePlans'
import { RoutePages } from 'routes/RoutePages'
import { AppLayout } from 'shared/ui/layout/AppLayout'
import { AppRedirect } from './ui/AppRedirect'
import * as links from './links'

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <AppRedirect />,
  },
  {
    element: <Outlet />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: links.products,
            element: <RouteProducts />,
          },
          {
            path: links.pricePlans,
            element: <RoutePricePlans />,
          },
          {
            path: links.pages,
            element: <RoutePages />,
          },
        ],
      },
    ],
  },
])

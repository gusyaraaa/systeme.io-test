import { Navigate } from 'react-router-dom'

import * as links from '../links'

export const AppRedirect = () => {
  return <Navigate to={links.products} replace />
}

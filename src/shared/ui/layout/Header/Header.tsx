import { memo } from 'react'

import * as links from 'modules/router/links'
import { HeaderLink } from './ui/HeaderLink'

export const Header = memo(function () {
  return (
    <header className="p-4 flex space-x-10">
      <HeaderLink to={links.products}>products</HeaderLink>
      <HeaderLink to={links.pricePlans}>price plans</HeaderLink>
      <HeaderLink to={links.pages}>pages</HeaderLink>
    </header>
  )
})

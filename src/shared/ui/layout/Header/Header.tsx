import * as links from 'modules/router/links'
import { HeaderLink } from './ui/HeaderLink'

export function Header() {
  return (
    <header className="p-4 flex space-x-10 opacity-0.2">
      <HeaderLink to={links.products}>products</HeaderLink>
      <HeaderLink to={links.products}>price plans</HeaderLink>
      <HeaderLink to={links.products}>pages</HeaderLink>
    </header>
  )
}

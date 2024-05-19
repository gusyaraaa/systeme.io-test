import { Link } from 'react-router-dom'

interface HeaderLinkProps {
  to: string
  children: React.ReactNode
}

export function HeaderLink({ to, children }: HeaderLinkProps) {
  return (
    <Link to={to} className="relative overflow-hidden group pb-2">
      <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 bg-black group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left" />
      <span className="relative cursor-pointer">{children}</span>
    </Link>
  )
}

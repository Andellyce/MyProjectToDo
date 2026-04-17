import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { BASE_URL } from '../../constants'

type RouterLinkProps = {
  to: string
  children: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

const RouterLink = ({ to, children, ...rest }: RouterLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export default RouterLink

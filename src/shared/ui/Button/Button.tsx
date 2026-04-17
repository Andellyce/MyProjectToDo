import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  className?: string
  children: ReactNode
  isDisabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className = '', type = 'button', children, isDisabled, onClick, ...rest }: ButtonProps) => {
  return (
    <button className={`${styles.button}  ${className}`} type={type} disabled={isDisabled} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default Button

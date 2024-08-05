import cx from 'classnames'
import { ReactNode } from 'react'

interface CardProps {
  children?: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cx(
        'h-auto bg-white shadow-card border-opacity-40 md:rounded-md border border-gray-200',
        className,
      )}
    >
      {children}
    </div>
  )
}

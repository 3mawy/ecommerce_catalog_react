import cx from 'classnames'
import { FC, HTMLAttributes } from 'react'

export interface Props extends HTMLAttributes<HTMLElement> {
  circle?: boolean
  innerClassName?: string
  size?: 'square' | 'small' | 'medium' | 'large' | 'xl'
  variant?: 'primary' | 'secondary' | 'ternary' | 'single'
  asLink?: boolean
  htmlType?: 'button' | 'submit'
  disabled?: boolean
  square?: boolean
}

export const Button: FC<Props> = ({
  children,
  className,
  circle,
  innerClassName,
  size = 'medium',
  variant = 'primary',
  asLink = false,
  disabled = false,
  htmlType,
  square,
  ...props
}) => {
  const CustomTag = asLink ? 'div' : 'button'
  return (
    <CustomTag
      {...props}
      disabled={disabled}
      type={htmlType}
      className={cx(
        `button-${variant} p-px outline-0`,
        `h-${size === 'small' ? 5 : size === 'large' ? 10 : size === 'xl' ? 12 : 8}`,
        square &&
          `w-${size === 'small' ? 5 : size === 'large' ? 10 : size === 'xl' ? 12 : 8}`,
        disabled && 'cursor-default bg-opacity-50 text-opacity-50',
        asLink && !disabled ? 'cursor-pointer' : '',
        'rounded',
        className,
      )}
      onClick={disabled ? undefined : props.onClick}
    >
      <div
        className={cx(
          'button-inner',
          'leading-none w-full h-full flex justify-center items-center py-[0.375rem] text-sm whitespace-nowrap',
          `px-${size === 'xl' ? 8 : size === 'large' ? 6 : size === 'medium' ? 5 : 1}`,
          circle ? 'rounded-full' : 'rounded-lg',
          innerClassName,
        )}
      >
        {children}
      </div>
    </CustomTag>
  )
}

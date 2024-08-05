import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import cx from 'classnames'
import RcSelect, { SelectProps } from 'rc-select'
import { OptionGroupFC } from 'rc-select/lib/OptGroup'
import { OptionFC } from 'rc-select/lib/Option'
import React, { FC } from 'react'

export type Props = {
  mode?: 'multiple' | 'tags' | 'combobox'
  size?: 'default' | 'large'
  inputIcon?: React.ReactElement
  error?: boolean
  showArrow?: boolean
  popupContainerId?: string
} & Omit<SelectProps, 'mode' | 'prefixCls' | 'menuItemSelectedIcon'>

const Select: FC<Props> & { Option: OptionFC; OptGroup: OptionGroupFC } = ({
  size = 'large',
  className,
  children,
  error,
  showArrow = true,
  mode = undefined,
  popupContainerId = '',
  allowClear = true,
  ...props
}) => {
  return (
    <RcSelect
      mode={mode}
      prefixCls='select'
      inputIcon={
        <>
          {error && (
            <div
              className={cx(
                'inline-flex gap-2 absolute items-center',
                showArrow ? 'right-8' : 'right-4',
              )}
            >
              <span>
                <ExclamationTriangleIcon className='text-red-900' />
              </span>
            </div>
          )}
        </>
      }
      allowClear={allowClear}
      animation={props.animation || 'slide-up'}
      menuItemSelectedIcon={<span className='font-icon-check text-[10px]' />}
      dropdownStyle={{ pointerEvents: 'all' }}
      notFoundContent={
        <div className='h-[4.375rem] flex justify-center items-center text-sm opacity-60'>
          No Data
        </div>
      }
      className={cx(
        'rounded-md bg',
        size,
        className,
        error && 'border-danger',
        'overscroll-y-contain',
      )}
      getPopupContainer={(trigger: HTMLElement) => {
        if (popupContainerId !== '') {
          const parentContainer = document.getElementById(popupContainerId)
          if (parentContainer) {
            return parentContainer
          }
        }

        return trigger.parentNode as HTMLElement
      }}
      suffixIcon={<ChevronDownIcon width={20} height={20} />}
      {...props}
    >
      {children}
    </RcSelect>
  )
}

Select.Option = RcSelect.Option
Select.OptGroup = RcSelect.OptGroup
export { Select }

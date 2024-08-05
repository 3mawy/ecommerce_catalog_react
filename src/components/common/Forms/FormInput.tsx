import { EyeIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import cx from 'classnames'
import { forwardRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { FieldError } from './FormError'
import { ImageFormInput } from './ImageFormInput'

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'image'
  | 'number'

export type InputProps = {
  id: string
  name: string
  label?: string
  labelAlign?: 'left' | 'top' | 'right'
  placeholder?: string
  type?: InputType
  checked?: boolean
  className?: string
  required?: boolean
  maxLength?: number
  disabled?: boolean
  defaultValue?: string | number
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label = 'top',
      type = 'text',
      labelAlign = 'top',
      checked,
      required,
      disabled,
      defaultValue,
      ...props
    },
    ref,
  ) {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const {
      formState: { errors },
    } = useFormContext()
    const error = errors[props.name]

    return (
      <div>
        <div
          className={cx(
            'flex',
            labelAlign !== 'top'
              ? 'gap-4 flex-col sm:flex-row sm:justify-between sm:items-center'
              : 'flex-col gap-2',
            error && 'mb-10',
          )}
        >
          {type !== 'checkbox' && labelAlign !== 'right' && label && (
            <label
              className='block text-sm leading-6 font-thin text-gray-700 min-w-max'
              htmlFor={props.id}
            >
              {label} {required && <span className='text-danger'>*</span>}
            </label>
          )}
          <div
            className={cx(
              labelAlign !== 'top' && 'w-full 2xl:max-w-[45rem]',
              'relative',
            )}
          >
            {type === 'checkbox' ? (
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  ref={ref}
                  {...props}
                  checked={checked}
                  disabled={disabled}
                  className='h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary'
                />
                {label && (
                  <label
                    className='ml-2 block text-sm leading-6 text-gray-700 font-semibold pr-8'
                    htmlFor={props.id}
                  >
                    {label}
                  </label>
                )}
              </div>
            ) : type === 'image' ? (
              <ImageFormInput />
            ) : (
              <input
                type={type === 'password' && showPassword ? 'text' : type}
                ref={ref}
                autoComplete={props.name}
                defaultValue={defaultValue}
                {...props}
                disabled={disabled}
                className={cx(
                  error ? 'ring-danger ring-1 ring-inset' : '',
                  'h-11 bg-gray-100 block w-full rounded-md border-0 py-1.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6',
                  disabled && 'bg-gray-200 cursor-not-allowed',
                )}
              />
            )}
            <div className='absolute inset-y-0 right-0 px-3 flex gap-2 items-center focus:outline-none'>
              {error && (
                <span>
                  <ExclamationTriangleIcon
                    className={'text-danger'}
                    width={20}
                    height={20}
                  />
                </span>
              )}
              {type === 'password' && (
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='flex items-center focus:outline-none'
                  disabled={disabled}
                >
                  <EyeIcon
                    className={cx(
                      showPassword ? 'text-secondary' : 'text-gray-400',
                    )}
                    width={20}
                    height={20}
                  />
                </button>
              )}
            </div>
            <div className='absolute top-[115%] bottom-28'>
              <FieldError name={props.name} />
            </div>
          </div>
        </div>
      </div>
    )
  },
)

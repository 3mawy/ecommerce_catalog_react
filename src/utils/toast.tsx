import 'react-toastify/dist/ReactToastify.css'

import { CheckIcon } from '@heroicons/react/16/solid'
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import cx from 'classnames'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Slide,
  toast as toastify,
  ToastOptions,
  TypeOptions,
} from 'react-toastify'

type Message = {
  icon?: ReactNode
  title: string | ReactNode
  description?: string | { [key: string]: string[] }
  action?: ReactNode
  closeable?: boolean
  path?: string
}

const defaultConfig: ToastOptions = {
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  position: 'bottom-right',
  transition: Slide,
  closeButton: (
    <div className={'items-center flex font-bold text-white mr-2'}>
      <XMarkIcon height={18} width={18} />
    </div>
  ),
}

const renderMessage = (message: Message) => {
  const { title, description: desc, action, icon, path } = message
  const TagName = ({
    children,
    className,
  }: {
    children: ReactNode
    className: string
  }) => {
    if (path) {
      return (
        <Link to={path} className={className}>
          {children}
        </Link>
      )
    }
    return <div className={className}>{children}</div>
  }
  return (
    <TagName className={cx('flex gap-2 items-center py-2 px-1 ')}>
      {icon && (
        <div className=' w-[35px] h-[35px] shrink-0 inline-flex justify-center items-center'>
          {icon}
        </div>
      )}
      <div className={cx('toast-body grow', !desc && 'self-center')}>
        <div
          className={cx(
            'title text-[0.875rem] leading-normal font-semibold text-black-800',
          )}
        >
          {title}
        </div>
        {desc && (
          <div className='description text-13 text-black-400 font-thin'>
            {typeof desc === 'string'
              ? desc
              : Object.keys(desc).map(k => <div key={k}>{desc[k][0]}</div>)}
          </div>
        )}
        {action && <div className='action mt-2'>{action}</div>}
      </div>
    </TagName>
  )
}

const getToastIcon = (type: TypeOptions, icon?: ReactNode) => {
  if (icon) {
    return icon
  }
  if (type === 'warning') {
    return (
      <span className={'w-[30px] h-[30px] rounded-md bg-yellow-100 text-white'}>
        <ExclamationTriangleIcon
          width={30}
          height={30}
          className='text-orange-900'
        />
      </span>
    )
  }
  if (type === 'success') {
    return (
      <span
        className={'w-[30px] h-[30px] rounded-md bg-success-light text-white'}
      >
        <CheckIcon width={30} height={30} />
      </span>
    )
  }
  if (type === 'info') {
    return (
      <span className={'w-[30px] h-[30px] rounded-md bg-gray-200 text-white'}>
        <ExclamationCircleIcon width={30} height={30} />
      </span>
    )
  }
  if (type === 'error') {
    return (
      <span
        className={'w-[30px] h-[30px] rounded-md bg-danger-light text-white'}
      >
        <XMarkIcon width={30} height={30} />
      </span>
    )
  }
  return undefined
}

const _toast = (message: Message, config?: ToastOptions) => {
  const { type = 'info', className } = config || {}
  const icon = getToastIcon(type, message.icon)
  const configProps = {
    ...defaultConfig,
    ...config,
  }
  return toastify(renderMessage({ ...message, icon }), {
    ...configProps,
    closeOnClick: configProps.closeOnClick && !message.path, // disable close on click when have path
    className: cx('custom-toast', `toast-${type}`, className?.toString()),
  })
}

const genToast = (type: TypeOptions) => {
  return (message: Message, config?: ToastOptions) => {
    return _toast(message, { ...config, type })
  }
}

const toast = {
  info: genToast('info'),
  success: genToast('success'),
  warning: genToast('warning'),
  error: genToast('error'),
  dismiss: toastify.dismiss,
  update: toastify.update,
  message: renderMessage,
}

export default toast

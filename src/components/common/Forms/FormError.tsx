import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useFormContext } from 'react-hook-form'

export function FieldError({ name }: { name?: string }) {
  const {
    formState: { errors },
  } = useFormContext()

  if (!name) {
    return null
  }

  const error = errors[name]

  if (!error) {
    return null
  }

  const renderError = () => {
    if (!errors || !errors[name]) {
      return null
    }
    const message = errors[name]?.message?.toString()

    return (
      <p className='text-danger text-sm mt-1 font-semibold'>
        <ExclamationTriangleIcon height={13} className={'inline mr-1'} />
        {message}
      </p>
    )
  }
  return renderError()
}

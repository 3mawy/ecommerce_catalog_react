import { PencilIcon } from '@heroicons/react/16/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { Button } from '../Button'

export const ImageFormInput = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex'>
        <div className={'relative'}>
          <img
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
            className='h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover'
          />
          <div
            className={'absolute -bottom-2.5 right-1.5 flex gap-1.5 text-sm'}
          >
            <Button
              className={'shadow bg-white text-gray-500'}
              size={'small'}
              square
            >
              <XMarkIcon width={8} />
            </Button>
            <Button
              className={'shadow bg-white text-gray-500'}
              size={'small'}
              square
            >
              <PencilIcon width={8} />
            </Button>
          </div>
        </div>
      </div>
      <span className={'text-xs font-thin text-gray-500 block'}>
        Allowed file types: png, jpg, jpeg.
      </span>
    </div>
  )
}

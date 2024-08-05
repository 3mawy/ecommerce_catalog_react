import React from 'react'

export const ErrorFallback: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-48 bg-gray-100'>
      <h1 className='text-4xl font-bold mb-4'>Oops! Something went wrong.</h1>
      <p className='text-lg text-gray-600 mb-8'>Please try again later.</p>
    </div>
  )
}

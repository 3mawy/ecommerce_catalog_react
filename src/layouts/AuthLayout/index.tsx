import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectCurrentUser } from '../../features/auth/authSlice'

function AuthLayout() {
  const user = useAppSelector(selectCurrentUser)
  if (user) {
    return <Navigate to='/' />
  }

  return (
    <div className='w-screen min-h-screen grid lg:grid-cols-2 grid-cols-1 '>
      <div className='flex md:p-14 bg-gray-200 min-h-screen col-1'>
        <Suspense fallback={<div />}>
          <Outlet />
        </Suspense>
      </div>
      <div className={'bg-gray-300'} />
    </div>
  )
}
export default AuthLayout

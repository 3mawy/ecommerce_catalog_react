import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'
import Header from '../components/Header/Header'
import {
  selectCurrentUser,
} from '../features/auth/authSlice'

export default function MainLayout() {
  const user = useAppSelector(selectCurrentUser)

  if (!user) {
    return <Navigate to='/login' />
  }

  return (
    <div className='w-full min-h-screen flex flex-col bg-white'>
        <Header />
        <Suspense fallback={<div />}>
          <div className={'h-full px-3 py-6 sm:p-6 lg:px-8 lg:py-5'}>
            <Outlet />
          </div>
        </Suspense>
    </div>
  )
}

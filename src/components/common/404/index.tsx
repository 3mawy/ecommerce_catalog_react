import { useNavigate } from 'react-router-dom'

import NotFoundImage from '../../../assets/images/NotFound.png'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='w-[25rem] m-auto text-center'>
      <div className='mt-10 text-[2rem] mb-2'>Oops! Page not found</div>
      <div className='text-base text-light-secondary'>
        We can&apos;t seem to find the page you&apos;re looking for.
      </div>
      <div className='mt-6'>
          <img src={NotFoundImage} alt='' />
        <button
          className='w-60 mt-20 rounded-md p-4 bg-danger text-white font-bold'
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default PageNotFound

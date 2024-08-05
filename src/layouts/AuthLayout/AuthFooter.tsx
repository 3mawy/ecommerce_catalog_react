const AuthFooter = ({ withDetails }: { withDetails?: boolean }) => {
  return (
    <div className='flex flex-col gap-1 p-5 md:p-0'>
      {withDetails && (
          <>
          <span
              className={
                  'bg-gray-300 text-gray-500 rounded w-fit px-2 py-1 text-xs font-bold'
              }
          >
            Security tip
          </span>
              <span className='text-xs font-light text-gray-500 leading-6'>
            Never share your credentials 🤫.
          </span>
          <div className='flex-col'>
              <div className={'bg-red-900 p-2 text-white text-sm font-bold w-52 rounded'}>
                  <p>Username: testUser</p>
                  <p>Password: testUser</p>
              </div>
          </div>
          </>
      )}
        <span className='text-xs font-light text-gray-500 leading-6'>
        © ALL RIGHTS RESERVED
      </span>
    </div>
  )
}

export default AuthFooter

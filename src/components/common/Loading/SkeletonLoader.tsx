const SkeletonLoader = () => {
  return (
    <div
      className='absolute inset-0 z-50
                        before:absolute before:inset-0
                        before:-translate-x-full
                        before:bg-gradient-to-r
                        before:from-transparent before:via-gray-500/10
                        before:to-transparent
                        move-left-to-right'
    ></div>
  )
}

export default SkeletonLoader

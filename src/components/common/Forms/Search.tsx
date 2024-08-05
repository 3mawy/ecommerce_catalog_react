import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

const SearchComponent = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}) => {
  const [query, setQuery] = useState(searchQuery)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchQuery(query)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className='relative'>
          <input
            type='text'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search...'
            className='h-11 bg-gray-100 block w-full rounded-md border-0 py-1.5 pl-10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
          />
          <button
            type='submit'
            className='focus:outline-none absolute left-2 top-1/2 transform -translate-y-1/2'
          >
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchComponent

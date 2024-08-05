import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { debounce } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'

import { MIN_SEARCH_LENGTH } from '../configs/client'

interface SearchBarProps {
    handleSearchChange: (value: string) => void
    isLoading: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchChange, isLoading }) => {
    const [searchInput, setSearchInput] = useState('')

    // Ref to store the debounced function
    const debouncedSearchRef = useRef(debounce((value: string) => {
        handleSearchChange(value)
    }, 300))

    useEffect(() => {
        // Copy the debounced function to a local variable
        const debouncedSearch = debouncedSearchRef.current

        // Cleanup the debounce function on component unmount
        return () => {
            debouncedSearch.cancel()
        }
    }, [])

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchInput(value)

        if (value.length >= MIN_SEARCH_LENGTH) {
            debouncedSearchRef.current(value)
        } else {
            debouncedSearchRef.current.cancel()
            handleSearchChange('')
        }
    }

    return (
        <div className="mb-6">
            <div className='relative'>
                <input
                    type="text"
                    placeholder="Search Catalog"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className='h-11 bg-gray-200 block w-full rounded-md border-0 py-1.5 pl-10 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
                />
                <div
                    className='focus:outline-none absolute left-2 top-1/2 transform -translate-y-1/2'
                >
                    <MagnifyingGlassIcon className='w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700'/>
                </div>
            </div>
        </div>
    )
}

export default SearchBar

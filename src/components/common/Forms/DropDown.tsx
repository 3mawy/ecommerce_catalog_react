import { FC, useEffect, useRef, useState } from 'react'

interface DropdownOption {
  label: string
  value: number
}

interface CustomDropdownProps {
  value: number
  onChange: (newPageSize: number) => void
  options: DropdownOption[]
}

const CustomDropdown: FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
}) => {
  useEffect(() => {
    console.log(options)
  }, [options])

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(
    undefined,
  )
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>(
    'bottom',
  )

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (optionValue: number) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth)

      const buttonRect = buttonRef.current.getBoundingClientRect()
      const spaceAbove = buttonRect.top
      const spaceBelow = window.innerHeight - buttonRect.bottom

      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }
    }
  }, [isOpen])
  const [selectedLabel, setSelectedLabel] = useState(
    options.find(option => option.value === value)?.label || 'Select an option',
  )
  useEffect(() => {
    setSelectedLabel(
      options.find(option => option.value === value)?.label ||
        'Select an option',
    )
    console.log(value)
    console.log(
      options.find(option => option.value === value)?.label ||
        'Select an option',
    )
  }, [options, value])

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <button
        type='button'
        className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        {selectedLabel}
        <svg
          className='-mr-1 ml-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            dropdownPosition === 'top' ? 'bottom-full mb-2' : 'mt-2'
          }`}
          style={{
            width: dropdownWidth,
            maxHeight: '100px',
            overflowY: 'auto',
          }}
        >
          <div className='py-1' role='menu' aria-orientation='vertical'>
            {options.map(option => (
              <a
                key={option.value}
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                role='menuitem'
                onClick={e => {
                  e.preventDefault()
                  handleOptionClick(option.value)
                }}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDropdown

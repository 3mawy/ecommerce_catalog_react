import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { FC } from 'react'

import { useGetAttributesQuery } from '../../features/Attributes/attributesApiSlice'
import { useGetCategoriesQuery } from '../../features/category/categoryApiSlice'
import { useGetProductTypesQuery } from '../../features/productTypes/productTypesApiSlice'
import { useFilterUI } from './hooks/useFilterUI'

interface FilterProps {
    isMobile?: boolean
}

const Filter: FC<FilterProps> = ({isMobile=false}) => {
    const {
        selectedType,
        selectedCategories,
        selectedAttributes,
        handleTypeClick,
        handleCategoryClick,
        handleCheckboxChange,
        handleResetFilters,
    } = useFilterUI()

    const { data: types, isLoading: isLoadingTypes, error: errorTypes } = useGetProductTypesQuery({})
    const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery({ filters: { product_type: selectedType?.id } })
    const { data: attributes, isLoading: isLoadingAttributes, error: errorAttributes } = useGetAttributesQuery({})

    if (isLoadingTypes || isLoadingCategories || isLoadingAttributes) {return <div>Loading...</div>}
    if (errorTypes || errorCategories || errorAttributes) {return <div>Error loading data</div>}

    return (
        <form className={classNames(!isMobile&&'hidden lg:block')}>
            <div onClick={handleResetFilters} className="px-4 py-3 cursor-pointer bg-indigo-200 rounded-t-md">Reset Filters</div>
            <h3 className="sr-only">Categories</h3>
            <ul role="list" className="space-y-2 border-b border-gray-200 py-4 text-sm font-medium text-gray-900">
                <li
                    key="all"
                    className={classNames('cursor-pointer px-4 py-2 rounded-md', selectedType.id === null ? 'bg-indigo-500 text-white' : 'bg-gray-100')}
                    onClick={(e) => {
                        e.preventDefault()
                        handleTypeClick(null, 'All')
                    }}
                >
                    All
                </li>
                {types?.map(type => (
                    <li
                        key={type.id}
                        className={classNames('cursor-pointer px-4 py-2 rounded-md', selectedType.id === type?.id ? 'bg-indigo-500 text-white' : 'bg-gray-100')}
                        onClick={(e) => {
                            e.preventDefault()
                            handleTypeClick(type.id, type.name)
                        }}
                    >
                        {type.name}
                    </li>
                ))}
            </ul>

            <Disclosure as="div" key={'categories'} className="border-b border-gray-200 py-2 text-sm">
                {({ open }) => (
                    <>
                        <h3 className=" flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Categories</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="">
                            <div className="space-y-2 ">
                                {categories?.map(category => (
                                    <div
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id, category.name)}
                                        className={classNames('cursor-pointer px-3 py-1 mr-2 rounded-full inline-flex', selectedCategories?.some(selectedCategory => selectedCategory.id === category.id) ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700')}
                                    >
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <Disclosure as="div" key={'attributes'} className="border-b border-gray-200 py-2">
                {({ open }) => (
                    <>
                        <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Attributes</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6 text-sm">
                            <div className="space-y-2">
                                {attributes?.map(attribute => (
                                    <div key={attribute.id} className="space-y-2">
                                        {(!attribute.choices?.choices || attribute.choices.choices.length === 0) ? (
                                            <div
                                                onClick={() => handleCheckboxChange(attribute.name, !selectedAttributes[attribute.name]?.[0])}
                                                className={classNames('cursor-pointer px-2 py-1 rounded-full', Boolean(selectedAttributes[attribute.name]?.[0]) ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700')}
                                            >
                                                {attribute.name}
                                            </div>
                                        ) : (
                                            <div className={'mb-4'}>
                                                <div className="font-medium text-gray-900 mb-2 capitalize">{attribute.name}</div>
                                                <div className={'space-y-2'}>
                                                    {attribute.data_type === 'choice' && attribute.choices?.choices && attribute.choices.choices.map(choice => (
                                                        <div
                                                            key={choice}
                                                            onClick={() => handleCheckboxChange(attribute.name, choice)}
                                                            className={classNames('inline-flex mr-2 cursor-pointer px-2 py-1 rounded-full', selectedAttributes[attribute.name]?.includes(choice) ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700')}
                                                        >
                                                            {choice}
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </form>
    )
}

export default Filter

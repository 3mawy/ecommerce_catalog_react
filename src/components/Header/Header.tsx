import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/20/solid'
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Fragment,useState } from 'react'

import smallLogo from '../../assets/images/small-logo.svg'
import { useGetCategoriesQuery} from '../../features/category/categoryApiSlice'
import {useGetProductTypesQuery} from '../../features/productTypes/productTypesApiSlice'
import {mapNavigationData} from './util'
import SearchBar from "../SearchBar";
import {Link} from "react-router-dom";



const Header = () => {
    const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery({})
    const { data: types, isLoading: loadingTypes } = useGetProductTypesQuery({})
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation = !loadingCategories && !loadingTypes && categories && types ? mapNavigationData(categories, types) : { categories: [], pages: [] }

    return (
        <div>
            {/* Mobile menu */}
            <Transition.Root show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p
                                                            id={`${category.id}-${section.id}-heading-mobile`}
                                                            className="font-medium text-gray-900"
                                                        >
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <a href={item.id} className="-m-2 block p-2 text-gray-500">
                                                                        {item.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Sign in
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Create account
                                        </a>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6">
                                    <a href="#" className="-m-2 flex items-center p-2">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Desktop Menu */}
            <header className="relative bg-white">
                <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over $100
                </p>
                <nav aria-label="Top" className="mx-auto">
                    <div className="border-b border-gray-200 px-3 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="rounded-md bg-white p-2 -ml-2 text-gray-400 lg:hidden"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                            </button>

                            {/* Logo */}
                            <div className="w-full lg:w-auto flex lg:ml-0">
                                <div className="mx-auto lg:mx-0 ">
                                    <Link to="/">
                                        <span className="sr-only">Catalog</span>
                                        <img
                                            className="h-8 w-auto"
                                            src={smallLogo}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:mx-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({open}) => (
                                                <>
                                                <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'text-gray-700 hover:text-gray-800',
                                                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel
                                                            className="absolute inset-x-0 top-full z-20 text-sm text-gray-500">
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow"
                                                                 aria-hidden="true"/>

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                                    <div
                                                                        className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div
                                                                            className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                        </div>
                                                                        <div
                                                                            className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <a href={section.id}
                                                                                       id={`${section.name}-heading`}
                                                                                       className="font-medium text-gray-900">{section.name}</a>
                                                                                    <ul role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name}
                                                                                                className="flex">
                                                                                                <a href={item.id}
                                                                                                   className="hover:text-gray-800">{item.name}</a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}
                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="w-auto lg:w-full ml-auto flex justify-between items-center">
                                {/* Cart */}
                                <div className="hidden lg:block flex-grow max-w-2xl ml-auto ">
                                    <SearchBar/>
                                </div>
                                <div className="flow-root lg:ml-6">
                                    <a href="#" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"/>
                                        <span className="ml-2 text-sm font-medium text-gray-700">0</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="pb-2 lg:hidden">
                            <SearchBar/>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header

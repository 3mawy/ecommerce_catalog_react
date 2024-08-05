import {Tab} from '@headlessui/react'
import {StarIcon} from '@heroicons/react/20/solid'
import classNames from 'classnames'
import {useParams} from 'react-router-dom'

import {useGetProductDetailsQuery} from '../../productApiSlice'

export default function Example() {
    const {id} = useParams()
    const {data: product, isLoading, error} = useGetProductDetailsQuery(parseInt(id??''))


    if (isLoading) {return <div>Loading...</div>}
    if (error) {return <div>Error loading product</div>}

    return (
        product ? (
            <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Image gallery */}
                        <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                <Tab.List className="grid grid-cols-4 gap-6">
                                    {product?.images?.map((image) => (
                                        <Tab
                                            key={image.id}
                                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                        >
                                            {({selected}) => (
                                                <>
                                                    <span className="sr-only">{image.alt_text}</span>
                                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img src={image.image}
                                 alt="" className="h-full w-full object-cover object-center"/>
                          </span>
                                                    <span
                                                        className={classNames(
                                                            selected ? 'ring-indigo-500' : 'ring-transparent',
                                                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>

                            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                                {product?.images?.map((image) => (
                                    <Tab.Panel key={image.id}>
                                        <img
                                            src={image.image}
                                            alt={image.alt_text}
                                            className="h-full w-full object-cover object-center sm:rounded-lg"
                                        />
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>

                        {/* Product info */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
                            </div>

                            {/* Reviews */}
                            <div className="mt-3">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    'text-indigo-500 h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">4 out of 5 stars</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6 text-base text-gray-700"
                                     dangerouslySetInnerHTML={{__html: product.description}}/>
                            </div>

                            <section aria-labelledby="details-heading" className="mt-12">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>

                                <div className="divide-y divide-gray-200 border-t">
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        ) : (
            <div>Product not found</div>
        )
    )
}

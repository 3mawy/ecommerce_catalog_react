import React from 'react'

import {IProduct} from '../../features/product/productApiSlice' // Import the ProductCard component
import ProductCard from './ProductCard'


interface ProductGridProps {
    products: IProduct[]
    isLoading: boolean
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid

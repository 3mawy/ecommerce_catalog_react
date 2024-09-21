import React from 'react'
import { Link } from 'react-router-dom'

import { IProduct } from '../../features/product/productApiSlice'
import PlaceholderImg from '../../assets/images/img_thumbnail.svg'

interface ProductCardProps {
    product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { id, name, price, primary_image } = product
    return (
        <Link to={id.toString()} className="group text-sm">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                    src={`${primary_image?.url?(import.meta.env.VITE_API_BASE_URL + primary_image?.url):PlaceholderImg}`}
                    alt={primary_image?.alt_text}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <h3 className="mt-4 font-medium text-gray-900">{name}</h3>
            <p className="mt-2 font-medium text-gray-900">{price}</p>
        </Link>
    )
}

export default ProductCard

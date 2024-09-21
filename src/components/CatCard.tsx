import { useState } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
} from "@heroicons/react/24/solid";

export default function CatCard() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isStarred, setIsStarred] = useState(false);

    const product = {
        name: "Ultra-Modern Smartwatch",
        price: 299.99,
        originalPrice: 349.99,
        images: [
            "https://loremflickr.com/1280/720",
            "https://loremflickr.com/1280/720",
            "https://loremflickr.com/1280/720",
        ],
        description:
            "Experience the future on your wrist with our Ultra-Modern Smartwatch.",
        isNew: true,
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full max-w-sm">
            <div className="relative">
                <svg width="0" height="0" className="absolute">
                    <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
                    </clipPath>
                </svg>
                <div
                    className=" bg-gray-100 shadow-md rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    style={{ clipPath: "url(#squircleClip)" }}
                >
                    <div className="relative h-64 overflow-hidden ">
                        <img
                            alt={`${product.name} - Image ${currentImageIndex + 1}`}
                            className="object-cover w-full h-full transition-opacity duration-300"
                            src={product.images[currentImageIndex]}
                            style={{
                                aspectRatio: "400/400",
                                objectFit: "cover",
                            }}
                        />
                        <button
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full"
                            onClick={prevImage}
                        >
                            <ChevronLeftIcon className="h-4 w-4" />
                        </button>
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full"
                            onClick={nextImage}
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </button>
                        {product.isNew && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium absolute top-8 left-8 bg-yellow-400 text-yellow-900 font-semibold">
                HOT
              </span>
                        )}
                        <button
                            className={`absolute top-8 right-8 ${
                                isStarred ? "text-yellow-400" : "text-gray-300"
                            } hover:text-yellow-400`}
                            onClick={() => setIsStarred(!isStarred)}
                        >
                            <StarIcon className="h-6 w-6 fill-current" />
                        </button>
                    </div>
                    <div className="p-6 text-left">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            {product.name}
                        </h3>
                        <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
                            {product.originalPrice && (
                                <span className="ml-2 text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            {product.description}
                        </p>
                    </div>
                    <div className=" bg-secondary">
                        <button className="py-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors duration-300">
                            Explore Options
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client'

import { Eye, Heart, Mail, MessageSquare, Phone, Share2, ShoppingCart, Star, Truck, Verified } from 'lucide-react'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'

export interface Product {
    id: string
    title: string
    price: number
    originalPrice?: number
    moq: string
    moqNumber: number
    image: string
    images: string[]
    supplier: {
        name: string
        country: string
        flag: string
        verified: boolean
        responseTime: string
        rating: number
        totalOrders: number
        joinedYear: number
        badges: string[]
    }
    rating: number
    reviewCount: number
    tags: string[]
    stockStatus: 'In Stock' | 'Limited Stock' | 'Pre-Order' | 'Out of Stock'
    certifications: string[]
    category: string
    subcategory: string
    description: string
    specifications: Record<string, string>
    shippingTime: string
    freeShipping: boolean
    featured: boolean
    trending: boolean
    discount?: number
    lastUpdated: string
    views: number
    inquiries: number
}

//@ts-ignore
const ProductCard = ({ product, viewMode = 'grid' }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showQuickView, setShowQuickView] = useState(false)

    const isOnSale = product.discount && product.discount > 0
    const discountedPrice = isOnSale ? product.price * (1 - product.discount / 100) : product.price

    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 p-4">
                <div className="flex space-x-4">
                    {/* Image */}
                    <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        {product.featured && (
                            <div className="absolute top-2 left-2">
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Featured
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-light text-gray-900 text-lg mb-2 line-clamp-2">{product.title}</h3>

                                <div className="flex items-center space-x-4 mb-3">
                                    <div className="flex items-center">
                                        {isOnSale && (
                                            <span className="text-lg font-bold text-red-600 mr-2">
                                                ${discountedPrice.toFixed(2)}
                                            </span>
                                        )}

                                        <span className="text-sm text-green-600 font-medium ml-2">Negotiable</span>
                                    </div>
                                    {isOnSale && (
                                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                            {product.discount}% OFF
                                        </span>
                                    )}
                                </div>

                                <div className="text-sm text-gray-600 mb-3">MOQ: {product.moq}</div>

                                <div className="flex items-center space-x-4 mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">{product.supplier.flag}</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {product.supplier.name}
                                        </span>
                                        {product.supplier.verified && <Verified className="w-4 h-4 text-blue-500" />}
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="text-sm font-medium">{product.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2 ml-4">
                                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Request Quote</span>
                                </button>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className={`p-2 rounded-lg border transition-colors ${
                                            isBookmarked
                                                ? 'bg-red-50 border-red-200 text-red-600'
                                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Product Image */}
            <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                    src={product.images[currentImageIndex] || product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlays */}
                <div className="absolute top-3 right-3 flex flex-wrap gap-2">
                    {product.trending && (
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                            🔥 Trending
                        </span>
                    )}
                    {product.tags
                        .slice(0, 2)
                        .map(
                            (
                                tag:
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                                    | Iterable<ReactNode>
                                    | Promise<
                                          | string
                                          | number
                                          | bigint
                                          | boolean
                                          | ReactPortal
                                          | ReactElement<unknown, string | JSXElementConstructor<any>>
                                          | Iterable<ReactNode>
                                          | null
                                          | undefined
                                      >
                                    | null
                                    | undefined,
                                index: Key | null | undefined
                            ) => (
                                <span
                                    key={index}
                                    className={`text-xs px-2 py-1 rounded-full font-medium shadow-md ${
                                        tag === 'Organic'
                                            ? 'bg-green-100 text-green-800'
                                            : tag === 'Limited Stock'
                                            ? 'bg-orange-100 text-orange-800'
                                            : tag === 'Fair Trade'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {tag}
                                </span>
                            )
                        )}
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setShowQuickView(true)}
                        className="p-2 bg-white text-gray-600 hover:bg-gray-50 rounded-full shadow-md transition-all"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Image navigation dots */}
                {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {product.images.map((_: any, index: Key | null | undefined) => (
                            <button
                                key={index}
                                onClick={() =>
                                    //@ts-ignore
                                    setCurrentImageIndex(index)
                                }
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-light text-gray-900 text-base line-clamp-2 flex-1 mr-2">{product.title}</h3>
                    <div className="flex items-center space-x-1 text-gray-500">
                        <Eye className="w-3 h-3" />
                    </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {isOnSale && (
                            <span className="text-lg font-bold text-green-700">${discountedPrice.toFixed(2)}</span>
                        )}
                    </div>
                    <span className="text-sm text-green-600 font-light bg-green-50 px-2 py-1 rounded-full">
                        Negotiable
                    </span>
                </div>

                <div className="text-sm text-gray-600 mb-3 flex items-center justify-between">
                    <span>
                        MOQ: <span className="font-light">{product.moq}</span>
                    </span>
                </div>

                {/* Supplier Info */}
                <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg">{product.supplier.flag}</span>
                        <div>
                            <div className="flex items-center space-x-1">
                                <span className="text-sm font-light text-gray-900">{product.supplier.name}</span>
                                {product.supplier.verified && <Verified className="w-4 h-4 text-blue-500" />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Rating and Reviews */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                        i < Math.floor(product.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg">
                        <ShoppingCart className="w-4 h-4" />
                        <span className='font-light'>Request Quote</span>
                    </button>

                    <button className="px-4 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all">
                        <Mail className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Quick View Modal */}
            {showQuickView && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Quick View</h2>
                                <button
                                    onClick={() => setShowQuickView(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <img src={product.image} alt={product.title} className="w-full rounded-lg" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Price:</span>
                                            <span className="text-green-600 font-bold">${product.price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">MOQ:</span>
                                            <span>{product.moq}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Shipping:</span>
                                            <span>{product.shippingTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductCard

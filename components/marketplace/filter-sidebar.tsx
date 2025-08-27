'use client'

import { ChevronDown, ChevronUp, Filter, Star } from 'lucide-react'
import { useState } from 'react'

//@ts-ignore

const FilterSidebar = ({ filters, onFilterChange, productCount }) => {
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        country: true,
        price: true,
        moq: true,
        stock: true,
        certifications: true,
        rating: true,
        shipping: false,
    })

    const toggleSection = (section: any) => {
        setExpandedSections((prev) => ({
            ...prev,
            //@ts-ignore
            [section]: !prev[section],
        }))
    }

    const categories = [
        { name: 'All Categories', count: 156, icon: '📦' },
        { name: 'Agriculture', count: 89, icon: '🌾' },
        { name: 'Textiles', count: 34, icon: '🧵' },
        { name: 'Cosmetics', count: 23, icon: '💄' },
        { name: 'Mining', count: 12, icon: '⛏️' },
        { name: 'Manufacturing', count: 18, icon: '🏭' },
    ]

    const countries = [
        { name: 'All Countries', flag: '🌍', count: 156 },
        { name: 'Ghana', flag: '🇬🇭', count: 45 },
        { name: 'Ethiopia', flag: '🇪🇹', count: 32 },
        { name: 'Morocco', flag: '🇲🇦', count: 28 },
        { name: 'Kenya', flag: '🇰🇪', count: 25 },
        { name: 'Nigeria', flag: '🇳🇬', count: 26 },
    ]

    const certifications = [
        { name: 'Organic', count: 67 },
        { name: 'Fair Trade', count: 45 },
        { name: 'ISO 9001', count: 34 },
        { name: 'HACCP', count: 23 },
        { name: 'Rainforest Alliance', count: 19 },
    ]

    return (
        <div className="w-70 bg-white border-r border-gray-200 h-full overflow-y-auto">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-light text-gray-900 flex items-center">
                        <Filter className="w-5 h-5 mr-2" />
                        Filters
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onFilterChange({})}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('categories')}
                        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-green-600 transition-colors"
                    >
                        <span>Categories</span>
                        {expandedSections.categories ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                    {expandedSections.categories && (
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label
                                    key={category.name}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category"
                                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                            defaultChecked={category.name === 'All Categories'}
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">({category.count})</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Countries */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('country')}
                        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-green-600 transition-colors"
                    >
                        <span>Countries</span>
                        {expandedSections.country ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                    {expandedSections.country && (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {countries.map((country) => (
                                <label
                                    key={country.name}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                            defaultChecked={country.name === 'All Countries'}
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{country.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">({country.count})</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('price')}
                        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-green-600 transition-colors"
                    >
                        <span>Price Range</span>
                        {expandedSections.price ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                    {expandedSections.price && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>$0</span>
                                <span>$100</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('rating')}
                        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-green-600 transition-colors"
                    >
                        <span>Minimum Rating</span>
                        {expandedSections.rating ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                    {expandedSections.rating && (
                        <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <label
                                    key={rating}
                                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                    />
                                    <div className="ml-2 flex items-center">
                                        {[...Array(rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        {[...Array(5 - rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-gray-300" />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">& up</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('stock')}
                        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-green-600 transition-colors"
                    >
                        <span>Availability</span>
                        {expandedSections.stock ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                    {expandedSections.stock && (
                        <div className="space-y-2">
                            {['In Stock', 'Limited Stock', 'Pre-Order'].map((status) => (
                                <label
                                    key={status}
                                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                        defaultChecked={status === 'In Stock'}
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{status}</span>
                                    <div
                                        className={`ml-auto w-2 h-2 rounded-full ${
                                            status === 'In Stock'
                                                ? 'bg-green-500'
                                                : status === 'Limited Stock'
                                                ? 'bg-orange-500'
                                                : 'bg-blue-500'
                                        }`}
                                    ></div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Certifications */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('certifications')}
                        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-green-600 transition-colors"
                    >
                        <span>Certifications</span>
                        {expandedSections.certifications ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                    {expandedSections.certifications && (
                        <div className="space-y-2">
                            {certifications.map((cert) => (
                                <label
                                    key={cert.name}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{cert.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">({cert.count})</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar

import { ChevronDown, Grid, List } from 'lucide-react'
import { useState } from 'react'

//@ts-ignore
const ProductToolbar = ({ filters, onFilterChange, totalProducts, viewMode, onViewModeChange }) => {
    const [showSortMenu, setShowSortMenu] = useState(false)

    const sortOptions = [
        { value: 'relevance', label: 'Most Relevant' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'newest', label: 'Newest First' },
        { value: 'popular', label: 'Most Popular' },
    ]

    return (
        <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                        <span className="font-semibold">{totalProducts.toLocaleString()}</span> products found
                    </span>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <div className="relative">
                            <button
                                onClick={() => setShowSortMenu(!showSortMenu)}
                                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm">
                                    {sortOptions.find((opt) => opt.value === filters.sortBy)?.label || 'Most Relevant'}
                                </span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {showSortMenu && (
                                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onFilterChange({ ...filters, sortBy: option.value })
                                                setShowSortMenu(false)
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`p-2 rounded transition-colors ${
                                viewMode === 'grid'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={`p-2 rounded transition-colors ${
                                viewMode === 'list'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductToolbar
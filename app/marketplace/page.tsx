'use client'

import Header from '@/components/common/header-main'
import FilterSidebar from '@/components/marketplace/filter-sidebar'
import ProductCard, { Product } from '@/components/marketplace/product-card'
import ProductToolbar from '@/components/marketplace/product-toolbar'
import { createCompanyProfile } from '@/lib/base/common/authentication/company/company-profile'
import { checkCurrentUserSession } from '@/lib/base/common/authentication/session-manager'
import useAuthStore from '@/lib/base/state/AuthState'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function Marketplace() {
    const router = useRouter()
    const [filters, setFilters] = useState({
        categories: ['All Categories'],
        countries: [],
        priceRange: [0, 100],
        moqRange: [0, 5000],
        stockStatus: ['In Stock'],
        certifications: [],
        suppliers: [],
        rating: 0,
        shippingTime: [],
        searchQuery: '',
        sortBy: 'relevance',
        viewMode: 'grid',
    })

    const [viewMode, setViewMode] = useState('grid')

    // Enhanced mock data
    const mockProducts = useMemo(
        () => [
            {
                id: '1',
                title: 'Premium Organic Cocoa Beans - Single Origin Ghana',
                price: 2.5,
                moq: '500 units',
                moqNumber: 500,
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop',
                ],
                supplier: {
                    name: 'Ghana Cocoa Co.',
                    country: 'Ghana',
                    flag: '🇬🇭',
                    verified: true,
                    responseTime: '< 2 hours',
                    rating: 4.8,
                    totalOrders: 1250,
                    joinedYear: 2018,
                    badges: ['Gold Supplier', 'ISO Certified'],
                },
                rating: 4.8,
                reviewCount: 147,
                tags: ['Organic', 'Fair Trade'],
                stockStatus: 'In Stock',
                certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'],
                category: 'Agriculture',
                subcategory: 'Cocoa Products',
                description:
                    'Premium single-origin cocoa beans from Ghana, perfect for chocolate manufacturing and gourmet applications.',
                specifications: {
                    Origin: 'Ghana',
                    Moisture: '< 7%',
                    'Fat Content': '50-58%',
                    'Shell Content': '< 12%',
                },
                shippingTime: '15-25 days',
                freeShipping: true,
                featured: true,
                trending: false,
                discount: 15,
                lastUpdated: '2 days ago',
                views: 2341,
                inquiries: 89,
            },
            {
                id: '2',
                title: 'Grade A Premium Ethiopian Coffee Beans - Arabica',
                price: 4.2,
                moq: '500 units',
                moqNumber: 500,
                image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
                ],
                supplier: {
                    name: 'Ethiopian Coffee Ltd',
                    country: 'Ethiopia',
                    flag: '🇪🇹',
                    verified: true,
                    responseTime: '< 4 hours',
                    rating: 4.9,
                    totalOrders: 890,
                    joinedYear: 2019,
                    badges: ['Premium Supplier'],
                },
                rating: 4.9,
                reviewCount: 203,
                tags: ['Organic', 'Rainforest Alliance'],
                stockStatus: 'In Stock',
                certifications: ['Organic', 'Rainforest Alliance', 'Direct Trade'],
                category: 'Agriculture',
                subcategory: 'Coffee',
                description: 'Premium grade Ethiopian Arabica coffee beans with exceptional flavor profile and aroma.',
                specifications: {
                    Variety: 'Arabica',
                    Processing: 'Washed',
                    Altitude: '1800-2200m',
                    'Cupping Score': '85+',
                },
                shippingTime: '10-20 days',
                freeShipping: false,
                featured: false,
                trending: true,
                lastUpdated: '1 day ago',
                views: 1876,
                inquiries: 67,
            },
            // Add more products following the same pattern...
        ],
        []
    )

    const { profile, currentTradeRole } = useAuthStore()

    useEffect(() => {
        const willTryToCreateCompanyProfile = (userData: User) => {
            createCompanyProfile(userData, {
                trade_role: currentTradeRole,
                userEmail: userData.email!,
                userFirstName: profile.firstname!,
                userSecondName: profile.lastname!,
                company_name: profile.companyName,
                phone_number: profile.telephone!,
            })
        }

        const intialCheckUp = () => {
            checkCurrentUserSession().then((v) => {
                if (!v.user) {
                    router.push('/auth/signin')
                }

                /**
                 * If the user's email has not been confirmed take them away
                 */
                if (!(v.user && v.user.email_confirmed_at)) {
                    router.push('/auth/signin')
                }else{
                    willTryToCreateCompanyProfile(v.user)
                }
            })
        }
        intialCheckUp()
    }, [router])

    const filteredProducts = useMemo(() => {
        let result = [...mockProducts]

        // Apply filters here based on filters state
        // This is a simplified version - in a real app, you'd have more complex filtering logic

        return result
    }, [mockProducts, filters])

    const handleFilterChange = (newFilters: {
        categories: string[]
        countries: never[]
        priceRange: number[]
        moqRange: number[]
        stockStatus: string[]
        certifications: never[]
        suppliers: never[]
        rating: number
        shippingTime: never[]
        searchQuery: string
        sortBy: string
        viewMode: string
    }) => {
        setFilters((prev) => ({ ...prev, ...newFilters }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="flex">
                <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    productCount={filteredProducts.length}
                />

                <div className="flex-1">
                    <div className="p-6">
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                                    : 'space-y-4'
                            }
                        >
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} viewMode={viewMode} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">📦</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search terms</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

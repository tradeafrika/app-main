/**
 * Used to select trade role
 */

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import useAuthStore from '@/lib/base/state/AuthState'
import { useRouter } from 'next/navigation'

type AccountType = 'buyer' | 'supplier'

const AccountTypeSelection: React.FC = () => {
    const { setCurrentTradeRole } = useAuthStore()
    const router = useRouter()

    const [selectedType, setSelectedType] = useState<AccountType>('buyer')

    const handleContinue = () => {
        // Handle form submission
        setCurrentTradeRole(selectedType)

        if (selectedType == 'buyer') {
            router.push('/auth/create-account/buyer')
        } else {
            router.push('/auth/create-account/supplier')
        }
    }

    return (
        <div className=" bg-white flex items-center justify-center ">
            <div className="max-w-md w-full bg-white rounded-lg  p-4">
                <div className="mb-8">
                    <h1 className="text-2xl font-light text-gray-900 leading-tight">
                        Which account would you like to create?
                    </h1>
                </div>

                <div className="space-y-4 mb-8">
                    {/* Buyer Option */}
                    <div
                        onClick={() => setSelectedType('buyer')}
                        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            selectedType === 'buyer'
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedType === 'buyer' ? 'border-green-500 bg-green-500' : 'border-gray-300'
                                    }`}
                                >
                                    {selectedType === 'buyer' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-light text-gray-900 mb-1">Buyer</h3>
                                <p className="text-sm text-gray-600 mb-0">
                                    Connecting you to Africa’s 200K suppliers and 200M+ products.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Supplier Option */}
                    <div
                        onClick={() => setSelectedType('supplier')}
                        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            selectedType === 'supplier'
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedType === 'supplier'
                                            ? 'border-green-500 bg-green-500'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    {selectedType === 'supplier' && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-light text-gray-900 mb-1">Supplier</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Tap into 40M global business buyers waiting for your products.
                                </p>
                                <p className="text-xs text-gray-500">* A buyer account will also be created</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    className="w-full bg-green-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 mb-6"
                >
                    Continue
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href={'/auth/signin'} className="text-gray-900 font-light underline hover:text-gray-700 ">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccountTypeSelection

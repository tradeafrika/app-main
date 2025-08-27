/**
 * This is for the Create Account of the supplier
 */

'use client'

import { createCompanyProfile } from '@/lib/base/common/authentication/company/company-profile'
import { createNewUserWithCompanyProfile } from '@/lib/base/common/authentication/company/createNewUserWithCompanyProfile'
import { splitFullName } from '@/lib/base/common/usage/split-names'
import useAuthStore from '@/lib/base/state/AuthState'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

interface FormData {
    email: string
    password: string
    confirmPassword: string
    fullName: string
    telephone: string
    companyName: string
    agreeToTerms: boolean
}

const countries = [
    'Algeria',
    'Angola',
    'Benin',
    'Botswana',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cameroon',
    'Central African Republic',
    'Chad',
    'Comoros',
    'Congo (Republic)',
    'Congo (Democratic Republic)',
    'Djibouti',
    'Egypt',
    'Equatorial Guinea',
    'Eritrea',
    'Eswatini',
    'Ethiopia',
    'Gabon',
    'Gambia',
    'Ghana',
    'Guinea',
    'Guinea-Bissau',
    'Ivory Coast',
    'Kenya',
    'Lesotho',
    'Liberia',
    'Libya',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mauritania',
    'Mauritius',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Niger',
    'Nigeria',
    'Rwanda',
    'Sao Tome and Principe',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Sudan',
    'Tanzania',
    'Togo',
    'Tunisia',
    'Uganda',
    'Zambia',
    'Zimbabwe',
]

export default function CreateAccountSupplier() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        telephone: '',
        companyName: '',
        agreeToTerms: false,
    })

    const [errors, setErrors] = useState<Partial<FormData>>({})

    const { setUser, setCurrentTradeRole, setProfile } = useAuthStore()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!formData.telephone.trim()) {
            newErrors.telephone = 'Telephone is required'
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required'
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = true
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            console.log('Form submitted:', formData)

            const { firstName, lastName } = splitFullName(formData.fullName)

            createNewUserWithCompanyProfile({
                userEmail: formData.email,
                userFirstName: firstName,
                userSecondName: lastName,
                userPassword: formData.password,
            }).then((v) => {
                if (v.isErrorTrue) {
                    toast.error('Authentication Failed', {
                        description: v.errorMessage,
                    })
                } else {
                    let user = v.data! as User
                    setUser(user)
                    setCurrentTradeRole('buyer')

                    setProfile({
                        companyName: formData.companyName,
                        firstname: firstName,
                        lastname: lastName,
                        telephone: formData.telephone,
                    })

                    toast.success('Authentication', {
                        description: 'A verification link has been sent to your Email',
                    })
                }
            })
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center  sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-5 rounded-lg shadow-sm">
                <div>
                    <h2 className="text-2xl font-light text-gray-900 text-center mb-2 ">Create Account - Supplier</h2>
                    <p className="text-gray-600 text-center text-sm font-light">
                        Join our platform to connect with suppliers and buyers
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm  font-light text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md placeholder-gray-400 font-light focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                    errors.fullName ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md font-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border  rounded-md font-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                    errors.password ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-light text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md font-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Telephone */}
                        <div>
                            <label htmlFor="telephone" className="block text-sm font-light text-gray-700 mb-1">
                                Telephone
                            </label>
                            <input
                                id="telephone"
                                name="telephone"
                                type="tel"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md font-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                    errors.telephone ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your phone number"
                            />
                            {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
                        </div>

                        {/* Country */}

                        {/* Company Name */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-light text-gray-700 mb-1">
                                Company Name
                            </label>
                            <input
                                id="companyName"
                                name="companyName"
                                type="text"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md font-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                    errors.companyName ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your company name"
                            />
                            {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div>
                            <div className="flex items-start">
                                <input
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                                />
                                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                                    By continuing, I agree to TradeAfrika’s
                                    <a href="#" className="text-green-600 hover:text-green-500 underline">
                                        Terms & Policies.
                                    </a>
                                </label>
                            </div>
                            {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href={'/auth/signin'}
                                className="text-gray-900 font-light underline hover:text-gray-700 "
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

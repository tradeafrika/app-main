'use client'

import { createCompanyProfile } from '@/lib/base/common/authentication/company/company-profile'
import { createNewUser } from '@/lib/base/common/authentication/create-user'
import { signInWithGoogle } from '@/lib/base/common/authentication/signin-user'
import { splitFullName } from '@/lib/base/common/usage/split-names'
import useAuthStore from '@/lib/base/state/AuthState'
import { baseURL } from '@/lib/env'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CreateAccountForm: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [fullname, setFullname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const { setUser, setCurrentTradeRole, setProfile } = useAuthStore()

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!')
            return
        }

        let { firstName, lastName } = splitFullName(fullname)
        createNewUser({
            email: email,
            firstName: firstName,
            password: password,
            secondName: lastName,
            /**
             * Will Send the user to page to verify their emails
             */
            redirectURL: baseURL,
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
                    companyName: '',
                    firstname: firstName,
                    lastname: lastName,
                    telephone: '',
                })
                toast.success('Authentication', {
                    description: 'A verification Link has been sent to your Email',
                })
            }
        })
    }

    const handleGoogleSignUp = () => {
        signInWithGoogle({
            redirectURL: 'http://localhost:3000/marketplace',
        }).then((v) => {
            if (v.isErrorTrue) {
                toast('Authentication Failed', {
                    description: v.errorMessage,
                })
            } else {
                setUser(v.data)
            }
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className=" bg-white flex items-center justify-center ">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-light text-gray-900">Create Account - Buyer</h1>
                </div>

                <div className="space-y-3 mb-6">
                    {/* Google Sign Up */}
                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md  bg-white hover:bg-gray-50 transition duration-200"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className="text-gray-700 font-light">Continue with Google</span>
                    </button>
                </div>

                <div className="my-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Full name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full px-3 py-3 font-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent placeholder-gray-500 text-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-3 font-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent placeholder-gray-500 text-gray-700"
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-3 pr-10 border font-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent placeholder-gray-500 text-gray-700"
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 font-light right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full font-light px-3 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-500 text-gray-700 ${
                                confirmPassword && password !== confirmPassword
                                    ? 'border-red-300 focus:ring-red-300'
                                    : confirmPassword && password === confirmPassword
                                    ? 'border-green-300 focus:ring-green-300'
                                    : 'border-gray-300 focus:ring-orange-300'
                            }`}
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full font-light bg-green-500 hover:bg-green-500 text-white  py-3 px-4 rounded-md transition duration-200"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 font-light">
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

export default CreateAccountForm

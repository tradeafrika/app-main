/**
 * This signin takes care for both the buyer or seller, generally
 * because they both have the email and password available
 */

'use client'

import React, { useState } from 'react'
import { CircleX, Eye, EyeOff } from 'lucide-react'

import Link from 'next/link'
import { signInUser, signInWithGoogle } from '@/lib/base/common/authentication/signin-user'
import { AuthError } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { baseURL } from '@/lib/env'

export default function SignInForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Handle form submission here

        try {
            signInUser({
                email: email,
                password: password,
            }).then((args)=>{
                if(args.isErrorTrue){
                    console.log('Error Signing In User',args.errorMessage)

                    toast("Authentication Failed",{
                        richColors : true,
                        style : {
                            fontSize  :14,
                            padding: 10
                        },
                        description : "Invalid Login Credentials."
                    })
                }else{
                    console.log('User Details', args.data)
                }
            })
        } catch (error) {
           
        }
    }

    /**
     * Used to handle the google sign In
     */
    const handleGoogleSignIn = () => {
        try {
            signInWithGoogle({
                redirectURL: `${baseURL}/marketplace`,
            })
        } catch (error) {
            if (error && error instanceof AuthError) {
                console.log('Error Signing In User', error.message)
            }
        }
    }

    return (
        <div className="min-h-screen flex p-1 justify-center">
            
            <div className="max-w-md w-full p-3">
                <div className="mb-8 flex-col justify-center  pl-4 h-[40px]">
                    <h1 className="text-2xl font-light mb-2 text-gray-900 mt-2">Sign In to TradeAfrika.</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-3 text-sm font-light pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform font-light -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="text-right">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm font-light text-gray-600 hover:text-gray-900 underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full font-light bg-green-600 text-sm hover:bg-green-700 text-white py-2 px-2 rounded-lg transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

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

                <div className="flex items-center justify-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex justify-center items-center w-full h-[41px] space-x-3 text-sm border border-gray-300 rounded-md  hover:bg-gray-50 transition duration-200"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
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

                        <span>Continue with Google</span>
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 space-x-3">
                        Need an Account?
                        <Link href="/auth/create-account/role" className="text-gray-900 underline hover:text-gray-700">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

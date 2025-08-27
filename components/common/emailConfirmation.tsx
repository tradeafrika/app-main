'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseClientMain } from '@/lib/base/supabase'

type ConfirmationState = 'loading' | 'success' | 'error' | 'expired'



export default function EmailConfirmationPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [state, setState] = useState<ConfirmationState>('loading')
    const [errorMessage, setErrorMessage] = useState('')
    const [countdown, setCountdown] = useState(3)

    const supabase = supabaseClientMain
    const redirectTo = '/marketplace'

    useEffect(() => {
        const confirmEmail = async () => {
            const token = searchParams.get('access_token')
            const type = searchParams.get('type')

            if (!token || !type) {
                setState('error')
                setErrorMessage('Invalid confirmation link. Please check your email and try again.')
                return
            }

            try {
                const { error } = await supabase.auth.exchangeCodeForSession(token)

                if (error) {
                    setState(error.message.toLowerCase().includes('expired') ? 'expired' : 'error')
                    setErrorMessage(
                        error.message.toLowerCase().includes('expired')
                            ? 'This confirmation link has expired. Please request a new one.'
                            : error.message || 'Failed to confirm your email. Please try again.'
                    )
                } else {
                    setState('success')
                    const timer = setInterval(() => {
                        setCountdown((prev) => {
                            if (prev <= 1) {
                                clearInterval(timer)
                                router.push(redirectTo)
                                return 0
                            }
                            return prev - 1
                        })
                    }, 1000)
                }
            } catch {
                setState('error')
                setErrorMessage('An unexpected error occurred. Please try again.')
            }
        }

        confirmEmail()
    }, [searchParams, supabase, router, redirectTo])

    const renderContent = () => {
        switch (state) {
            case 'loading':
                return <p>Confirming your email...</p>
            case 'success':
                return <p>Email confirmed successfully! Redirecting in {countdown}s...</p>
            case 'expired':
                return <p>Link expired. Please request a new one.</p>
            case 'error':
                return <p>Confirmation failed: {errorMessage}</p>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">{renderContent()}</div>
        </div>
    )
}

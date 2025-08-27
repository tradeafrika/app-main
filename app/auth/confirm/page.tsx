'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseClientMain } from '@/lib/base/supabase'
import { toast } from 'sonner'

type ConfirmationState = 'loading' | 'success' | 'error' | 'expired'

interface EmailConfirmationProps {
    onSuccess?: () => void
    redirectTo?: string
}

const EmailConfirmation: React.FC<EmailConfirmationProps> = ({ onSuccess, redirectTo = '/marketplace' }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [state, setState] = useState<ConfirmationState>('loading')
    const [errorMessage, setErrorMessage] = useState('')
    const [countdown, setCountdown] = useState(3)

    const supabase = supabaseClientMain

    useEffect(() => {
        const confirmEmail = async () => {
            const token = searchParams.get('access_token') // Supabase sends this, not token_hash
            const type = searchParams.get('type')

            if (!token || !type) {
                setState('error')
                setErrorMessage('Invalid confirmation link. Please check your email and try again.')
                return
            }

            try {
                // Exchange access_token for a session
                const { data, error } = await supabase.auth.exchangeCodeForSession(token)

                if (error) {
                    setState('error')
                    if (error.message.toLowerCase().includes('expired')) {
                        setState('expired')
                        setErrorMessage('This confirmation link has expired. Please request a new one.')
                    } else {
                        setErrorMessage(error.message || 'Failed to confirm your email. Please try again.')
                    }
                } else {
                    setState('success')
                    if (onSuccess) onSuccess()

                    // Start countdown and redirect
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
            } catch (err) {
                setState('error')
                setErrorMessage('An unexpected error occurred. Please try again.')
            }
        }

        confirmEmail()
    }, [searchParams, supabase, router, onSuccess, redirectTo])

  
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

export default EmailConfirmation

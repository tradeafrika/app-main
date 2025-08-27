'use client'

import { checkCurrentUserSession } from '@/lib/base/common/authentication/session-manager'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
    const router = useRouter()

    /**
     * In this case we need to check if their is available session state
     *  for the current account this will be done by supabase in the beginning everytime
     */

    useEffect(() => {
        checkCurrentUserSession().then((value) => {
            if (value.user) {
                router.push('/marketplace')
            } else {
                router.push('/auth/signin')
            }
        })
    },[router])

    return <div className="text-lg">..redirecting</div>
}

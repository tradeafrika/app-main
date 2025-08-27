'use client'

import { Suspense } from 'react'
import EmailConfirmation from '@/components/common/emailConfirmation'

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <EmailConfirmation />
        </Suspense>
    )
}
